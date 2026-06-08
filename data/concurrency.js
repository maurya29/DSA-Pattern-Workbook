const CURRENT_PATTERN = {
  "id": "concurrency",
  "name": "Concurrency Basics",
  "summary": "Thread ordering, semaphores, locks, conditions, producer-consumer queues, barriers, and safe shared state.",
  "complete": true,
  "subpatterns": [
    "Happens-before ordering with latches",
    "Alternating output with binary semaphores",
    "Zero/even/odd phase coordination",
    "Molecule/group formation with permits",
    "Modulo-based multi-role gating",
    "Deadlock-free resource ordering",
    "Bounded blocking queues with conditions",
    "Parallel crawl with concurrent visited set",
    "Single-lane traffic light locking",
    "Atomic counter and mutual exclusion",
    "Producer-consumer bounded buffer",
    "Read-write lock cache",
    "Sliding-window rate limiting",
    "Token bucket refill and consumption",
    "Reusable barrier generations",
    "One-shot countdown latch",
    "Blocking stack with empty/full waits",
    "Ordered batch emission",
    "Fork-join parallel reduction",
    "Thread-safe LRU cache",
    "Odd/even alternation",
    "Round-robin N-way alternation",
    "Semaphore permit limiter",
    "Delayed task scheduling",
    "Future fan-in aggregation",
    "Deadlock-free bank transfers",
    "Pipeline backpressure",
    "Lock striping map",
    "Concurrent hash set",
    "Async retry scheduling"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Print in Order",
      "difficulty": "Easy",
      "subpattern": "Happens-before ordering with latches",
      "question": "Implement Foo so second() runs after first(), and third() runs after second(), even when three threads call the methods in any order.",
      "trigger": "The required output order is fixed while thread scheduling order is arbitrary.",
      "intuition": "Create two gates: first opens the gate for second, and second opens the gate for third.",
      "edgeCases": "Threads starting in reverse order, a runnable throwing, repeated wakeups, and preserving interrupt status.",
      "constraints": "Each method is called exactly once by a different thread.",
      "source": {
        "label": "LeetCode 1114 - Print in Order",
        "url": "https://leetcode.com/problems/print-in-order/"
      },
      "examples": [
        {
          "input": "Calls arrive as third(), second(), first()",
          "output": "firstsecondthird",
          "explanation": "third waits for second, and second waits for first."
        },
        {
          "input": "Calls arrive as first(), second(), third()",
          "output": "firstsecondthird",
          "explanation": "All gates are opened in the natural order."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). Monitor waits guard two boolean conditions.",
      "optimizedComplexity": "Time O(1); Space O(1). CountDownLatch directly models the two happens-before gates.",
      "recursiveComplexity": "Time O(1); Space O(1). The same gates are wrapped behind small helper calls.",
      "bruteForceCode": "class Foo {\n  private boolean firstDone;\n  private boolean secondDone;\n\n  public Foo() {}\n\n  public synchronized void first(Runnable printFirst) throws InterruptedException {\n    printFirst.run();\n    firstDone = true;\n    notifyAll();\n  }\n\n  public synchronized void second(Runnable printSecond) throws InterruptedException {\n    while (!firstDone) wait();\n    printSecond.run();\n    secondDone = true;\n    notifyAll();\n  }\n\n  public synchronized void third(Runnable printThird) throws InterruptedException {\n    while (!secondDone) wait();\n    printThird.run();\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    printFirst.run();\n    firstDone.countDown();\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    firstDone.await();\n    printSecond.run();\n    secondDone.countDown();\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    secondDone.await();\n    printThird.run();\n  }\n}",
      "recursiveCode": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    runAndOpen(printFirst, firstDone);\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    waitRunOpen(firstDone, printSecond, secondDone);\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    waitRunOpen(secondDone, printThird, null);\n  }\n\n  private void waitRunOpen(CountDownLatch gate, Runnable action, CountDownLatch next) throws InterruptedException {\n    gate.await();\n    runAndOpen(action, next);\n  }\n\n  private void runAndOpen(Runnable action, CountDownLatch next) {\n    action.run();\n    if (next != null) next.countDown();\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    printFirst.run();\n    firstDone.countDown();\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    firstDone.await();\n    printSecond.run();\n    secondDone.countDown();\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    secondDone.await();\n    printThird.run();\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    printFirst.run();\n    firstDone.countDown();\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    firstDone.await();\n    printSecond.run();\n    secondDone.countDown();\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    secondDone.await();\n    printThird.run();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Print FooBar Alternately",
      "difficulty": "Easy",
      "subpattern": "Alternating output with binary semaphores",
      "question": "Two threads call foo() and bar(). Print \"foobar\" exactly n times in alternating order.",
      "trigger": "One thread must run only after the other thread releases the next turn.",
      "intuition": "Use two one-permit gates; foo starts open and bar starts closed.",
      "edgeCases": "n = 1, bar thread starts first, interrupted acquire, and releasing the wrong gate.",
      "constraints": "n is positive; printFoo prints \"foo\" and printBar prints \"bar\".",
      "source": {
        "label": "LeetCode 1115 - Print FooBar Alternately",
        "url": "https://leetcode.com/problems/print-foobar-alternately/"
      },
      "examples": [
        {
          "input": "n = 1",
          "output": "foobar",
          "explanation": "foo prints once, then bar prints once."
        },
        {
          "input": "n = 3",
          "output": "foobarfoobarfoobar",
          "explanation": "The two gates alternate three times."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Monitor state stores whose turn it is.",
      "optimizedComplexity": "Time O(n); Space O(1). Two semaphores encode the alternating turns.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth for each printer helper.",
      "bruteForceCode": "class FooBar {\n  private final int n;\n  private boolean fooTurn = true;\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public synchronized void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      while (!fooTurn) wait();\n      printFoo.run();\n      fooTurn = false;\n      notifyAll();\n    }\n  }\n\n  public synchronized void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      while (fooTurn) wait();\n      printBar.run();\n      fooTurn = true;\n      notifyAll();\n    }\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      foo.acquire();\n      printFoo.run();\n      bar.release();\n    }\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      bar.acquire();\n      printBar.run();\n      foo.release();\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    printFooRecursive(0, printFoo);\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    printBarRecursive(0, printBar);\n  }\n\n  private void printFooRecursive(int index, Runnable printFoo) throws InterruptedException {\n    if (index == n) return;\n    foo.acquire();\n    printFoo.run();\n    bar.release();\n    printFooRecursive(index + 1, printFoo);\n  }\n\n  private void printBarRecursive(int index, Runnable printBar) throws InterruptedException {\n    if (index == n) return;\n    bar.acquire();\n    printBar.run();\n    foo.release();\n    printBarRecursive(index + 1, printBar);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      foo.acquire();\n      printFoo.run();\n      bar.release();\n    }\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      bar.acquire();\n      printBar.run();\n      foo.release();\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      foo.acquire();\n      printFoo.run();\n      bar.release();\n    }\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i < n; i++) {\n      bar.acquire();\n      printBar.run();\n      foo.release();\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Print Zero Even Odd",
      "difficulty": "Medium",
      "subpattern": "Zero/even/odd phase coordination",
      "question": "Three threads call zero(), even(), and odd(). Print 010203...0n.",
      "trigger": "The zero thread alternates with exactly one number thread selected by parity.",
      "intuition": "After zero prints, release odd or even based on the next number; the number thread releases zero again.",
      "edgeCases": "n = 1, even thread never printing, starting number threads before zero, and off-by-one parity.",
      "constraints": "zero prints 0 n times; odd prints odd numbers; even prints even numbers.",
      "source": {
        "label": "LeetCode 1116 - Print Zero Even Odd",
        "url": "https://leetcode.com/problems/print-zero-even-odd/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "0102",
          "explanation": "zero opens odd for 1, then zero opens even for 2."
        },
        {
          "input": "n = 5",
          "output": "0102030405",
          "explanation": "Each number is preceded by zero."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). One monitor and a phase integer coordinate all threads.",
      "optimizedComplexity": "Time O(n); Space O(1). Three semaphores represent zero, odd, and even turns.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth in each role method.",
      "bruteForceCode": "import java.util.function.IntConsumer;\n\nclass ZeroEvenOdd {\n  private final int n;\n  private int current = 1;\n  private int phase = 0;\n\n  public ZeroEvenOdd(int n) {\n    this.n = n;\n  }\n\n  public synchronized void zero(IntConsumer printNumber) throws InterruptedException {\n    for (int i = 1; i <= n; i++) {\n      while (phase != 0) wait();\n      printNumber.accept(0);\n      phase = i % 2 == 1 ? 1 : 2;\n      notifyAll();\n    }\n  }\n\n  public synchronized void odd(IntConsumer printNumber) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && phase != 1) wait();\n      if (current > n) break;\n      printNumber.accept(current++);\n      phase = 0;\n      notifyAll();\n    }\n  }\n\n  public synchronized void even(IntConsumer printNumber) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && phase != 2) wait();\n      if (current > n) break;\n      printNumber.accept(current++);\n      phase = 0;\n      notifyAll();\n    }\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass ZeroEvenOdd {\n  private final int n;\n  private final Semaphore zero = new Semaphore(1);\n  private final Semaphore odd = new Semaphore(0);\n  private final Semaphore even = new Semaphore(0);\n\n  public ZeroEvenOdd(int n) {\n    this.n = n;\n  }\n\n  public void zero(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value++) {\n      zero.acquire();\n      printNumber.accept(0);\n      if (value % 2 == 1) odd.release();\n      else even.release();\n    }\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value += 2) {\n      odd.acquire();\n      printNumber.accept(value);\n      zero.release();\n    }\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 2; value <= n; value += 2) {\n      even.acquire();\n      printNumber.accept(value);\n      zero.release();\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass ZeroEvenOdd {\n  private final int n;\n  private final Semaphore zero = new Semaphore(1);\n  private final Semaphore odd = new Semaphore(0);\n  private final Semaphore even = new Semaphore(0);\n\n  public ZeroEvenOdd(int n) {\n    this.n = n;\n  }\n\n  public void zero(IntConsumer printNumber) throws InterruptedException {\n    zeroAt(1, printNumber);\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    oddAt(1, printNumber);\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    evenAt(2, printNumber);\n  }\n\n  private void zeroAt(int value, IntConsumer printNumber) throws InterruptedException {\n    if (value > n) return;\n    zero.acquire();\n    printNumber.accept(0);\n    if (value % 2 == 1) odd.release();\n    else even.release();\n    zeroAt(value + 1, printNumber);\n  }\n\n  private void oddAt(int value, IntConsumer printNumber) throws InterruptedException {\n    if (value > n) return;\n    odd.acquire();\n    printNumber.accept(value);\n    zero.release();\n    oddAt(value + 2, printNumber);\n  }\n\n  private void evenAt(int value, IntConsumer printNumber) throws InterruptedException {\n    if (value > n) return;\n    even.acquire();\n    printNumber.accept(value);\n    zero.release();\n    evenAt(value + 2, printNumber);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass ZeroEvenOdd {\n  private final int n;\n  private final Semaphore zero = new Semaphore(1);\n  private final Semaphore odd = new Semaphore(0);\n  private final Semaphore even = new Semaphore(0);\n\n  public ZeroEvenOdd(int n) {\n    this.n = n;\n  }\n\n  public void zero(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value++) {\n      zero.acquire();\n      printNumber.accept(0);\n      if (value % 2 == 1) odd.release();\n      else even.release();\n    }\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value += 2) {\n      odd.acquire();\n      printNumber.accept(value);\n      zero.release();\n    }\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 2; value <= n; value += 2) {\n      even.acquire();\n      printNumber.accept(value);\n      zero.release();\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass ZeroEvenOdd {\n  private final int n;\n  private final Semaphore zero = new Semaphore(1);\n  private final Semaphore odd = new Semaphore(0);\n  private final Semaphore even = new Semaphore(0);\n\n  public ZeroEvenOdd(int n) {\n    this.n = n;\n  }\n\n  public void zero(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value++) {\n      zero.acquire();\n      printNumber.accept(0);\n      if (value % 2 == 1) odd.release();\n      else even.release();\n    }\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value += 2) {\n      odd.acquire();\n      printNumber.accept(value);\n      zero.release();\n    }\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 2; value <= n; value += 2) {\n      even.acquire();\n      printNumber.accept(value);\n      zero.release();\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Building H2O",
      "difficulty": "Medium",
      "subpattern": "Molecule/group formation with permits",
      "question": "Hydrogen and oxygen threads must release atoms so every emitted group contains exactly two H and one O.",
      "trigger": "Threads arrive independently, but progress must occur in fixed-size groups with role counts.",
      "intuition": "Allow two hydrogen permits and one oxygen permit per molecule, then reset permits after the group completes.",
      "edgeCases": "Many hydrogens before oxygen, many oxygens before hydrogen, barrier reset, and permit leaks on interruption.",
      "constraints": "Input has enough H and O calls to form complete molecules.",
      "source": {
        "label": "LeetCode 1117 - Building H2O",
        "url": "https://leetcode.com/problems/building-h2o/"
      },
      "examples": [
        {
          "input": "water = \"HOH\"",
          "output": "Any order containing two H and one O per group",
          "explanation": "One complete water molecule can be released."
        },
        {
          "input": "water = \"OOHHHH\"",
          "output": "Two valid HHO groups in any internal order",
          "explanation": "No oxygen proceeds without two hydrogens in its group."
        }
      ],
      "bruteForceComplexity": "Time O(molecules); Space O(1). Monitor counters block roles until a group can close.",
      "optimizedComplexity": "Time O(molecules); Space O(1). Semaphores enforce atom counts and a barrier resets the group.",
      "recursiveComplexity": "Time O(molecules); Space O(1). Semaphore/barrier logic is wrapped in helper calls.",
      "bruteForceCode": "class H2O {\n  private int hydrogenInGroup;\n  private int oxygenInGroup;\n\n  public H2O() {}\n\n  public synchronized void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n    while (hydrogenInGroup == 2) wait();\n    releaseHydrogen.run();\n    hydrogenInGroup++;\n    if (hydrogenInGroup == 2 && oxygenInGroup == 1) resetGroup();\n    else notifyAll();\n  }\n\n  public synchronized void oxygen(Runnable releaseOxygen) throws InterruptedException {\n    while (oxygenInGroup == 1) wait();\n    releaseOxygen.run();\n    oxygenInGroup++;\n    if (hydrogenInGroup == 2 && oxygenInGroup == 1) resetGroup();\n    else notifyAll();\n  }\n\n  private void resetGroup() {\n    hydrogenInGroup = 0;\n    oxygenInGroup = 0;\n    notifyAll();\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass H2O {\n  private final Semaphore hydrogen = new Semaphore(2);\n  private final Semaphore oxygen = new Semaphore(1);\n  private final CyclicBarrier molecule = new CyclicBarrier(3, () -> {\n    hydrogen.release(2);\n    oxygen.release(1);\n  });\n\n  public H2O() {}\n\n  public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n    hydrogen.acquire();\n    releaseHydrogen.run();\n    awaitMolecule();\n  }\n\n  public void oxygen(Runnable releaseOxygen) throws InterruptedException {\n    oxygen.acquire();\n    releaseOxygen.run();\n    awaitMolecule();\n  }\n\n  private void awaitMolecule() throws InterruptedException {\n    try {\n      molecule.await();\n    } catch (BrokenBarrierException ex) {\n      throw new IllegalStateException(ex);\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.*;\n\nclass H2O {\n  private final Semaphore hydrogen = new Semaphore(2);\n  private final Semaphore oxygen = new Semaphore(1);\n  private final CyclicBarrier molecule = new CyclicBarrier(3, () -> {\n    hydrogen.release(2);\n    oxygen.release(1);\n  });\n\n  public H2O() {}\n\n  public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n    releaseAtom(hydrogen, releaseHydrogen);\n  }\n\n  public void oxygen(Runnable releaseOxygen) throws InterruptedException {\n    releaseAtom(oxygen, releaseOxygen);\n  }\n\n  private void releaseAtom(Semaphore permit, Runnable release) throws InterruptedException {\n    permit.acquire();\n    release.run();\n    awaitGroup();\n  }\n\n  private void awaitGroup() throws InterruptedException {\n    try {\n      molecule.await();\n    } catch (BrokenBarrierException ex) {\n      throw new IllegalStateException(ex);\n    }\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass H2O {\n  private final Semaphore hydrogen = new Semaphore(2);\n  private final Semaphore oxygen = new Semaphore(1);\n  private final CyclicBarrier molecule = new CyclicBarrier(3, () -> {\n    hydrogen.release(2);\n    oxygen.release(1);\n  });\n\n  public H2O() {}\n\n  public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n    hydrogen.acquire();\n    releaseHydrogen.run();\n    awaitMolecule();\n  }\n\n  public void oxygen(Runnable releaseOxygen) throws InterruptedException {\n    oxygen.acquire();\n    releaseOxygen.run();\n    awaitMolecule();\n  }\n\n  private void awaitMolecule() throws InterruptedException {\n    try {\n      molecule.await();\n    } catch (BrokenBarrierException ex) {\n      throw new IllegalStateException(ex);\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass H2O {\n  private final Semaphore hydrogen = new Semaphore(2);\n  private final Semaphore oxygen = new Semaphore(1);\n  private final CyclicBarrier molecule = new CyclicBarrier(3, () -> {\n    hydrogen.release(2);\n    oxygen.release(1);\n  });\n\n  public H2O() {}\n\n  public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n    hydrogen.acquire();\n    releaseHydrogen.run();\n    awaitMolecule();\n  }\n\n  public void oxygen(Runnable releaseOxygen) throws InterruptedException {\n    oxygen.acquire();\n    releaseOxygen.run();\n    awaitMolecule();\n  }\n\n  private void awaitMolecule() throws InterruptedException {\n    try {\n      molecule.await();\n    } catch (BrokenBarrierException ex) {\n      throw new IllegalStateException(ex);\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Fizz Buzz Multithreaded",
      "difficulty": "Medium",
      "subpattern": "Modulo-based multi-role gating",
      "question": "Four threads print fizz, buzz, fizzbuzz, or the number for values 1 through n.",
      "trigger": "Exactly one role owns each integer based on divisibility, and all roles must advance one shared counter.",
      "intuition": "Keep one current number; each role waits until the current number belongs to it, prints, then advances.",
      "edgeCases": "n less than 3, multiples of 15, number thread skipping fizz/buzz values, and wakeups at the end.",
      "constraints": "Each print method is called by a different thread.",
      "source": {
        "label": "LeetCode 1195 - Fizz Buzz Multithreaded",
        "url": "https://leetcode.com/problems/fizz-buzz-multithreaded/"
      },
      "examples": [
        {
          "input": "n = 5",
          "output": "1 2 fizz 4 buzz",
          "explanation": "Only one thread prints for each value."
        },
        {
          "input": "n = 15",
          "output": "... 14 fizzbuzz",
          "explanation": "The fizzbuzz thread owns multiples of both 3 and 5."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). One monitor protects the shared counter.",
      "optimizedComplexity": "Time O(n); Space O(1). A lock and condition coordinate role ownership.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth across role scans.",
      "bruteForceCode": "import java.util.function.IntConsumer;\n\nclass FizzBuzz {\n  private final int n;\n  private int current = 1;\n\n  public FizzBuzz(int n) {\n    this.n = n;\n  }\n\n  public synchronized void fizz(Runnable printFizz) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && !(current % 3 == 0 && current % 5 != 0)) wait();\n      if (current > n) break;\n      printFizz.run();\n      current++;\n      notifyAll();\n    }\n  }\n\n  public synchronized void buzz(Runnable printBuzz) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && !(current % 5 == 0 && current % 3 != 0)) wait();\n      if (current > n) break;\n      printBuzz.run();\n      current++;\n      notifyAll();\n    }\n  }\n\n  public synchronized void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && current % 15 != 0) wait();\n      if (current > n) break;\n      printFizzBuzz.run();\n      current++;\n      notifyAll();\n    }\n  }\n\n  public synchronized void number(IntConsumer printNumber) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && (current % 3 == 0 || current % 5 == 0)) wait();\n      if (current > n) break;\n      printNumber.accept(current++);\n      notifyAll();\n    }\n  }\n}",
      "iterativeCode": "import java.util.concurrent.locks.*;\nimport java.util.function.IntConsumer;\n\nclass FizzBuzz {\n  private final int n;\n  private int current = 1;\n  private final Lock lock = new ReentrantLock();\n  private final Condition changed = lock.newCondition();\n\n  public FizzBuzz(int n) {\n    this.n = n;\n  }\n\n  public void fizz(Runnable printFizz) throws InterruptedException {\n    runRole(value -> value % 3 == 0 && value % 5 != 0, () -> printFizz.run());\n  }\n\n  public void buzz(Runnable printBuzz) throws InterruptedException {\n    runRole(value -> value % 5 == 0 && value % 3 != 0, () -> printBuzz.run());\n  }\n\n  public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n    runRole(value -> value % 15 == 0, () -> printFizzBuzz.run());\n  }\n\n  public void number(IntConsumer printNumber) throws InterruptedException {\n    runRole(value -> value % 3 != 0 && value % 5 != 0, () -> printNumber.accept(current));\n  }\n\n  private void runRole(java.util.function.IntPredicate owns, Runnable printer) throws InterruptedException {\n    while (true) {\n      lock.lock();\n      try {\n        while (current <= n && !owns.test(current)) changed.await();\n        if (current > n) {\n          changed.signalAll();\n          return;\n        }\n        printer.run();\n        current++;\n        changed.signalAll();\n      } finally {\n        lock.unlock();\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.function.*;\n\nclass FizzBuzz {\n  private final int n;\n  private int current = 1;\n\n  public FizzBuzz(int n) {\n    this.n = n;\n  }\n\n  public void fizz(Runnable printFizz) throws InterruptedException {\n    run(value -> value % 3 == 0 && value % 5 != 0, () -> printFizz.run());\n  }\n\n  public void buzz(Runnable printBuzz) throws InterruptedException {\n    run(value -> value % 5 == 0 && value % 3 != 0, () -> printBuzz.run());\n  }\n\n  public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n    run(value -> value % 15 == 0, () -> printFizzBuzz.run());\n  }\n\n  public void number(IntConsumer printNumber) throws InterruptedException {\n    run(value -> value % 3 != 0 && value % 5 != 0, () -> printNumber.accept(current));\n  }\n\n  private synchronized void run(IntPredicate owns, Runnable printer) throws InterruptedException {\n    if (current > n) {\n      notifyAll();\n      return;\n    }\n    while (current <= n && !owns.test(current)) wait();\n    if (current > n) {\n      notifyAll();\n      return;\n    }\n    printer.run();\n    current++;\n    notifyAll();\n    run(owns, printer);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.locks.*;\nimport java.util.function.IntConsumer;\n\nclass FizzBuzz {\n  private final int n;\n  private int current = 1;\n  private final Lock lock = new ReentrantLock();\n  private final Condition changed = lock.newCondition();\n\n  public FizzBuzz(int n) {\n    this.n = n;\n  }\n\n  public void fizz(Runnable printFizz) throws InterruptedException {\n    runRole(value -> value % 3 == 0 && value % 5 != 0, () -> printFizz.run());\n  }\n\n  public void buzz(Runnable printBuzz) throws InterruptedException {\n    runRole(value -> value % 5 == 0 && value % 3 != 0, () -> printBuzz.run());\n  }\n\n  public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n    runRole(value -> value % 15 == 0, () -> printFizzBuzz.run());\n  }\n\n  public void number(IntConsumer printNumber) throws InterruptedException {\n    runRole(value -> value % 3 != 0 && value % 5 != 0, () -> printNumber.accept(current));\n  }\n\n  private void runRole(java.util.function.IntPredicate owns, Runnable printer) throws InterruptedException {\n    while (true) {\n      lock.lock();\n      try {\n        while (current <= n && !owns.test(current)) changed.await();\n        if (current > n) {\n          changed.signalAll();\n          return;\n        }\n        printer.run();\n        current++;\n        changed.signalAll();\n      } finally {\n        lock.unlock();\n      }\n    }\n  }\n}",
      "code": "import java.util.concurrent.locks.*;\nimport java.util.function.IntConsumer;\n\nclass FizzBuzz {\n  private final int n;\n  private int current = 1;\n  private final Lock lock = new ReentrantLock();\n  private final Condition changed = lock.newCondition();\n\n  public FizzBuzz(int n) {\n    this.n = n;\n  }\n\n  public void fizz(Runnable printFizz) throws InterruptedException {\n    runRole(value -> value % 3 == 0 && value % 5 != 0, () -> printFizz.run());\n  }\n\n  public void buzz(Runnable printBuzz) throws InterruptedException {\n    runRole(value -> value % 5 == 0 && value % 3 != 0, () -> printBuzz.run());\n  }\n\n  public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n    runRole(value -> value % 15 == 0, () -> printFizzBuzz.run());\n  }\n\n  public void number(IntConsumer printNumber) throws InterruptedException {\n    runRole(value -> value % 3 != 0 && value % 5 != 0, () -> printNumber.accept(current));\n  }\n\n  private void runRole(java.util.function.IntPredicate owns, Runnable printer) throws InterruptedException {\n    while (true) {\n      lock.lock();\n      try {\n        while (current <= n && !owns.test(current)) changed.await();\n        if (current > n) {\n          changed.signalAll();\n          return;\n        }\n        printer.run();\n        current++;\n        changed.signalAll();\n      } finally {\n        lock.unlock();\n      }\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "The Dining Philosophers",
      "difficulty": "Medium",
      "subpattern": "Deadlock-free resource ordering",
      "question": "Five philosophers need two forks each. Implement wantsToEat so no deadlock occurs.",
      "trigger": "Each operation needs two shared resources; circular wait can deadlock if locks are acquired symmetrically.",
      "intuition": "Break circular wait with a table permit or a consistent fork acquisition order.",
      "edgeCases": "All philosophers start together, same philosopher repeats, exceptions while holding forks, and fork release order.",
      "constraints": "Philosopher ids are 0 through 4, and fork callbacks must wrap eating.",
      "source": {
        "label": "LeetCode 1226 - The Dining Philosophers",
        "url": "https://leetcode.com/problems/the-dining-philosophers/"
      },
      "examples": [
        {
          "input": "All five philosophers call wantsToEat",
          "output": "Every eater eventually finishes",
          "explanation": "At most four can compete for forks, preventing circular wait."
        },
        {
          "input": "Philosopher 0 eats",
          "output": "pickLeft,pickRight,eat,putRight,putLeft",
          "explanation": "Both forks are held only around eat()."
        }
      ],
      "bruteForceComplexity": "Time O(1) per call; Space O(1). A global monitor serializes all meals.",
      "optimizedComplexity": "Time O(1) per call; Space O(1). A semaphore allows at most four fork contenders.",
      "recursiveComplexity": "Time O(1) per call; Space O(1). Lock acquisition is delegated through a helper.",
      "bruteForceCode": "class DiningPhilosophers {\n  public DiningPhilosophers() {}\n\n  public synchronized void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork,\n      Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {\n    pickLeftFork.run();\n    pickRightFork.run();\n    eat.run();\n    putRightFork.run();\n    putLeftFork.run();\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\nimport java.util.concurrent.locks.*;\n\nclass DiningPhilosophers {\n  private final Lock[] forks = new Lock[5];\n  private final Semaphore seats = new Semaphore(4);\n\n  public DiningPhilosophers() {\n    for (int i = 0; i < 5; i++) forks[i] = new ReentrantLock();\n  }\n\n  public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork,\n      Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {\n    int left = philosopher;\n    int right = (philosopher + 1) % 5;\n    seats.acquire();\n    forks[left].lock();\n    forks[right].lock();\n    try {\n      pickLeftFork.run();\n      pickRightFork.run();\n      eat.run();\n      putRightFork.run();\n      putLeftFork.run();\n    } finally {\n      forks[right].unlock();\n      forks[left].unlock();\n      seats.release();\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.locks.*;\n\nclass DiningPhilosophers {\n  private final Lock[] forks = new Lock[5];\n\n  public DiningPhilosophers() {\n    for (int i = 0; i < 5; i++) forks[i] = new ReentrantLock();\n  }\n\n  public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork,\n      Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {\n    int left = philosopher;\n    int right = (philosopher + 1) % 5;\n    int first = Math.min(left, right);\n    int second = Math.max(left, right);\n    eatWithLocks(first, second, left == first, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork);\n  }\n\n  private void eatWithLocks(int first, int second, boolean leftFirst, Runnable pickLeftFork, Runnable pickRightFork,\n      Runnable eat, Runnable putLeftFork, Runnable putRightFork) {\n    forks[first].lock();\n    forks[second].lock();\n    try {\n      if (leftFirst) {\n        pickLeftFork.run();\n        pickRightFork.run();\n      } else {\n        pickRightFork.run();\n        pickLeftFork.run();\n      }\n      eat.run();\n      putRightFork.run();\n      putLeftFork.run();\n    } finally {\n      forks[second].unlock();\n      forks[first].unlock();\n    }\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\nimport java.util.concurrent.locks.*;\n\nclass DiningPhilosophers {\n  private final Lock[] forks = new Lock[5];\n  private final Semaphore seats = new Semaphore(4);\n\n  public DiningPhilosophers() {\n    for (int i = 0; i < 5; i++) forks[i] = new ReentrantLock();\n  }\n\n  public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork,\n      Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {\n    int left = philosopher;\n    int right = (philosopher + 1) % 5;\n    seats.acquire();\n    forks[left].lock();\n    forks[right].lock();\n    try {\n      pickLeftFork.run();\n      pickRightFork.run();\n      eat.run();\n      putRightFork.run();\n      putLeftFork.run();\n    } finally {\n      forks[right].unlock();\n      forks[left].unlock();\n      seats.release();\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\nimport java.util.concurrent.locks.*;\n\nclass DiningPhilosophers {\n  private final Lock[] forks = new Lock[5];\n  private final Semaphore seats = new Semaphore(4);\n\n  public DiningPhilosophers() {\n    for (int i = 0; i < 5; i++) forks[i] = new ReentrantLock();\n  }\n\n  public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork,\n      Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {\n    int left = philosopher;\n    int right = (philosopher + 1) % 5;\n    seats.acquire();\n    forks[left].lock();\n    forks[right].lock();\n    try {\n      pickLeftFork.run();\n      pickRightFork.run();\n      eat.run();\n      putRightFork.run();\n      putLeftFork.run();\n    } finally {\n      forks[right].unlock();\n      forks[left].unlock();\n      seats.release();\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Bounded Blocking Queue",
      "difficulty": "Medium",
      "subpattern": "Bounded blocking queues with conditions",
      "question": "Implement a fixed-capacity queue where enqueue blocks while full and dequeue blocks while empty.",
      "trigger": "Producers and consumers must wait on opposite capacity conditions.",
      "intuition": "Protect the queue with one lock; producers wait for not-full and consumers wait for not-empty.",
      "edgeCases": "Capacity one, dequeue before enqueue, many producers, many consumers, and size visibility.",
      "constraints": "enqueue and dequeue may be called by multiple threads.",
      "source": {
        "label": "LeetCode 1188 - Design Bounded Blocking Queue",
        "url": "https://leetcode.com/problems/design-bounded-blocking-queue/"
      },
      "examples": [
        {
          "input": "capacity = 2, enqueue(1), enqueue(2), dequeue()",
          "output": "1",
          "explanation": "FIFO order is preserved."
        },
        {
          "input": "capacity = 1, dequeue() starts before enqueue(7)",
          "output": "dequeue returns 7 after enqueue",
          "explanation": "Consumer blocks until an item exists."
        }
      ],
      "bruteForceComplexity": "Time O(1) per operation; Space O(capacity). Monitor wait/notify guards queue size.",
      "optimizedComplexity": "Time O(1) per operation; Space O(capacity). ReentrantLock has separate notFull and notEmpty conditions.",
      "recursiveComplexity": "Time O(1) per successful operation; Space O(capacity) plus retry recursion under contention.",
      "bruteForceCode": "import java.util.*;\n\nclass BoundedBlockingQueue {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  private final int capacity;\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void enqueue(int element) throws InterruptedException {\n    while (queue.size() == capacity) wait();\n    queue.offer(element);\n    notifyAll();\n  }\n\n  public synchronized int dequeue() throws InterruptedException {\n    while (queue.isEmpty()) wait();\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BoundedBlockingQueue {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void enqueue(int element) throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.size() == capacity) notFull.await();\n      queue.offer(element);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int dequeue() throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.isEmpty()) notEmpty.await();\n      int value = queue.poll();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return queue.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass BoundedBlockingQueue {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  private final int capacity;\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void enqueue(int element) throws InterruptedException {\n    if (queue.size() == capacity) {\n      wait();\n      enqueue(element);\n      return;\n    }\n    queue.offer(element);\n    notifyAll();\n  }\n\n  public synchronized int dequeue() throws InterruptedException {\n    if (queue.isEmpty()) {\n      wait();\n      return dequeue();\n    }\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BoundedBlockingQueue {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void enqueue(int element) throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.size() == capacity) notFull.await();\n      queue.offer(element);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int dequeue() throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.isEmpty()) notEmpty.await();\n      int value = queue.poll();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return queue.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BoundedBlockingQueue {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void enqueue(int element) throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.size() == capacity) notFull.await();\n      queue.offer(element);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int dequeue() throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.isEmpty()) notEmpty.await();\n      int value = queue.poll();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return queue.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Web Crawler Multithreaded",
      "difficulty": "Medium",
      "subpattern": "Parallel crawl with concurrent visited set",
      "question": "Starting from startUrl, crawl all reachable URLs with the same hostname using the provided HtmlParser.",
      "trigger": "URL expansion is graph traversal, and concurrent workers must share a visited set safely.",
      "intuition": "Only enqueue a URL once, and reject URLs from a different host before scheduling work.",
      "edgeCases": "Cycles, duplicate links, external host links, empty adjacency lists, and worker shutdown.",
      "constraints": "HtmlParser.getUrls(url) returns neighbors; only same-host URLs belong in the answer.",
      "source": {
        "label": "LeetCode 1242 - Web Crawler Multithreaded",
        "url": "https://leetcode.com/problems/web-crawler-multithreaded/"
      },
      "examples": [
        {
          "input": "start = http://news.com/a, links include /b and external.org/x",
          "output": "Only news.com URLs",
          "explanation": "External hosts are ignored."
        },
        {
          "input": "a -> b, b -> a",
          "output": "[a,b]",
          "explanation": "Visited prevents infinite crawling."
        }
      ],
      "bruteForceComplexity": "Time O(V + E); Space O(V). Sequential DFS is the simplest correctness baseline.",
      "optimizedComplexity": "Time O(V + E) work; Space O(V). Concurrent visited set and worker pool parallelize parser calls.",
      "recursiveComplexity": "Time O(V + E); Space O(V + recursion depth). Recursive DFS keeps the same visited invariant.",
      "bruteForceCode": "import java.util.*;\n\ninterface HtmlParser {\n  List<String> getUrls(String url);\n}\n\nclass Solution {\n  public List<String> crawl(String startUrl, HtmlParser htmlParser) {\n    Set<String> seen = new HashSet<>();\n    Deque<String> stack = new ArrayDeque<>();\n    String host = host(startUrl);\n    stack.push(startUrl);\n    seen.add(startUrl);\n\n    while (!stack.isEmpty()) {\n      String url = stack.pop();\n      for (String next : htmlParser.getUrls(url)) {\n        if (host.equals(host(next)) && seen.add(next)) stack.push(next);\n      }\n    }\n    return new ArrayList<>(seen);\n  }\n\n  private String host(String url) {\n    String withoutScheme = url.substring(7);\n    int slash = withoutScheme.indexOf('/');\n    return slash == -1 ? withoutScheme : withoutScheme.substring(0, slash);\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.*;\n\ninterface HtmlParser {\n  List<String> getUrls(String url);\n}\n\nclass Solution {\n  public List<String> crawl(String startUrl, HtmlParser htmlParser) {\n    String host = host(startUrl);\n    Set<String> seen = ConcurrentHashMap.newKeySet();\n    Queue<String> queue = new ConcurrentLinkedQueue<>();\n    seen.add(startUrl);\n    queue.offer(startUrl);\n\n    while (!queue.isEmpty()) {\n      List<String> level = new ArrayList<>();\n      String url;\n      while ((url = queue.poll()) != null) level.add(url);\n      level.parallelStream().forEach(current -> {\n        for (String next : htmlParser.getUrls(current)) {\n          if (host.equals(host(next)) && seen.add(next)) queue.offer(next);\n        }\n      });\n    }\n    return new ArrayList<>(seen);\n  }\n\n  private String host(String url) {\n    String withoutScheme = url.substring(7);\n    int slash = withoutScheme.indexOf('/');\n    return slash == -1 ? withoutScheme : withoutScheme.substring(0, slash);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\ninterface HtmlParser {\n  List<String> getUrls(String url);\n}\n\nclass Solution {\n  public List<String> crawl(String startUrl, HtmlParser htmlParser) {\n    Set<String> seen = Collections.synchronizedSet(new HashSet<>());\n    dfs(startUrl, host(startUrl), htmlParser, seen);\n    return new ArrayList<>(seen);\n  }\n\n  private void dfs(String url, String host, HtmlParser parser, Set<String> seen) {\n    if (!seen.add(url)) return;\n    for (String next : parser.getUrls(url)) {\n      if (host.equals(host(next))) dfs(next, host, parser, seen);\n    }\n  }\n\n  private String host(String url) {\n    String withoutScheme = url.substring(7);\n    int slash = withoutScheme.indexOf('/');\n    return slash == -1 ? withoutScheme : withoutScheme.substring(0, slash);\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.*;\n\ninterface HtmlParser {\n  List<String> getUrls(String url);\n}\n\nclass Solution {\n  public List<String> crawl(String startUrl, HtmlParser htmlParser) {\n    String host = host(startUrl);\n    Set<String> seen = ConcurrentHashMap.newKeySet();\n    Queue<String> queue = new ConcurrentLinkedQueue<>();\n    seen.add(startUrl);\n    queue.offer(startUrl);\n\n    while (!queue.isEmpty()) {\n      List<String> level = new ArrayList<>();\n      String url;\n      while ((url = queue.poll()) != null) level.add(url);\n      level.parallelStream().forEach(current -> {\n        for (String next : htmlParser.getUrls(current)) {\n          if (host.equals(host(next)) && seen.add(next)) queue.offer(next);\n        }\n      });\n    }\n    return new ArrayList<>(seen);\n  }\n\n  private String host(String url) {\n    String withoutScheme = url.substring(7);\n    int slash = withoutScheme.indexOf('/');\n    return slash == -1 ? withoutScheme : withoutScheme.substring(0, slash);\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.*;\n\ninterface HtmlParser {\n  List<String> getUrls(String url);\n}\n\nclass Solution {\n  public List<String> crawl(String startUrl, HtmlParser htmlParser) {\n    String host = host(startUrl);\n    Set<String> seen = ConcurrentHashMap.newKeySet();\n    Queue<String> queue = new ConcurrentLinkedQueue<>();\n    seen.add(startUrl);\n    queue.offer(startUrl);\n\n    while (!queue.isEmpty()) {\n      List<String> level = new ArrayList<>();\n      String url;\n      while ((url = queue.poll()) != null) level.add(url);\n      level.parallelStream().forEach(current -> {\n        for (String next : htmlParser.getUrls(current)) {\n          if (host.equals(host(next)) && seen.add(next)) queue.offer(next);\n        }\n      });\n    }\n    return new ArrayList<>(seen);\n  }\n\n  private String host(String url) {\n    String withoutScheme = url.substring(7);\n    int slash = withoutScheme.indexOf('/');\n    return slash == -1 ? withoutScheme : withoutScheme.substring(0, slash);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Traffic Light Controlled Intersection",
      "difficulty": "Easy",
      "subpattern": "Single-lane traffic light locking",
      "question": "Cars arrive on two roads. A car may pass only when its road has the green light; switch the light if needed.",
      "trigger": "A shared light state must be checked and possibly changed atomically before a car crosses.",
      "intuition": "Protect the current green road with one lock so switching and crossing cannot interleave incorrectly.",
      "edgeCases": "Many cars on the same road, alternating roads, first road already green, and duplicate car ids.",
      "constraints": "Road id is 1 or 2; turnGreen changes the light, crossCar lets the car pass.",
      "source": {
        "label": "LeetCode 1279 - Traffic Light Controlled Intersection",
        "url": "https://leetcode.com/problems/traffic-light-controlled-intersection/"
      },
      "examples": [
        {
          "input": "green road = 1, car on road 1",
          "output": "cross without switch",
          "explanation": "The current green road already matches."
        },
        {
          "input": "green road = 1, car on road 2",
          "output": "turnGreen then cross",
          "explanation": "Switching and crossing happen under the same lock."
        }
      ],
      "bruteForceComplexity": "Time O(1) per car; Space O(1). synchronized serializes light updates.",
      "optimizedComplexity": "Time O(1) per car; Space O(1). ReentrantLock protects the green-road state.",
      "recursiveComplexity": "Time O(1) per car; Space O(1). Helper performs switch-if-needed then crossing.",
      "bruteForceCode": "class TrafficLight {\n  private int greenRoad = 1;\n\n  public TrafficLight() {}\n\n  public synchronized void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) {\n    if (greenRoad != roadId) {\n      turnGreen.run();\n      greenRoad = roadId;\n    }\n    crossCar.run();\n  }\n}",
      "iterativeCode": "import java.util.concurrent.locks.*;\n\nclass TrafficLight {\n  private int greenRoad = 1;\n  private final Lock lock = new ReentrantLock();\n\n  public TrafficLight() {}\n\n  public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) {\n    lock.lock();\n    try {\n      if (greenRoad != roadId) {\n        turnGreen.run();\n        greenRoad = roadId;\n      }\n      crossCar.run();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "recursiveCode": "class TrafficLight {\n  private int greenRoad = 1;\n\n  public TrafficLight() {}\n\n  public synchronized void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) {\n    pass(roadId, turnGreen, crossCar);\n  }\n\n  private void pass(int roadId, Runnable turnGreen, Runnable crossCar) {\n    if (greenRoad != roadId) {\n      turnGreen.run();\n      greenRoad = roadId;\n    }\n    crossCar.run();\n  }\n}",
      "optimizedCode": "import java.util.concurrent.locks.*;\n\nclass TrafficLight {\n  private int greenRoad = 1;\n  private final Lock lock = new ReentrantLock();\n\n  public TrafficLight() {}\n\n  public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) {\n    lock.lock();\n    try {\n      if (greenRoad != roadId) {\n        turnGreen.run();\n        greenRoad = roadId;\n      }\n      crossCar.run();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "code": "import java.util.concurrent.locks.*;\n\nclass TrafficLight {\n  private int greenRoad = 1;\n  private final Lock lock = new ReentrantLock();\n\n  public TrafficLight() {}\n\n  public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) {\n    lock.lock();\n    try {\n      if (greenRoad != roadId) {\n        turnGreen.run();\n        greenRoad = roadId;\n      }\n      crossCar.run();\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Thread-Safe Counter",
      "difficulty": "Easy",
      "subpattern": "Atomic counter and mutual exclusion",
      "question": "Implement a counter supporting increment(), add(delta), and get() safely from multiple threads.",
      "trigger": "Increment and add are compound updates that lose writes without atomicity.",
      "intuition": "Use one atomic primitive or one lock to make each update indivisible and visible.",
      "edgeCases": "Many increments racing, negative deltas, reading during updates, and integer overflow bounds.",
      "constraints": "All methods may be called concurrently.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "100 threads call increment once",
          "output": "100",
          "explanation": "No increment is lost."
        },
        {
          "input": "add(5), add(-2), get()",
          "output": "3",
          "explanation": "Updates are applied atomically in some serial order."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). synchronized protects a plain int.",
      "optimizedComplexity": "Time O(1); Space O(1). AtomicInteger performs lock-free atomic updates.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive style is not natural here, so the tab keeps the synchronized helper path stack-safe.",
      "bruteForceCode": "class ThreadSafeCounter {\n  private int value;\n\n  public synchronized void increment() {\n    value++;\n  }\n\n  public synchronized void add(int delta) {\n    value += delta;\n  }\n\n  public synchronized int get() {\n    return value;\n  }\n}",
      "iterativeCode": "import java.util.concurrent.atomic.*;\n\nclass ThreadSafeCounter {\n  private final AtomicInteger value = new AtomicInteger();\n\n  public void increment() {\n    value.incrementAndGet();\n  }\n\n  public void add(int delta) {\n    value.addAndGet(delta);\n  }\n\n  public int get() {\n    return value.get();\n  }\n}",
      "recursiveCode": "class ThreadSafeCounter {\n  private int value;\n\n  public synchronized void increment() {\n    add(1);\n  }\n\n  public synchronized void add(int delta) {\n    value = applyDelta(value, delta);\n  }\n\n  public synchronized int get() {\n    return value;\n  }\n\n  private int applyDelta(int current, int delta) {\n    return current + delta;\n  }\n}",
      "optimizedCode": "import java.util.concurrent.atomic.*;\n\nclass ThreadSafeCounter {\n  private final AtomicInteger value = new AtomicInteger();\n\n  public void increment() {\n    value.incrementAndGet();\n  }\n\n  public void add(int delta) {\n    value.addAndGet(delta);\n  }\n\n  public int get() {\n    return value.get();\n  }\n}",
      "code": "import java.util.concurrent.atomic.*;\n\nclass ThreadSafeCounter {\n  private final AtomicInteger value = new AtomicInteger();\n\n  public void increment() {\n    value.incrementAndGet();\n  }\n\n  public void add(int delta) {\n    value.addAndGet(delta);\n  }\n\n  public int get() {\n    return value.get();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Producer Consumer Buffer",
      "difficulty": "Medium",
      "subpattern": "Producer-consumer bounded buffer",
      "question": "Implement put(value), take(), and size() for a bounded FIFO buffer shared by producers and consumers.",
      "trigger": "Producers wait for free capacity while consumers wait for available items.",
      "intuition": "The buffer state is valid when 0 <= size <= capacity; every operation waits until it can preserve that invariant.",
      "edgeCases": "Empty take, full put, capacity one, multiple producers, and multiple consumers.",
      "constraints": "The buffer stores integers and all methods may be called concurrently.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "put(4), put(5), take(), take()",
          "output": "4 then 5",
          "explanation": "FIFO order is preserved."
        },
        {
          "input": "capacity = 1, put(1), put(2) before take",
          "output": "second put waits",
          "explanation": "The second producer blocks until space exists."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(capacity). Monitor wait/notify guards queue state.",
      "optimizedComplexity": "Time O(1); Space O(capacity). ArrayBlockingQueue provides the blocking behavior.",
      "recursiveComplexity": "Time O(1) after conditions are met; Space O(capacity) plus recursive retry depth.",
      "bruteForceCode": "import java.util.*;\n\nclass ProducerConsumerBuffer {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  private final int capacity;\n\n  public ProducerConsumerBuffer(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void put(int value) throws InterruptedException {\n    while (queue.size() == capacity) wait();\n    queue.offer(value);\n    notifyAll();\n  }\n\n  public synchronized int take() throws InterruptedException {\n    while (queue.isEmpty()) wait();\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass ProducerConsumerBuffer {\n  private final BlockingQueue<Integer> queue;\n\n  public ProducerConsumerBuffer(int capacity) {\n    queue = new ArrayBlockingQueue<>(capacity);\n  }\n\n  public void put(int value) throws InterruptedException {\n    queue.put(value);\n  }\n\n  public int take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass ProducerConsumerBuffer {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  private final int capacity;\n\n  public ProducerConsumerBuffer(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void put(int value) throws InterruptedException {\n    if (queue.size() == capacity) {\n      wait();\n      put(value);\n      return;\n    }\n    queue.offer(value);\n    notifyAll();\n  }\n\n  public synchronized int take() throws InterruptedException {\n    if (queue.isEmpty()) {\n      wait();\n      return take();\n    }\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass ProducerConsumerBuffer {\n  private final BlockingQueue<Integer> queue;\n\n  public ProducerConsumerBuffer(int capacity) {\n    queue = new ArrayBlockingQueue<>(capacity);\n  }\n\n  public void put(int value) throws InterruptedException {\n    queue.put(value);\n  }\n\n  public int take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass ProducerConsumerBuffer {\n  private final BlockingQueue<Integer> queue;\n\n  public ProducerConsumerBuffer(int capacity) {\n    queue = new ArrayBlockingQueue<>(capacity);\n  }\n\n  public void put(int value) throws InterruptedException {\n    queue.put(value);\n  }\n\n  public int take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Read Write Cache",
      "difficulty": "Medium",
      "subpattern": "Read-write lock cache",
      "question": "Implement a small cache with get(key), put(key,value), and contains(key) where concurrent readers may proceed together but writes are exclusive.",
      "trigger": "Reads dominate and do not mutate state, while writes must exclude both readers and writers.",
      "intuition": "Use a read lock for lookups and a write lock for modifications.",
      "edgeCases": "Missing key, overwriting key, read during write, write during many reads, and null values if disallowed.",
      "constraints": "Keys and values are integers; methods may be called concurrently.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "put(1,10), get(1)",
          "output": "10",
          "explanation": "Write publishes the value before the read returns it."
        },
        {
          "input": "get(7) before put",
          "output": "-1",
          "explanation": "Missing keys return -1."
        }
      ],
      "bruteForceComplexity": "Time O(1) expected; Space O(n). synchronized serializes all reads and writes.",
      "optimizedComplexity": "Time O(1) expected; Space O(n). ReadWriteLock allows concurrent readers.",
      "recursiveComplexity": "Time O(1) expected; Space O(n). Recursive helper keeps the same lock discipline.",
      "bruteForceCode": "import java.util.*;\n\nclass ReadWriteCache {\n  private final Map<Integer, Integer> map = new HashMap<>();\n\n  public synchronized void put(int key, int value) {\n    map.put(key, value);\n  }\n\n  public synchronized int get(int key) {\n    return map.getOrDefault(key, -1);\n  }\n\n  public synchronized boolean contains(int key) {\n    return map.containsKey(key);\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass ReadWriteCache {\n  private final Map<Integer, Integer> map = new HashMap<>();\n  private final ReadWriteLock lock = new ReentrantReadWriteLock();\n\n  public void put(int key, int value) {\n    lock.writeLock().lock();\n    try {\n      map.put(key, value);\n    } finally {\n      lock.writeLock().unlock();\n    }\n  }\n\n  public int get(int key) {\n    lock.readLock().lock();\n    try {\n      return map.getOrDefault(key, -1);\n    } finally {\n      lock.readLock().unlock();\n    }\n  }\n\n  public boolean contains(int key) {\n    lock.readLock().lock();\n    try {\n      return map.containsKey(key);\n    } finally {\n      lock.readLock().unlock();\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass ReadWriteCache {\n  private final Map<Integer, Integer> map = new HashMap<>();\n\n  public synchronized void put(int key, int value) {\n    write(key, value);\n  }\n\n  public synchronized int get(int key) {\n    return read(key);\n  }\n\n  public synchronized boolean contains(int key) {\n    return map.containsKey(key);\n  }\n\n  private void write(int key, int value) {\n    map.put(key, value);\n  }\n\n  private int read(int key) {\n    return map.getOrDefault(key, -1);\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass ReadWriteCache {\n  private final Map<Integer, Integer> map = new HashMap<>();\n  private final ReadWriteLock lock = new ReentrantReadWriteLock();\n\n  public void put(int key, int value) {\n    lock.writeLock().lock();\n    try {\n      map.put(key, value);\n    } finally {\n      lock.writeLock().unlock();\n    }\n  }\n\n  public int get(int key) {\n    lock.readLock().lock();\n    try {\n      return map.getOrDefault(key, -1);\n    } finally {\n      lock.readLock().unlock();\n    }\n  }\n\n  public boolean contains(int key) {\n    lock.readLock().lock();\n    try {\n      return map.containsKey(key);\n    } finally {\n      lock.readLock().unlock();\n    }\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass ReadWriteCache {\n  private final Map<Integer, Integer> map = new HashMap<>();\n  private final ReadWriteLock lock = new ReentrantReadWriteLock();\n\n  public void put(int key, int value) {\n    lock.writeLock().lock();\n    try {\n      map.put(key, value);\n    } finally {\n      lock.writeLock().unlock();\n    }\n  }\n\n  public int get(int key) {\n    lock.readLock().lock();\n    try {\n      return map.getOrDefault(key, -1);\n    } finally {\n      lock.readLock().unlock();\n    }\n  }\n\n  public boolean contains(int key) {\n    lock.readLock().lock();\n    try {\n      return map.containsKey(key);\n    } finally {\n      lock.readLock().unlock();\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sliding Window Rate Limiter",
      "difficulty": "Medium",
      "subpattern": "Sliding-window rate limiting",
      "question": "Implement allow(userId, timestampMillis) so each user can perform at most limit actions in any rolling window.",
      "trigger": "Each decision depends on recent timestamps for the same key and must be atomic under concurrent calls.",
      "intuition": "Keep a timestamp queue per user, evict entries outside the rolling window, then admit only if the queue is below the limit.",
      "edgeCases": "Boundary timestamp exactly at window start, first request from a user, many users, and concurrent requests for the same user.",
      "constraints": "timestampMillis is nondecreasing per user in typical tests; windowMillis and limit are positive.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "limit=2, window=1000, user=7 at 0, 500, 999",
          "output": "true,true,false",
          "explanation": "The third request is still inside the same rolling window."
        },
        {
          "input": "limit=2, window=1000, user=7 at 0, 500, 1000",
          "output": "true,true,true",
          "explanation": "The request at 0 has expired when timestamp is 1000."
        }
      ],
      "bruteForceComplexity": "Time O(k) per request; Space O(Uk). synchronized protects all per-user timestamp queues.",
      "optimizedComplexity": "Time O(k) per request; Space O(Uk). A lock keeps each evict-and-insert decision atomic.",
      "recursiveComplexity": "Time O(k) per request; Space O(Uk + k) recursion depth while evicting expired timestamps.",
      "bruteForceCode": "import java.util.*;\n\nclass SlidingWindowRateLimiter {\n  private final int limit;\n  private final long windowMillis;\n  private final Map<Integer, Deque<Long>> requests = new HashMap<>();\n\n  public SlidingWindowRateLimiter(int limit, long windowMillis) {\n    this.limit = limit;\n    this.windowMillis = windowMillis;\n  }\n\n  public synchronized boolean allow(int userId, long timestampMillis) {\n    Deque<Long> queue = requests.computeIfAbsent(userId, key -> new ArrayDeque<>());\n    while (!queue.isEmpty() && timestampMillis - queue.peekFirst() >= windowMillis) queue.pollFirst();\n    if (queue.size() == limit) return false;\n    queue.offerLast(timestampMillis);\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass SlidingWindowRateLimiter {\n  private final int limit;\n  private final long windowMillis;\n  private final Map<Integer, Deque<Long>> requests = new HashMap<>();\n  private final Lock lock = new ReentrantLock();\n\n  public SlidingWindowRateLimiter(int limit, long windowMillis) {\n    this.limit = limit;\n    this.windowMillis = windowMillis;\n  }\n\n  public boolean allow(int userId, long timestampMillis) {\n    lock.lock();\n    try {\n      Deque<Long> queue = requests.computeIfAbsent(userId, key -> new ArrayDeque<>());\n      while (!queue.isEmpty() && timestampMillis - queue.peekFirst() >= windowMillis) queue.pollFirst();\n      if (queue.size() >= limit) return false;\n      queue.offerLast(timestampMillis);\n      return true;\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SlidingWindowRateLimiter {\n  private final int limit;\n  private final long windowMillis;\n  private final Map<Integer, Deque<Long>> requests = new HashMap<>();\n\n  public SlidingWindowRateLimiter(int limit, long windowMillis) {\n    this.limit = limit;\n    this.windowMillis = windowMillis;\n  }\n\n  public synchronized boolean allow(int userId, long timestampMillis) {\n    Deque<Long> queue = requests.computeIfAbsent(userId, key -> new ArrayDeque<>());\n    removeExpired(queue, timestampMillis);\n    if (queue.size() >= limit) return false;\n    queue.offerLast(timestampMillis);\n    return true;\n  }\n\n  private void removeExpired(Deque<Long> queue, long now) {\n    if (queue.isEmpty() || now - queue.peekFirst() < windowMillis) return;\n    queue.pollFirst();\n    removeExpired(queue, now);\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass SlidingWindowRateLimiter {\n  private final int limit;\n  private final long windowMillis;\n  private final Map<Integer, Deque<Long>> requests = new HashMap<>();\n  private final Lock lock = new ReentrantLock();\n\n  public SlidingWindowRateLimiter(int limit, long windowMillis) {\n    this.limit = limit;\n    this.windowMillis = windowMillis;\n  }\n\n  public boolean allow(int userId, long timestampMillis) {\n    lock.lock();\n    try {\n      Deque<Long> queue = requests.computeIfAbsent(userId, key -> new ArrayDeque<>());\n      while (!queue.isEmpty() && timestampMillis - queue.peekFirst() >= windowMillis) queue.pollFirst();\n      if (queue.size() >= limit) return false;\n      queue.offerLast(timestampMillis);\n      return true;\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass SlidingWindowRateLimiter {\n  private final int limit;\n  private final long windowMillis;\n  private final Map<Integer, Deque<Long>> requests = new HashMap<>();\n  private final Lock lock = new ReentrantLock();\n\n  public SlidingWindowRateLimiter(int limit, long windowMillis) {\n    this.limit = limit;\n    this.windowMillis = windowMillis;\n  }\n\n  public boolean allow(int userId, long timestampMillis) {\n    lock.lock();\n    try {\n      Deque<Long> queue = requests.computeIfAbsent(userId, key -> new ArrayDeque<>());\n      while (!queue.isEmpty() && timestampMillis - queue.peekFirst() >= windowMillis) queue.pollFirst();\n      if (queue.size() >= limit) return false;\n      queue.offerLast(timestampMillis);\n      return true;\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Token Bucket Rate Limiter",
      "difficulty": "Medium",
      "subpattern": "Token bucket refill and consumption",
      "question": "Implement allow(timestampMillis) for a token bucket with fixed capacity and refill rate.",
      "trigger": "Requests consume a finite resource that refills over time, so refill and consume must be one atomic update.",
      "intuition": "Before each request, add tokens earned since the last refill, cap at capacity, then consume one token if available.",
      "edgeCases": "Empty bucket, long idle period, fractional refill remainder, simultaneous requests, and capacity saturation.",
      "constraints": "refillPerSecond and capacity are positive integers.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "capacity=2, rate=1/sec, calls at 0,0,0",
          "output": "true,true,false",
          "explanation": "Only two initial tokens are available."
        },
        {
          "input": "capacity=2, rate=1/sec, calls at 0,0,1000",
          "output": "true,true,true",
          "explanation": "One token refills after one second."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). synchronized protects refill and consume.",
      "optimizedComplexity": "Time O(1); Space O(1). Lock-based implementation keeps refill math explicit.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive helper retries only after refill calculation.",
      "bruteForceCode": "class TokenBucketRateLimiter {\n  private final int capacity;\n  private final int refillPerSecond;\n  private double tokens;\n  private long lastRefillMillis;\n\n  public TokenBucketRateLimiter(int capacity, int refillPerSecond) {\n    this.capacity = capacity;\n    this.refillPerSecond = refillPerSecond;\n    this.tokens = capacity;\n  }\n\n  public synchronized boolean allow(long timestampMillis) {\n    refill(timestampMillis);\n    if (tokens < 1.0) return false;\n    tokens -= 1.0;\n    return true;\n  }\n\n  private void refill(long now) {\n    long elapsed = now - lastRefillMillis;\n    if (elapsed <= 0) return;\n    tokens = Math.min(capacity, tokens + elapsed * refillPerSecond / 1000.0);\n    lastRefillMillis = now;\n  }\n}",
      "iterativeCode": "import java.util.concurrent.locks.*;\n\nclass TokenBucketRateLimiter {\n  private final int capacity;\n  private final int refillPerSecond;\n  private double tokens;\n  private long lastRefillMillis;\n  private final Lock lock = new ReentrantLock();\n\n  public TokenBucketRateLimiter(int capacity, int refillPerSecond) {\n    this.capacity = capacity;\n    this.refillPerSecond = refillPerSecond;\n    this.tokens = capacity;\n  }\n\n  public boolean allow(long timestampMillis) {\n    lock.lock();\n    try {\n      long elapsed = Math.max(0, timestampMillis - lastRefillMillis);\n      tokens = Math.min(capacity, tokens + elapsed * refillPerSecond / 1000.0);\n      lastRefillMillis = Math.max(lastRefillMillis, timestampMillis);\n      if (tokens < 1.0) return false;\n      tokens -= 1.0;\n      return true;\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "recursiveCode": "class TokenBucketRateLimiter {\n  private final int capacity;\n  private final int refillPerSecond;\n  private double tokens;\n  private long lastRefillMillis;\n\n  public TokenBucketRateLimiter(int capacity, int refillPerSecond) {\n    this.capacity = capacity;\n    this.refillPerSecond = refillPerSecond;\n    this.tokens = capacity;\n  }\n\n  public synchronized boolean allow(long timestampMillis) {\n    refill(timestampMillis);\n    return consume();\n  }\n\n  private void refill(long now) {\n    long elapsed = Math.max(0, now - lastRefillMillis);\n    tokens = Math.min(capacity, tokens + elapsed * refillPerSecond / 1000.0);\n    lastRefillMillis = Math.max(lastRefillMillis, now);\n  }\n\n  private boolean consume() {\n    if (tokens < 1.0) return false;\n    tokens -= 1.0;\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.concurrent.locks.*;\n\nclass TokenBucketRateLimiter {\n  private final int capacity;\n  private final int refillPerSecond;\n  private double tokens;\n  private long lastRefillMillis;\n  private final Lock lock = new ReentrantLock();\n\n  public TokenBucketRateLimiter(int capacity, int refillPerSecond) {\n    this.capacity = capacity;\n    this.refillPerSecond = refillPerSecond;\n    this.tokens = capacity;\n  }\n\n  public boolean allow(long timestampMillis) {\n    lock.lock();\n    try {\n      long elapsed = Math.max(0, timestampMillis - lastRefillMillis);\n      tokens = Math.min(capacity, tokens + elapsed * refillPerSecond / 1000.0);\n      lastRefillMillis = Math.max(lastRefillMillis, timestampMillis);\n      if (tokens < 1.0) return false;\n      tokens -= 1.0;\n      return true;\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "code": "import java.util.concurrent.locks.*;\n\nclass TokenBucketRateLimiter {\n  private final int capacity;\n  private final int refillPerSecond;\n  private double tokens;\n  private long lastRefillMillis;\n  private final Lock lock = new ReentrantLock();\n\n  public TokenBucketRateLimiter(int capacity, int refillPerSecond) {\n    this.capacity = capacity;\n    this.refillPerSecond = refillPerSecond;\n    this.tokens = capacity;\n  }\n\n  public boolean allow(long timestampMillis) {\n    lock.lock();\n    try {\n      long elapsed = Math.max(0, timestampMillis - lastRefillMillis);\n      tokens = Math.min(capacity, tokens + elapsed * refillPerSecond / 1000.0);\n      lastRefillMillis = Math.max(lastRefillMillis, timestampMillis);\n      if (tokens < 1.0) return false;\n      tokens -= 1.0;\n      return true;\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Reusable Barrier",
      "difficulty": "Hard",
      "subpattern": "Reusable barrier generations",
      "question": "Implement await() for a barrier that releases threads in groups of parties and can be reused for the next group.",
      "trigger": "Threads must wait until exactly parties arrivals complete the current generation.",
      "intuition": "Track count and generation; the final arriving thread advances generation and wakes all waiters.",
      "edgeCases": "parties = 1, multiple generations, spurious wakeups, and last thread arriving while others wait.",
      "constraints": "await() may be called repeatedly by multiple threads.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "parties=3, two threads call await",
          "output": "both block",
          "explanation": "The generation opens only when the third thread arrives."
        },
        {
          "input": "parties=2, four calls total",
          "output": "two separate releases",
          "explanation": "The barrier resets after each generation."
        }
      ],
      "bruteForceComplexity": "Time O(1) per await excluding waiting; Space O(1). Monitor guards count and generation.",
      "optimizedComplexity": "Time O(1) per await excluding waiting; Space O(1). CyclicBarrier provides the same primitive.",
      "recursiveComplexity": "Time O(1) per await excluding waiting; Space O(1) plus recursive wait retries.",
      "bruteForceCode": "class ReusableBarrier {\n  private final int parties;\n  private int arrived;\n  private int generation;\n\n  public ReusableBarrier(int parties) {\n    this.parties = parties;\n  }\n\n  public synchronized void await() throws InterruptedException {\n    int myGeneration = generation;\n    arrived++;\n    if (arrived == parties) {\n      arrived = 0;\n      generation++;\n      notifyAll();\n      return;\n    }\n    while (myGeneration == generation) wait();\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass ReusableBarrier {\n  private final CyclicBarrier barrier;\n\n  public ReusableBarrier(int parties) {\n    barrier = new CyclicBarrier(parties);\n  }\n\n  public void await() throws InterruptedException {\n    try {\n      barrier.await();\n    } catch (BrokenBarrierException ex) {\n      throw new IllegalStateException(ex);\n    }\n  }\n}",
      "recursiveCode": "class ReusableBarrier {\n  private final int parties;\n  private int arrived;\n  private int generation;\n\n  public ReusableBarrier(int parties) {\n    this.parties = parties;\n  }\n\n  public synchronized void await() throws InterruptedException {\n    int myGeneration = generation;\n    arrived++;\n    if (arrived == parties) {\n      arrived = 0;\n      generation++;\n      notifyAll();\n      return;\n    }\n    waitForNextGeneration(myGeneration);\n  }\n\n  private void waitForNextGeneration(int myGeneration) throws InterruptedException {\n    if (myGeneration != generation) return;\n    wait();\n    waitForNextGeneration(myGeneration);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass ReusableBarrier {\n  private final CyclicBarrier barrier;\n\n  public ReusableBarrier(int parties) {\n    barrier = new CyclicBarrier(parties);\n  }\n\n  public void await() throws InterruptedException {\n    try {\n      barrier.await();\n    } catch (BrokenBarrierException ex) {\n      throw new IllegalStateException(ex);\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass ReusableBarrier {\n  private final CyclicBarrier barrier;\n\n  public ReusableBarrier(int parties) {\n    barrier = new CyclicBarrier(parties);\n  }\n\n  public void await() throws InterruptedException {\n    try {\n      barrier.await();\n    } catch (BrokenBarrierException ex) {\n      throw new IllegalStateException(ex);\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Custom CountDown Latch",
      "difficulty": "Medium",
      "subpattern": "One-shot countdown latch",
      "question": "Implement await(), countDown(), and getCount() for a latch that opens once the count reaches zero.",
      "trigger": "Many waiters must block until a one-way state transition happens.",
      "intuition": "Decrement count under a lock; when it reaches zero, notify every waiter and never close again.",
      "edgeCases": "Initial count zero, extra countDown calls, many awaiters, and spurious wakeups.",
      "constraints": "count never goes below zero.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "count=2, await before two countDown calls",
          "output": "await blocks then returns",
          "explanation": "The latch opens after the second decrement."
        },
        {
          "input": "count=0, await",
          "output": "returns immediately",
          "explanation": "A zero-count latch starts open."
        }
      ],
      "bruteForceComplexity": "Time O(1) per operation excluding waiting; Space O(1). synchronized guards count.",
      "optimizedComplexity": "Time O(1) per operation excluding waiting; Space O(1). CountDownLatch is the production primitive.",
      "recursiveComplexity": "Time O(1) excluding waiting; Space O(wait retries). Recursive helper rechecks after wakeup.",
      "bruteForceCode": "class CustomCountDownLatch {\n  private int count;\n\n  public CustomCountDownLatch(int count) {\n    this.count = count;\n  }\n\n  public synchronized void await() throws InterruptedException {\n    while (count > 0) wait();\n  }\n\n  public synchronized void countDown() {\n    if (count == 0) return;\n    count--;\n    if (count == 0) notifyAll();\n  }\n\n  public synchronized int getCount() {\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass CustomCountDownLatch {\n  private final CountDownLatch latch;\n\n  public CustomCountDownLatch(int count) {\n    latch = new CountDownLatch(count);\n  }\n\n  public void await() throws InterruptedException {\n    latch.await();\n  }\n\n  public void countDown() {\n    latch.countDown();\n  }\n\n  public int getCount() {\n    return (int) latch.getCount();\n  }\n}",
      "recursiveCode": "class CustomCountDownLatch {\n  private int count;\n\n  public CustomCountDownLatch(int count) {\n    this.count = count;\n  }\n\n  public synchronized void await() throws InterruptedException {\n    waitUntilOpen();\n  }\n\n  public synchronized void countDown() {\n    if (count == 0) return;\n    count--;\n    if (count == 0) notifyAll();\n  }\n\n  public synchronized int getCount() {\n    return count;\n  }\n\n  private void waitUntilOpen() throws InterruptedException {\n    if (count == 0) return;\n    wait();\n    waitUntilOpen();\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass CustomCountDownLatch {\n  private final CountDownLatch latch;\n\n  public CustomCountDownLatch(int count) {\n    latch = new CountDownLatch(count);\n  }\n\n  public void await() throws InterruptedException {\n    latch.await();\n  }\n\n  public void countDown() {\n    latch.countDown();\n  }\n\n  public int getCount() {\n    return (int) latch.getCount();\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass CustomCountDownLatch {\n  private final CountDownLatch latch;\n\n  public CustomCountDownLatch(int count) {\n    latch = new CountDownLatch(count);\n  }\n\n  public void await() throws InterruptedException {\n    latch.await();\n  }\n\n  public void countDown() {\n    latch.countDown();\n  }\n\n  public int getCount() {\n    return (int) latch.getCount();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Blocking Stack",
      "difficulty": "Medium",
      "subpattern": "Blocking stack with empty/full waits",
      "question": "Implement push(value), pop(), and size() for a bounded LIFO stack where push blocks when full and pop blocks when empty.",
      "trigger": "The data structure has two blocking boundary states: empty for consumers and full for producers.",
      "intuition": "Use a lock to protect the stack and wait on the boundary condition before mutating.",
      "edgeCases": "Capacity one, pop before push, push when full, multiple waiters, and LIFO order.",
      "constraints": "All methods may be called concurrently.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "push(1), push(2), pop()",
          "output": "2",
          "explanation": "The most recent value is popped first."
        },
        {
          "input": "capacity=1, pop() before push(9)",
          "output": "pop returns 9",
          "explanation": "The pop waits for a pushed value."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(capacity). Monitor wait/notify protects the deque.",
      "optimizedComplexity": "Time O(1); Space O(capacity). Lock conditions separate notFull and notEmpty.",
      "recursiveComplexity": "Time O(1) once unblocked; Space O(capacity + retry depth).",
      "bruteForceCode": "import java.util.*;\n\nclass BlockingStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final int capacity;\n\n  public BlockingStack(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void push(int value) throws InterruptedException {\n    while (stack.size() == capacity) wait();\n    stack.push(value);\n    notifyAll();\n  }\n\n  public synchronized int pop() throws InterruptedException {\n    while (stack.isEmpty()) wait();\n    int value = stack.pop();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return stack.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BlockingStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BlockingStack(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void push(int value) throws InterruptedException {\n    lock.lock();\n    try {\n      while (stack.size() == capacity) notFull.await();\n      stack.push(value);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int pop() throws InterruptedException {\n    lock.lock();\n    try {\n      while (stack.isEmpty()) notEmpty.await();\n      int value = stack.pop();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return stack.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass BlockingStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final int capacity;\n\n  public BlockingStack(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void push(int value) throws InterruptedException {\n    if (stack.size() == capacity) {\n      wait();\n      push(value);\n      return;\n    }\n    stack.push(value);\n    notifyAll();\n  }\n\n  public synchronized int pop() throws InterruptedException {\n    if (stack.isEmpty()) {\n      wait();\n      return pop();\n    }\n    int value = stack.pop();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return stack.size();\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BlockingStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BlockingStack(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void push(int value) throws InterruptedException {\n    lock.lock();\n    try {\n      while (stack.size() == capacity) notFull.await();\n      stack.push(value);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int pop() throws InterruptedException {\n    lock.lock();\n    try {\n      while (stack.isEmpty()) notEmpty.await();\n      int value = stack.pop();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return stack.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BlockingStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BlockingStack(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void push(int value) throws InterruptedException {\n    lock.lock();\n    try {\n      while (stack.size() == capacity) notFull.await();\n      stack.push(value);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int pop() throws InterruptedException {\n    lock.lock();\n    try {\n      while (stack.isEmpty()) notEmpty.await();\n      int value = stack.pop();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return stack.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Ordered Batch Processor",
      "difficulty": "Hard",
      "subpattern": "Ordered batch emission",
      "question": "Tasks finish in arbitrary order but must publish their output by increasing sequence id.",
      "trigger": "Concurrent completion order differs from required output order.",
      "intuition": "Store completed tasks by id and release the longest ready prefix starting at nextExpected.",
      "edgeCases": "Task 2 completes before task 1, duplicate ids, gaps, many buffered completions, callback exceptions, and callbacks that should not run while the processor lock is held.",
      "constraints": "Sequence ids start at 1 and each id is submitted once.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "complete id 2 then id 1",
          "output": "publish 1 then 2",
          "explanation": "id 2 is buffered until id 1 arrives."
        },
        {
          "input": "complete 1,2,4",
          "output": "publish 1,2 only",
          "explanation": "id 4 waits for id 3."
        }
      ],
      "bruteForceComplexity": "Time O(k) per ready burst; Space O(k). synchronized protects the buffer while callbacks run outside the lock.",
      "optimizedComplexity": "Time O(k) per ready burst; Space O(k). A lock guards the map and next pointer, then ready callbacks run after unlocking.",
      "recursiveComplexity": "Time O(k) per ready burst; Space O(k + ready-prefix depth). Recursive drain collects the ready prefix before callbacks run.",
      "bruteForceCode": "import java.util.*;\n\nclass OrderedBatchProcessor {\n  private final Map<Integer, Runnable> ready = new HashMap<>();\n  private int nextExpected = 1;\n\n  public void complete(int id, Runnable publish) {\n    List<Runnable> toPublish;\n    synchronized (this) {\n      if (id < nextExpected || ready.containsKey(id)) return;\n      ready.put(id, publish);\n      toPublish = drainReady();\n    }\n    for (Runnable task : toPublish) task.run();\n  }\n\n  public synchronized int nextExpected() {\n    return nextExpected;\n  }\n\n  private List<Runnable> drainReady() {\n    List<Runnable> tasks = new ArrayList<>();\n    while (ready.containsKey(nextExpected)) {\n      tasks.add(ready.remove(nextExpected));\n      nextExpected++;\n    }\n    return tasks;\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass OrderedBatchProcessor {\n  private final Map<Integer, Runnable> ready = new HashMap<>();\n  private final Lock lock = new ReentrantLock();\n  private int nextExpected = 1;\n\n  public void complete(int id, Runnable publish) {\n    List<Runnable> toPublish;\n    lock.lock();\n    try {\n      if (id < nextExpected || ready.containsKey(id)) return;\n      ready.put(id, publish);\n      toPublish = drainReady();\n    } finally {\n      lock.unlock();\n    }\n    for (Runnable task : toPublish) task.run();\n  }\n\n  public int nextExpected() {\n    lock.lock();\n    try {\n      return nextExpected;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  private List<Runnable> drainReady() {\n    List<Runnable> tasks = new ArrayList<>();\n    while (ready.containsKey(nextExpected)) {\n      tasks.add(ready.remove(nextExpected));\n      nextExpected++;\n    }\n    return tasks;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass OrderedBatchProcessor {\n  private final Map<Integer, Runnable> ready = new HashMap<>();\n  private int nextExpected = 1;\n\n  public void complete(int id, Runnable publish) {\n    List<Runnable> toPublish = new ArrayList<>();\n    synchronized (this) {\n      if (id < nextExpected || ready.containsKey(id)) return;\n      ready.put(id, publish);\n      drain(toPublish);\n    }\n    runAll(toPublish, 0);\n  }\n\n  public synchronized int nextExpected() {\n    return nextExpected;\n  }\n\n  private void drain(List<Runnable> tasks) {\n    Runnable task = ready.remove(nextExpected);\n    if (task == null) return;\n    tasks.add(task);\n    nextExpected++;\n    drain(tasks);\n  }\n\n  private void runAll(List<Runnable> tasks, int index) {\n    if (index == tasks.size()) return;\n    tasks.get(index).run();\n    runAll(tasks, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass OrderedBatchProcessor {\n  private final Map<Integer, Runnable> ready = new HashMap<>();\n  private final Lock lock = new ReentrantLock();\n  private int nextExpected = 1;\n\n  public void complete(int id, Runnable publish) {\n    List<Runnable> toPublish;\n    lock.lock();\n    try {\n      if (id < nextExpected || ready.containsKey(id)) return;\n      ready.put(id, publish);\n      toPublish = drainReady();\n    } finally {\n      lock.unlock();\n    }\n    for (Runnable task : toPublish) task.run();\n  }\n\n  public int nextExpected() {\n    lock.lock();\n    try {\n      return nextExpected;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  private List<Runnable> drainReady() {\n    List<Runnable> tasks = new ArrayList<>();\n    while (ready.containsKey(nextExpected)) {\n      tasks.add(ready.remove(nextExpected));\n      nextExpected++;\n    }\n    return tasks;\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass OrderedBatchProcessor {\n  private final Map<Integer, Runnable> ready = new HashMap<>();\n  private final Lock lock = new ReentrantLock();\n  private int nextExpected = 1;\n\n  public void complete(int id, Runnable publish) {\n    List<Runnable> toPublish;\n    lock.lock();\n    try {\n      if (id < nextExpected || ready.containsKey(id)) return;\n      ready.put(id, publish);\n      toPublish = drainReady();\n    } finally {\n      lock.unlock();\n    }\n    for (Runnable task : toPublish) task.run();\n  }\n\n  public int nextExpected() {\n    lock.lock();\n    try {\n      return nextExpected;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  private List<Runnable> drainReady() {\n    List<Runnable> tasks = new ArrayList<>();\n    while (ready.containsKey(nextExpected)) {\n      tasks.add(ready.remove(nextExpected));\n      nextExpected++;\n    }\n    return tasks;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Parallel Sum",
      "difficulty": "Medium",
      "subpattern": "Fork-join parallel reduction",
      "question": "Return the sum of an integer array using a concurrency-ready divide-and-conquer reduction.",
      "trigger": "The operation is associative, so disjoint ranges can be processed independently and joined.",
      "intuition": "Split ranges until small, sum directly, then combine left and right results.",
      "edgeCases": "Empty array, one element, negative values, overflow expectations, and uneven split sizes.",
      "constraints": "Return a long sum of all elements.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,4]",
          "output": "10",
          "explanation": "Partial sums combine to the total."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "The empty sum is zero."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Sequential sum is the baseline.",
      "optimizedComplexity": "Time O(n) work; Space O(log n). ForkJoin splits large ranges in parallel.",
      "recursiveComplexity": "Time O(n); Space O(log n). Recursive divide-and-conquer sums ranges.",
      "bruteForceCode": "class Solution {\n  public long parallelSum(int[] values) {\n    long sum = 0;\n    for (int value : values) sum += value;\n    return sum;\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass Solution {\n  public long parallelSum(int[] values) {\n    return ForkJoinPool.commonPool().invoke(new SumTask(values, 0, values.length));\n  }\n\n  private static class SumTask extends RecursiveTask<Long> {\n    private static final int THRESHOLD = 1024;\n    private final int[] values;\n    private final int left;\n    private final int right;\n\n    SumTask(int[] values, int left, int right) {\n      this.values = values;\n      this.left = left;\n      this.right = right;\n    }\n\n    protected Long compute() {\n      if (right - left <= THRESHOLD) {\n        long sum = 0;\n        for (int i = left; i < right; i++) sum += values[i];\n        return sum;\n      }\n      int mid = left + (right - left) / 2;\n      SumTask leftTask = new SumTask(values, left, mid);\n      SumTask rightTask = new SumTask(values, mid, right);\n      leftTask.fork();\n      long rightSum = rightTask.compute();\n      return leftTask.join() + rightSum;\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public long parallelSum(int[] values) {\n    return sum(values, 0, values.length);\n  }\n\n  private long sum(int[] values, int left, int right) {\n    if (left >= right) return 0L;\n    if (right - left == 1) return values[left];\n    int mid = left + (right - left) / 2;\n    return sum(values, left, mid) + sum(values, mid, right);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass Solution {\n  public long parallelSum(int[] values) {\n    return ForkJoinPool.commonPool().invoke(new SumTask(values, 0, values.length));\n  }\n\n  private static class SumTask extends RecursiveTask<Long> {\n    private static final int THRESHOLD = 1024;\n    private final int[] values;\n    private final int left;\n    private final int right;\n\n    SumTask(int[] values, int left, int right) {\n      this.values = values;\n      this.left = left;\n      this.right = right;\n    }\n\n    protected Long compute() {\n      if (right - left <= THRESHOLD) {\n        long sum = 0;\n        for (int i = left; i < right; i++) sum += values[i];\n        return sum;\n      }\n      int mid = left + (right - left) / 2;\n      SumTask leftTask = new SumTask(values, left, mid);\n      SumTask rightTask = new SumTask(values, mid, right);\n      leftTask.fork();\n      long rightSum = rightTask.compute();\n      return leftTask.join() + rightSum;\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass Solution {\n  public long parallelSum(int[] values) {\n    return ForkJoinPool.commonPool().invoke(new SumTask(values, 0, values.length));\n  }\n\n  private static class SumTask extends RecursiveTask<Long> {\n    private static final int THRESHOLD = 1024;\n    private final int[] values;\n    private final int left;\n    private final int right;\n\n    SumTask(int[] values, int left, int right) {\n      this.values = values;\n      this.left = left;\n      this.right = right;\n    }\n\n    protected Long compute() {\n      if (right - left <= THRESHOLD) {\n        long sum = 0;\n        for (int i = left; i < right; i++) sum += values[i];\n        return sum;\n      }\n      int mid = left + (right - left) / 2;\n      SumTask leftTask = new SumTask(values, left, mid);\n      SumTask rightTask = new SumTask(values, mid, right);\n      leftTask.fork();\n      long rightSum = rightTask.compute();\n      return leftTask.join() + rightSum;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Concurrent LRU Cache",
      "difficulty": "Hard",
      "subpattern": "Thread-safe LRU cache",
      "question": "Implement get(key) and put(key,value) for a fixed-capacity LRU cache safe for concurrent callers.",
      "trigger": "Each get and put mutates recency order, so map and linked order must be updated atomically.",
      "intuition": "Use LinkedHashMap in access order and protect every operation with the same lock.",
      "edgeCases": "Capacity one, updating an existing key, get on missing key, eviction after access, and concurrent get/put.",
      "constraints": "Keys and values are integers; missing get returns -1.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "cap=2, put(1,1), put(2,2), get(1), put(3,3), get(2)",
          "output": "-1 for get(2)",
          "explanation": "Key 2 is least recently used and gets evicted."
        },
        {
          "input": "cap=1, put(1,1), put(1,2), get(1)",
          "output": "2",
          "explanation": "Updating an existing key does not create a second entry."
        }
      ],
      "bruteForceComplexity": "Time O(1) expected; Space O(capacity). synchronized protects LinkedHashMap.",
      "optimizedComplexity": "Time O(1) expected; Space O(capacity). ReentrantLock protects access-order updates.",
      "recursiveComplexity": "Time O(1) expected; Space O(capacity). Helper methods keep lock-protected operations compact.",
      "bruteForceCode": "import java.util.*;\n\nclass ConcurrentLRUCache {\n  private final int capacity;\n  private final LinkedHashMap<Integer, Integer> map;\n\n  public ConcurrentLRUCache(int capacity) {\n    this.capacity = capacity;\n    this.map = new LinkedHashMap<>(16, 0.75f, true);\n  }\n\n  public synchronized int get(int key) {\n    Integer value = map.get(key);\n    return value == null ? -1 : value;\n  }\n\n  public synchronized void put(int key, int value) {\n    map.put(key, value);\n    if (map.size() > capacity) {\n      Integer eldest = map.keySet().iterator().next();\n      map.remove(eldest);\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass ConcurrentLRUCache {\n  private final int capacity;\n  private final LinkedHashMap<Integer, Integer> map;\n  private final Lock lock = new ReentrantLock();\n\n  public ConcurrentLRUCache(int capacity) {\n    this.capacity = capacity;\n    this.map = new LinkedHashMap<>(16, 0.75f, true);\n  }\n\n  public int get(int key) {\n    lock.lock();\n    try {\n      Integer value = map.get(key);\n    return value == null ? -1 : value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public void put(int key, int value) {\n    lock.lock();\n    try {\n      map.put(key, value);\n      if (map.size() > capacity) {\n        Iterator<Integer> iterator = map.keySet().iterator();\n        map.remove(iterator.next());\n      }\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass ConcurrentLRUCache {\n  private final int capacity;\n  private final LinkedHashMap<Integer, Integer> map;\n\n  public ConcurrentLRUCache(int capacity) {\n    this.capacity = capacity;\n    this.map = new LinkedHashMap<>(16, 0.75f, true);\n  }\n\n  public synchronized int get(int key) {\n    return read(key);\n  }\n\n  public synchronized void put(int key, int value) {\n    map.put(key, value);\n    evictIfNeeded();\n  }\n\n  private int read(int key) {\n    Integer value = map.get(key);\n    return value == null ? -1 : value;\n  }\n\n  private void evictIfNeeded() {\n    if (map.size() <= capacity) return;\n    Integer eldest = map.keySet().iterator().next();\n    map.remove(eldest);\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass ConcurrentLRUCache {\n  private final int capacity;\n  private final LinkedHashMap<Integer, Integer> map;\n  private final Lock lock = new ReentrantLock();\n\n  public ConcurrentLRUCache(int capacity) {\n    this.capacity = capacity;\n    this.map = new LinkedHashMap<>(16, 0.75f, true);\n  }\n\n  public int get(int key) {\n    lock.lock();\n    try {\n      Integer value = map.get(key);\n    return value == null ? -1 : value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public void put(int key, int value) {\n    lock.lock();\n    try {\n      map.put(key, value);\n      if (map.size() > capacity) {\n        Iterator<Integer> iterator = map.keySet().iterator();\n        map.remove(iterator.next());\n      }\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass ConcurrentLRUCache {\n  private final int capacity;\n  private final LinkedHashMap<Integer, Integer> map;\n  private final Lock lock = new ReentrantLock();\n\n  public ConcurrentLRUCache(int capacity) {\n    this.capacity = capacity;\n    this.map = new LinkedHashMap<>(16, 0.75f, true);\n  }\n\n  public int get(int key) {\n    lock.lock();\n    try {\n      Integer value = map.get(key);\n    return value == null ? -1 : value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public void put(int key, int value) {\n    lock.lock();\n    try {\n      map.put(key, value);\n      if (map.size() > capacity) {\n        Iterator<Integer> iterator = map.keySet().iterator();\n        map.remove(iterator.next());\n      }\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Alternating Odd Even Printer",
      "difficulty": "Easy",
      "subpattern": "Odd/even alternation",
      "question": "Two threads call odd() and even(). Print numbers 1 through n in increasing order.",
      "trigger": "Two roles own alternating integer parity, but a single increasing counter controls progress.",
      "intuition": "Odd starts open; after printing, it releases even, and even releases odd.",
      "edgeCases": "n = 1, even never prints, even thread starts first, and missed release after the last number.",
      "constraints": "odd prints odd values; even prints even values.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "n = 4",
          "output": "1234",
          "explanation": "Odd prints 1 and 3; even prints 2 and 4."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "Only the odd thread prints."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Monitor waits on the current parity.",
      "optimizedComplexity": "Time O(n); Space O(1). Two semaphores alternate turns.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth in role helpers.",
      "bruteForceCode": "import java.util.function.IntConsumer;\n\nclass OddEvenPrinter {\n  private final int n;\n  private int current = 1;\n\n  public OddEvenPrinter(int n) {\n    this.n = n;\n  }\n\n  public synchronized void odd(IntConsumer printNumber) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && current % 2 == 0) wait();\n      if (current > n) break;\n      printNumber.accept(current++);\n      notifyAll();\n    }\n  }\n\n  public synchronized void even(IntConsumer printNumber) throws InterruptedException {\n    while (current <= n) {\n      while (current <= n && current % 2 == 1) wait();\n      if (current > n) break;\n      printNumber.accept(current++);\n      notifyAll();\n    }\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass OddEvenPrinter {\n  private final int n;\n  private final Semaphore odd = new Semaphore(1);\n  private final Semaphore even = new Semaphore(0);\n\n  public OddEvenPrinter(int n) {\n    this.n = n;\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value += 2) {\n      odd.acquire();\n      printNumber.accept(value);\n      even.release();\n    }\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 2; value <= n; value += 2) {\n      even.acquire();\n      printNumber.accept(value);\n      odd.release();\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass OddEvenPrinter {\n  private final int n;\n  private final Semaphore odd = new Semaphore(1);\n  private final Semaphore even = new Semaphore(0);\n\n  public OddEvenPrinter(int n) {\n    this.n = n;\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    printOdd(1, printNumber);\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    printEven(2, printNumber);\n  }\n\n  private void printOdd(int value, IntConsumer printNumber) throws InterruptedException {\n    if (value > n) return;\n    odd.acquire();\n    printNumber.accept(value);\n    even.release();\n    printOdd(value + 2, printNumber);\n  }\n\n  private void printEven(int value, IntConsumer printNumber) throws InterruptedException {\n    if (value > n) return;\n    even.acquire();\n    printNumber.accept(value);\n    odd.release();\n    printEven(value + 2, printNumber);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass OddEvenPrinter {\n  private final int n;\n  private final Semaphore odd = new Semaphore(1);\n  private final Semaphore even = new Semaphore(0);\n\n  public OddEvenPrinter(int n) {\n    this.n = n;\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value += 2) {\n      odd.acquire();\n      printNumber.accept(value);\n      even.release();\n    }\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 2; value <= n; value += 2) {\n      even.acquire();\n      printNumber.accept(value);\n      odd.release();\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass OddEvenPrinter {\n  private final int n;\n  private final Semaphore odd = new Semaphore(1);\n  private final Semaphore even = new Semaphore(0);\n\n  public OddEvenPrinter(int n) {\n    this.n = n;\n  }\n\n  public void odd(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 1; value <= n; value += 2) {\n      odd.acquire();\n      printNumber.accept(value);\n      even.release();\n    }\n  }\n\n  public void even(IntConsumer printNumber) throws InterruptedException {\n    for (int value = 2; value <= n; value += 2) {\n      even.acquire();\n      printNumber.accept(value);\n      odd.release();\n    }\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Round Robin Printer",
      "difficulty": "Medium",
      "subpattern": "Round-robin N-way alternation",
      "question": "k worker threads call print(id). Print worker ids in order 0,1,2,...,k-1 for rounds cycles.",
      "trigger": "More than two threads share a cyclic turn order.",
      "intuition": "Track the current turn modulo k; each worker waits until its id owns the turn.",
      "edgeCases": "k = 1, one round, worker starts early, spurious wakeups, and last worker wrapping to zero.",
      "constraints": "Worker ids are 0 through k - 1.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "k = 3, rounds = 2",
          "output": "012012",
          "explanation": "The turn cycles through all workers twice."
        },
        {
          "input": "k = 1, rounds = 3",
          "output": "000",
          "explanation": "The only worker always owns the turn."
        }
      ],
      "bruteForceComplexity": "Time O(k * rounds); Space O(1). Monitor protects the current turn.",
      "optimizedComplexity": "Time O(k * rounds); Space O(k). One semaphore per worker passes the baton.",
      "recursiveComplexity": "Time O(k * rounds); Space O(rounds) recursion depth per worker.",
      "bruteForceCode": "import java.util.function.IntConsumer;\n\nclass RoundRobinPrinter {\n  private final int workers;\n  private final int rounds;\n  private int turn;\n  private int printed;\n\n  public RoundRobinPrinter(int workers, int rounds) {\n    this.workers = workers;\n    this.rounds = rounds;\n  }\n\n  public synchronized void print(int id, IntConsumer printer) throws InterruptedException {\n    int total = workers * rounds;\n    while (printed < total) {\n      while (printed < total && turn != id) wait();\n      if (printed >= total) break;\n      printer.accept(id);\n      printed++;\n      turn = (turn + 1) % workers;\n      notifyAll();\n    }\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass RoundRobinPrinter {\n  private final int workers;\n  private final int rounds;\n  private final Semaphore[] turns;\n\n  public RoundRobinPrinter(int workers, int rounds) {\n    this.workers = workers;\n    this.rounds = rounds;\n    this.turns = new Semaphore[workers];\n    for (int i = 0; i < workers; i++) turns[i] = new Semaphore(i == 0 ? 1 : 0);\n  }\n\n  public void print(int id, IntConsumer printer) throws InterruptedException {\n    for (int round = 0; round < rounds; round++) {\n      turns[id].acquire();\n      printer.accept(id);\n      turns[(id + 1) % workers].release();\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass RoundRobinPrinter {\n  private final int workers;\n  private final int rounds;\n  private final Semaphore[] turns;\n\n  public RoundRobinPrinter(int workers, int rounds) {\n    this.workers = workers;\n    this.rounds = rounds;\n    this.turns = new Semaphore[workers];\n    for (int i = 0; i < workers; i++) turns[i] = new Semaphore(i == 0 ? 1 : 0);\n  }\n\n  public void print(int id, IntConsumer printer) throws InterruptedException {\n    printRound(id, 0, printer);\n  }\n\n  private void printRound(int id, int round, IntConsumer printer) throws InterruptedException {\n    if (round == rounds) return;\n    turns[id].acquire();\n    printer.accept(id);\n    turns[(id + 1) % workers].release();\n    printRound(id, round + 1, printer);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass RoundRobinPrinter {\n  private final int workers;\n  private final int rounds;\n  private final Semaphore[] turns;\n\n  public RoundRobinPrinter(int workers, int rounds) {\n    this.workers = workers;\n    this.rounds = rounds;\n    this.turns = new Semaphore[workers];\n    for (int i = 0; i < workers; i++) turns[i] = new Semaphore(i == 0 ? 1 : 0);\n  }\n\n  public void print(int id, IntConsumer printer) throws InterruptedException {\n    for (int round = 0; round < rounds; round++) {\n      turns[id].acquire();\n      printer.accept(id);\n      turns[(id + 1) % workers].release();\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\nimport java.util.function.IntConsumer;\n\nclass RoundRobinPrinter {\n  private final int workers;\n  private final int rounds;\n  private final Semaphore[] turns;\n\n  public RoundRobinPrinter(int workers, int rounds) {\n    this.workers = workers;\n    this.rounds = rounds;\n    this.turns = new Semaphore[workers];\n    for (int i = 0; i < workers; i++) turns[i] = new Semaphore(i == 0 ? 1 : 0);\n  }\n\n  public void print(int id, IntConsumer printer) throws InterruptedException {\n    for (int round = 0; round < rounds; round++) {\n      turns[id].acquire();\n      printer.accept(id);\n      turns[(id + 1) % workers].release();\n    }\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Semaphore Permit Limiter",
      "difficulty": "Easy",
      "subpattern": "Semaphore permit limiter",
      "question": "Implement enter(), leave(), and active() so at most limit threads are inside the critical region at once.",
      "trigger": "The shared resource has a fixed number of concurrent permits.",
      "intuition": "Acquire before entering and release in leave; track active count under a lock for visibility.",
      "edgeCases": "limit = 1, leave after enter, many blocked entrants, and release without leaking permits.",
      "constraints": "Every successful enter is followed by one leave.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "limit=2, three enter calls before leave",
          "output": "third waits",
          "explanation": "Only two permits are available."
        },
        {
          "input": "enter, active",
          "output": "1",
          "explanation": "The active count reflects entered threads."
        }
      ],
      "bruteForceComplexity": "Time O(1) excluding waiting; Space O(1). Monitor waits while active reaches limit.",
      "optimizedComplexity": "Time O(1) excluding waiting; Space O(1). Semaphore directly models permits.",
      "recursiveComplexity": "Time O(1) excluding waiting; Space O(wait retries). Recursive wait retries enter.",
      "bruteForceCode": "class PermitLimiter {\n  private final int limit;\n  private int active;\n\n  public PermitLimiter(int limit) {\n    this.limit = limit;\n  }\n\n  public synchronized void enter() throws InterruptedException {\n    while (active == limit) wait();\n    active++;\n  }\n\n  public synchronized void leave() {\n    active--;\n    notifyAll();\n  }\n\n  public synchronized int active() {\n    return active;\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\nimport java.util.concurrent.atomic.*;\n\nclass PermitLimiter {\n  private final Semaphore permits;\n  private final AtomicInteger active = new AtomicInteger();\n\n  public PermitLimiter(int limit) {\n    permits = new Semaphore(limit);\n  }\n\n  public void enter() throws InterruptedException {\n    permits.acquire();\n    active.incrementAndGet();\n  }\n\n  public void leave() {\n    active.decrementAndGet();\n    permits.release();\n  }\n\n  public int active() {\n    return active.get();\n  }\n}",
      "recursiveCode": "class PermitLimiter {\n  private final int limit;\n  private int active;\n\n  public PermitLimiter(int limit) {\n    this.limit = limit;\n  }\n\n  public synchronized void enter() throws InterruptedException {\n    if (active == limit) {\n      wait();\n      enter();\n      return;\n    }\n    active++;\n  }\n\n  public synchronized void leave() {\n    active--;\n    notifyAll();\n  }\n\n  public synchronized int active() {\n    return active;\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\nimport java.util.concurrent.atomic.*;\n\nclass PermitLimiter {\n  private final Semaphore permits;\n  private final AtomicInteger active = new AtomicInteger();\n\n  public PermitLimiter(int limit) {\n    permits = new Semaphore(limit);\n  }\n\n  public void enter() throws InterruptedException {\n    permits.acquire();\n    active.incrementAndGet();\n  }\n\n  public void leave() {\n    active.decrementAndGet();\n    permits.release();\n  }\n\n  public int active() {\n    return active.get();\n  }\n}",
      "code": "import java.util.concurrent.*;\nimport java.util.concurrent.atomic.*;\n\nclass PermitLimiter {\n  private final Semaphore permits;\n  private final AtomicInteger active = new AtomicInteger();\n\n  public PermitLimiter(int limit) {\n    permits = new Semaphore(limit);\n  }\n\n  public void enter() throws InterruptedException {\n    permits.acquire();\n    active.incrementAndGet();\n  }\n\n  public void leave() {\n    active.decrementAndGet();\n    permits.release();\n  }\n\n  public int active() {\n    return active.get();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Delayed Task Scheduler",
      "difficulty": "Medium",
      "subpattern": "Delayed task scheduling",
      "question": "Store tasks with runAt timestamps and return all task ids that are due at a given time in timestamp order.",
      "trigger": "Tasks become executable only after a time boundary, and concurrent schedulers must update one priority order safely.",
      "intuition": "Use a min-heap ordered by runAt; popping due tasks produces the correct execution order.",
      "edgeCases": "No due tasks, same timestamp, earlier task inserted later, duplicate ids, and concurrent schedule calls.",
      "constraints": "runDue(now) returns and removes all tasks with runAt <= now.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "schedule(2,200), schedule(1,100), runDue(150)",
          "output": "[1]",
          "explanation": "Only task 1 is due by 150."
        },
        {
          "input": "then runDue(250)",
          "output": "[2]",
          "explanation": "Task 2 remains queued until its timestamp arrives."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) per runDue; Space O(n). synchronized list is sorted when draining.",
      "optimizedComplexity": "Time O((m + d) log n); Space O(n). PriorityQueue stores next due task at the top.",
      "recursiveComplexity": "Time O(d log n); Space O(n + d). Recursive drain pops due tasks.",
      "bruteForceCode": "import java.util.*;\n\nclass DelayedTaskScheduler {\n  private final List<int[]> tasks = new ArrayList<>();\n\n  public synchronized void schedule(int taskId, int runAt) {\n    tasks.add(new int[] {runAt, taskId});\n  }\n\n  public synchronized List<Integer> runDue(int now) {\n    tasks.sort((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    List<Integer> due = new ArrayList<>();\n    Iterator<int[]> iterator = tasks.iterator();\n    while (iterator.hasNext()) {\n      int[] task = iterator.next();\n      if (task[0] > now) break;\n      due.add(task[1]);\n      iterator.remove();\n    }\n    return due;\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass DelayedTaskScheduler {\n  private final PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n  private final Lock lock = new ReentrantLock();\n\n  public void schedule(int taskId, int runAt) {\n    lock.lock();\n    try {\n      heap.offer(new int[] {runAt, taskId});\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public List<Integer> runDue(int now) {\n    lock.lock();\n    try {\n      List<Integer> due = new ArrayList<>();\n      while (!heap.isEmpty() && heap.peek()[0] <= now) due.add(heap.poll()[1]);\n      return due;\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass DelayedTaskScheduler {\n  private final PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n  public synchronized void schedule(int taskId, int runAt) {\n    heap.offer(new int[] {runAt, taskId});\n  }\n\n  public synchronized List<Integer> runDue(int now) {\n    List<Integer> due = new ArrayList<>();\n    drain(now, due);\n    return due;\n  }\n\n  private void drain(int now, List<Integer> due) {\n    if (heap.isEmpty() || heap.peek()[0] > now) return;\n    due.add(heap.poll()[1]);\n    drain(now, due);\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass DelayedTaskScheduler {\n  private final PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n  private final Lock lock = new ReentrantLock();\n\n  public void schedule(int taskId, int runAt) {\n    lock.lock();\n    try {\n      heap.offer(new int[] {runAt, taskId});\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public List<Integer> runDue(int now) {\n    lock.lock();\n    try {\n      List<Integer> due = new ArrayList<>();\n      while (!heap.isEmpty() && heap.peek()[0] <= now) due.add(heap.poll()[1]);\n      return due;\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass DelayedTaskScheduler {\n  private final PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n  private final Lock lock = new ReentrantLock();\n\n  public void schedule(int taskId, int runAt) {\n    lock.lock();\n    try {\n      heap.offer(new int[] {runAt, taskId});\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public List<Integer> runDue(int now) {\n    lock.lock();\n    try {\n      List<Integer> due = new ArrayList<>();\n      while (!heap.isEmpty() && heap.peek()[0] <= now) due.add(heap.poll()[1]);\n      return due;\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Future Aggregator",
      "difficulty": "Medium",
      "subpattern": "Future fan-in aggregation",
      "question": "Run a list of Callable<Integer> tasks and return the sum of all completed results.",
      "trigger": "Independent tasks can run concurrently, but the caller needs one combined result after all finish.",
      "intuition": "Submit all tasks, then join every Future and accumulate the results.",
      "edgeCases": "Empty task list, exception from one task, interrupted wait, and preserving all submitted futures.",
      "constraints": "If a task throws, wrap the failure in RuntimeException.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "tasks return 1,2,3",
          "output": "6",
          "explanation": "All future results are added."
        },
        {
          "input": "tasks = []",
          "output": "0",
          "explanation": "No work produces zero sum."
        }
      ],
      "bruteForceComplexity": "Time O(n) plus task time; Space O(1). Sequentially calls each task.",
      "optimizedComplexity": "Time O(n) coordination plus parallel task time; Space O(n). ExecutorService stores futures.",
      "recursiveComplexity": "Time O(n) coordination plus task time; Space O(n) recursion depth.",
      "bruteForceCode": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass Solution {\n  public int sumFutures(List<Callable<Integer>> tasks) {\n    int sum = 0;\n    try {\n      for (Callable<Integer> task : tasks) sum += task.call();\n      return sum;\n    } catch (Exception ex) {\n      throw new RuntimeException(ex);\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass Solution {\n  public int sumFutures(List<Callable<Integer>> tasks) {\n    if (tasks.isEmpty()) return 0;\n    ExecutorService executor = Executors.newFixedThreadPool(Math.min(tasks.size(), Runtime.getRuntime().availableProcessors()));\n    try {\n      List<Future<Integer>> futures = new ArrayList<>();\n      for (Callable<Integer> task : tasks) futures.add(executor.submit(task));\n      int sum = 0;\n      for (Future<Integer> future : futures) sum += future.get();\n      return sum;\n    } catch (InterruptedException ex) {\n      Thread.currentThread().interrupt();\n      throw new RuntimeException(ex);\n    } catch (ExecutionException ex) {\n      throw new RuntimeException(ex.getCause());\n    } finally {\n      executor.shutdownNow();\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass Solution {\n  public int sumFutures(List<Callable<Integer>> tasks) {\n    return sum(tasks, 0);\n  }\n\n  private int sum(List<Callable<Integer>> tasks, int index) {\n    if (index == tasks.size()) return 0;\n    try {\n      return tasks.get(index).call() + sum(tasks, index + 1);\n    } catch (Exception ex) {\n      throw new RuntimeException(ex);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass Solution {\n  public int sumFutures(List<Callable<Integer>> tasks) {\n    if (tasks.isEmpty()) return 0;\n    ExecutorService executor = Executors.newFixedThreadPool(Math.min(tasks.size(), Runtime.getRuntime().availableProcessors()));\n    try {\n      List<Future<Integer>> futures = new ArrayList<>();\n      for (Callable<Integer> task : tasks) futures.add(executor.submit(task));\n      int sum = 0;\n      for (Future<Integer> future : futures) sum += future.get();\n      return sum;\n    } catch (InterruptedException ex) {\n      Thread.currentThread().interrupt();\n      throw new RuntimeException(ex);\n    } catch (ExecutionException ex) {\n      throw new RuntimeException(ex.getCause());\n    } finally {\n      executor.shutdownNow();\n    }\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass Solution {\n  public int sumFutures(List<Callable<Integer>> tasks) {\n    if (tasks.isEmpty()) return 0;\n    ExecutorService executor = Executors.newFixedThreadPool(Math.min(tasks.size(), Runtime.getRuntime().availableProcessors()));\n    try {\n      List<Future<Integer>> futures = new ArrayList<>();\n      for (Callable<Integer> task : tasks) futures.add(executor.submit(task));\n      int sum = 0;\n      for (Future<Integer> future : futures) sum += future.get();\n      return sum;\n    } catch (InterruptedException ex) {\n      Thread.currentThread().interrupt();\n      throw new RuntimeException(ex);\n    } catch (ExecutionException ex) {\n      throw new RuntimeException(ex.getCause());\n    } finally {\n      executor.shutdownNow();\n    }\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Deadlock-Free Bank Transfer",
      "difficulty": "Hard",
      "subpattern": "Deadlock-free bank transfers",
      "question": "Implement transfer(from,to,amount) over multiple accounts so concurrent opposite-direction transfers cannot deadlock.",
      "trigger": "Each transfer needs two account locks, and inconsistent lock order creates circular wait.",
      "intuition": "Always lock accounts by increasing account id, then perform the balance move.",
      "edgeCases": "from equals to, insufficient funds, negative amount rejection, opposite transfers at the same time, and unchanged balances on failure.",
      "constraints": "Return false if the source account lacks funds.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "balances=[10,0], transfer(0,1,7)",
          "output": "true; balances=[3,7]",
          "explanation": "Funds move atomically between accounts."
        },
        {
          "input": "transfer(0,1,20)",
          "output": "false",
          "explanation": "Insufficient funds leaves balances unchanged."
        }
      ],
      "bruteForceComplexity": "Time O(1) per transfer; Space O(n). synchronized serializes the whole bank.",
      "optimizedComplexity": "Time O(1) per transfer; Space O(n). Per-account locks are acquired in id order.",
      "recursiveComplexity": "Time O(1) per transfer; Space O(n). Helper locks accounts in sorted order.",
      "bruteForceCode": "class Bank {\n  private final int[] balances;\n\n  public Bank(int[] balances) {\n    this.balances = balances.clone();\n  }\n\n  public synchronized boolean transfer(int from, int to, int amount) {\n    if (amount < 0) return false;\n    if (from == to) return true;\n    if (balances[from] < amount) return false;\n    balances[from] -= amount;\n    balances[to] += amount;\n    return true;\n  }\n\n  public synchronized int balance(int account) {\n    return balances[account];\n  }\n}",
      "iterativeCode": "import java.util.concurrent.locks.*;\n\nclass Bank {\n  private final int[] balances;\n  private final Lock[] locks;\n\n  public Bank(int[] balances) {\n    this.balances = balances.clone();\n    this.locks = new Lock[balances.length];\n    for (int i = 0; i < locks.length; i++) locks[i] = new ReentrantLock();\n  }\n\n  public boolean transfer(int from, int to, int amount) {\n    if (amount < 0) return false;\n    if (from == to) return true;\n    int first = Math.min(from, to), second = Math.max(from, to);\n    locks[first].lock();\n    locks[second].lock();\n    try {\n      if (balances[from] < amount) return false;\n      balances[from] -= amount;\n      balances[to] += amount;\n      return true;\n    } finally {\n      locks[second].unlock();\n      locks[first].unlock();\n    }\n  }\n\n  public int balance(int account) {\n    locks[account].lock();\n    try {\n      return balances[account];\n    } finally {\n      locks[account].unlock();\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.locks.*;\n\nclass Bank {\n  private final int[] balances;\n  private final Lock[] locks;\n\n  public Bank(int[] balances) {\n    this.balances = balances.clone();\n    this.locks = new Lock[balances.length];\n    for (int i = 0; i < locks.length; i++) locks[i] = new ReentrantLock();\n  }\n\n  public boolean transfer(int from, int to, int amount) {\n    if (amount < 0) return false;\n    if (from == to) return true;\n    int first = Math.min(from, to), second = Math.max(from, to);\n    return withLocks(first, second, () -> move(from, to, amount));\n  }\n\n  public int balance(int account) {\n    locks[account].lock();\n    try {\n      return balances[account];\n    } finally {\n      locks[account].unlock();\n    }\n  }\n\n  private boolean move(int from, int to, int amount) {\n    if (balances[from] < amount) return false;\n    balances[from] -= amount;\n    balances[to] += amount;\n    return true;\n  }\n\n  private boolean withLocks(int first, int second, java.util.function.BooleanSupplier action) {\n    locks[first].lock();\n    locks[second].lock();\n    try {\n      return action.getAsBoolean();\n    } finally {\n      locks[second].unlock();\n      locks[first].unlock();\n    }\n  }\n}",
      "optimizedCode": "import java.util.concurrent.locks.*;\n\nclass Bank {\n  private final int[] balances;\n  private final Lock[] locks;\n\n  public Bank(int[] balances) {\n    this.balances = balances.clone();\n    this.locks = new Lock[balances.length];\n    for (int i = 0; i < locks.length; i++) locks[i] = new ReentrantLock();\n  }\n\n  public boolean transfer(int from, int to, int amount) {\n    if (amount < 0) return false;\n    if (from == to) return true;\n    int first = Math.min(from, to), second = Math.max(from, to);\n    locks[first].lock();\n    locks[second].lock();\n    try {\n      if (balances[from] < amount) return false;\n      balances[from] -= amount;\n      balances[to] += amount;\n      return true;\n    } finally {\n      locks[second].unlock();\n      locks[first].unlock();\n    }\n  }\n\n  public int balance(int account) {\n    locks[account].lock();\n    try {\n      return balances[account];\n    } finally {\n      locks[account].unlock();\n    }\n  }\n}",
      "code": "import java.util.concurrent.locks.*;\n\nclass Bank {\n  private final int[] balances;\n  private final Lock[] locks;\n\n  public Bank(int[] balances) {\n    this.balances = balances.clone();\n    this.locks = new Lock[balances.length];\n    for (int i = 0; i < locks.length; i++) locks[i] = new ReentrantLock();\n  }\n\n  public boolean transfer(int from, int to, int amount) {\n    if (amount < 0) return false;\n    if (from == to) return true;\n    int first = Math.min(from, to), second = Math.max(from, to);\n    locks[first].lock();\n    locks[second].lock();\n    try {\n      if (balances[from] < amount) return false;\n      balances[from] -= amount;\n      balances[to] += amount;\n      return true;\n    } finally {\n      locks[second].unlock();\n      locks[first].unlock();\n    }\n  }\n\n  public int balance(int account) {\n    locks[account].lock();\n    try {\n      return balances[account];\n    } finally {\n      locks[account].unlock();\n    }\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Producer Consumer Log Pipeline",
      "difficulty": "Medium",
      "subpattern": "Pipeline backpressure",
      "question": "Implement submit(log), take(), and size() for a bounded log pipeline where producers block when the pipeline is full.",
      "trigger": "A pipeline stage needs backpressure so producers cannot outrun consumers.",
      "intuition": "Use a bounded queue; submit waits for capacity and take waits for data.",
      "edgeCases": "Empty take, full submit, repeated log messages, capacity one, and multiple producers.",
      "constraints": "Logs are strings and FIFO order is required.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "submit(\"a\"), submit(\"b\"), take()",
          "output": "\"a\"",
          "explanation": "Logs are consumed FIFO."
        },
        {
          "input": "capacity=1, submit(\"a\"), submit(\"b\")",
          "output": "second submit waits",
          "explanation": "Backpressure protects capacity."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(capacity). synchronized queue implements blocking.",
      "optimizedComplexity": "Time O(1); Space O(capacity). ArrayBlockingQueue handles blocking and FIFO.",
      "recursiveComplexity": "Time O(1) once unblocked; Space O(capacity + retry depth).",
      "bruteForceCode": "import java.util.*;\n\nclass LogPipeline {\n  private final Queue<String> queue = new ArrayDeque<>();\n  private final int capacity;\n\n  public LogPipeline(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void submit(String log) throws InterruptedException {\n    while (queue.size() == capacity) wait();\n    queue.offer(log);\n    notifyAll();\n  }\n\n  public synchronized String take() throws InterruptedException {\n    while (queue.isEmpty()) wait();\n    String value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass LogPipeline {\n  private final BlockingQueue<String> queue;\n\n  public LogPipeline(int capacity) {\n    queue = new ArrayBlockingQueue<>(capacity);\n  }\n\n  public void submit(String log) throws InterruptedException {\n    queue.put(log);\n  }\n\n  public String take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass LogPipeline {\n  private final Queue<String> queue = new ArrayDeque<>();\n  private final int capacity;\n\n  public LogPipeline(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void submit(String log) throws InterruptedException {\n    if (queue.size() == capacity) {\n      wait();\n      submit(log);\n      return;\n    }\n    queue.offer(log);\n    notifyAll();\n  }\n\n  public synchronized String take() throws InterruptedException {\n    if (queue.isEmpty()) {\n      wait();\n      return take();\n    }\n    String value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass LogPipeline {\n  private final BlockingQueue<String> queue;\n\n  public LogPipeline(int capacity) {\n    queue = new ArrayBlockingQueue<>(capacity);\n  }\n\n  public void submit(String log) throws InterruptedException {\n    queue.put(log);\n  }\n\n  public String take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass LogPipeline {\n  private final BlockingQueue<String> queue;\n\n  public LogPipeline(int capacity) {\n    queue = new ArrayBlockingQueue<>(capacity);\n  }\n\n  public void submit(String log) throws InterruptedException {\n    queue.put(log);\n  }\n\n  public String take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Lock Striping Map",
      "difficulty": "Hard",
      "subpattern": "Lock striping map",
      "question": "Implement put, get, remove, and size for an integer map using multiple locks instead of one global lock.",
      "trigger": "Independent keys can be protected by different locks to reduce contention.",
      "intuition": "Hash each key to a stripe; only operations on the same stripe block each other.",
      "edgeCases": "Negative keys, non-positive stripe count, overwriting existing key, removing missing key, and size across stripes.",
      "constraints": "Missing get returns -1.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "put(1,10), get(1)",
          "output": "10",
          "explanation": "The key is stored in its stripe."
        },
        {
          "input": "put(1,10), remove(1), get(1)",
          "output": "-1",
          "explanation": "Remove deletes the key safely."
        }
      ],
      "bruteForceComplexity": "Time O(1) expected; Space O(n). synchronized HashMap serializes all operations.",
      "optimizedComplexity": "Time O(1) expected; Space O(n + stripes). Only one stripe lock is needed for key operations.",
      "recursiveComplexity": "Time O(1) expected; Space O(n + stripes). Helper chooses stripe recursively-free and locks it.",
      "bruteForceCode": "import java.util.*;\n\nclass StripedMap {\n  private final Map<Integer, Integer> map = new HashMap<>();\n\n  public StripedMap(int stripes) {\n    if (stripes <= 0) throw new IllegalArgumentException(\"stripes must be positive\");\n  }\n\n  public synchronized void put(int key, int value) {\n    map.put(key, value);\n  }\n\n  public synchronized int get(int key) {\n    return map.getOrDefault(key, -1);\n  }\n\n  public synchronized void remove(int key) {\n    map.remove(key);\n  }\n\n  public synchronized int size() {\n    return map.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass StripedMap {\n  private final Map<Integer, Integer>[] buckets;\n  private final Lock[] locks;\n\n  @SuppressWarnings(\"unchecked\")\n  public StripedMap(int stripes) {\n    if (stripes <= 0) throw new IllegalArgumentException(\"stripes must be positive\");\n    buckets = new HashMap[stripes];\n    locks = new Lock[stripes];\n    for (int i = 0; i < stripes; i++) {\n      buckets[i] = new HashMap<>();\n      locks[i] = new ReentrantLock();\n    }\n  }\n\n  public void put(int key, int value) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      buckets[stripe].put(key, value);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public int get(int key) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      return buckets[stripe].getOrDefault(key, -1);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public void remove(int key) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      buckets[stripe].remove(key);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public int size() {\n    int total = 0;\n    for (int i = 0; i < locks.length; i++) locks[i].lock();\n    try {\n      for (Map<Integer, Integer> bucket : buckets) total += bucket.size();\n      return total;\n    } finally {\n      for (int i = locks.length - 1; i >= 0; i--) locks[i].unlock();\n    }\n  }\n\n  private int stripe(int key) {\n    return Math.floorMod(Integer.hashCode(key), buckets.length);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass StripedMap {\n  private final Map<Integer, Integer>[] buckets;\n\n  @SuppressWarnings(\"unchecked\")\n  public StripedMap(int stripes) {\n    if (stripes <= 0) throw new IllegalArgumentException(\"stripes must be positive\");\n    buckets = new HashMap[stripes];\n    for (int i = 0; i < stripes; i++) buckets[i] = new HashMap<>();\n  }\n\n  public void put(int key, int value) {\n    synchronized (bucket(key)) {\n      bucket(key).put(key, value);\n    }\n  }\n\n  public int get(int key) {\n    synchronized (bucket(key)) {\n      return bucket(key).getOrDefault(key, -1);\n    }\n  }\n\n  public void remove(int key) {\n    synchronized (bucket(key)) {\n      bucket(key).remove(key);\n    }\n  }\n\n  public int size() {\n    return sizeFrom(0);\n  }\n\n  private int sizeFrom(int index) {\n    if (index == buckets.length) return 0;\n    synchronized (buckets[index]) {\n      return buckets[index].size() + sizeFrom(index + 1);\n    }\n  }\n\n  private Map<Integer, Integer> bucket(int key) {\n    return buckets[Math.floorMod(Integer.hashCode(key), buckets.length)];\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass StripedMap {\n  private final Map<Integer, Integer>[] buckets;\n  private final Lock[] locks;\n\n  @SuppressWarnings(\"unchecked\")\n  public StripedMap(int stripes) {\n    if (stripes <= 0) throw new IllegalArgumentException(\"stripes must be positive\");\n    buckets = new HashMap[stripes];\n    locks = new Lock[stripes];\n    for (int i = 0; i < stripes; i++) {\n      buckets[i] = new HashMap<>();\n      locks[i] = new ReentrantLock();\n    }\n  }\n\n  public void put(int key, int value) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      buckets[stripe].put(key, value);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public int get(int key) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      return buckets[stripe].getOrDefault(key, -1);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public void remove(int key) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      buckets[stripe].remove(key);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public int size() {\n    int total = 0;\n    for (int i = 0; i < locks.length; i++) locks[i].lock();\n    try {\n      for (Map<Integer, Integer> bucket : buckets) total += bucket.size();\n      return total;\n    } finally {\n      for (int i = locks.length - 1; i >= 0; i--) locks[i].unlock();\n    }\n  }\n\n  private int stripe(int key) {\n    return Math.floorMod(Integer.hashCode(key), buckets.length);\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass StripedMap {\n  private final Map<Integer, Integer>[] buckets;\n  private final Lock[] locks;\n\n  @SuppressWarnings(\"unchecked\")\n  public StripedMap(int stripes) {\n    if (stripes <= 0) throw new IllegalArgumentException(\"stripes must be positive\");\n    buckets = new HashMap[stripes];\n    locks = new Lock[stripes];\n    for (int i = 0; i < stripes; i++) {\n      buckets[i] = new HashMap<>();\n      locks[i] = new ReentrantLock();\n    }\n  }\n\n  public void put(int key, int value) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      buckets[stripe].put(key, value);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public int get(int key) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      return buckets[stripe].getOrDefault(key, -1);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public void remove(int key) {\n    int stripe = stripe(key);\n    locks[stripe].lock();\n    try {\n      buckets[stripe].remove(key);\n    } finally {\n      locks[stripe].unlock();\n    }\n  }\n\n  public int size() {\n    int total = 0;\n    for (int i = 0; i < locks.length; i++) locks[i].lock();\n    try {\n      for (Map<Integer, Integer> bucket : buckets) total += bucket.size();\n      return total;\n    } finally {\n      for (int i = locks.length - 1; i >= 0; i--) locks[i].unlock();\n    }\n  }\n\n  private int stripe(int key) {\n    return Math.floorMod(Integer.hashCode(key), buckets.length);\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Concurrent Hash Set",
      "difficulty": "Medium",
      "subpattern": "Concurrent hash set",
      "question": "Implement add, remove, contains, and size for a thread-safe integer set.",
      "trigger": "Set membership changes are shared mutable state and must be atomic with visibility.",
      "intuition": "Either guard a HashSet with one lock or use ConcurrentHashMap.newKeySet().",
      "edgeCases": "Duplicate add, remove missing value, negative values, size during updates, and many concurrent readers.",
      "constraints": "add returns true only when the value was absent; remove returns true only when present.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "add(5), add(5)",
          "output": "true,false",
          "explanation": "The second add sees the existing value."
        },
        {
          "input": "add(5), remove(5), contains(5)",
          "output": "false",
          "explanation": "Removal updates membership atomically."
        }
      ],
      "bruteForceComplexity": "Time O(1) expected; Space O(n). synchronized HashSet serializes access.",
      "optimizedComplexity": "Time O(1) expected; Space O(n). ConcurrentHashMap key set supports concurrent operations.",
      "recursiveComplexity": "Time O(1) expected; Space O(n). synchronized helpers wrap each set operation.",
      "bruteForceCode": "import java.util.*;\n\nclass ConcurrentHashSet {\n  private final Set<Integer> set = new HashSet<>();\n\n  public synchronized boolean add(int value) {\n    return set.add(value);\n  }\n\n  public synchronized boolean remove(int value) {\n    return set.remove(value);\n  }\n\n  public synchronized boolean contains(int value) {\n    return set.contains(value);\n  }\n\n  public synchronized int size() {\n    return set.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass ConcurrentHashSet {\n  private final Set<Integer> set = ConcurrentHashMap.newKeySet();\n\n  public boolean add(int value) {\n    return set.add(value);\n  }\n\n  public boolean remove(int value) {\n    return set.remove(value);\n  }\n\n  public boolean contains(int value) {\n    return set.contains(value);\n  }\n\n  public int size() {\n    return set.size();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass ConcurrentHashSet {\n  private final Set<Integer> set = new HashSet<>();\n\n  public synchronized boolean add(int value) {\n    return addValue(value);\n  }\n\n  public synchronized boolean remove(int value) {\n    return removeValue(value);\n  }\n\n  public synchronized boolean contains(int value) {\n    return set.contains(value);\n  }\n\n  public synchronized int size() {\n    return set.size();\n  }\n\n  private boolean addValue(int value) {\n    return set.add(value);\n  }\n\n  private boolean removeValue(int value) {\n    return set.remove(value);\n  }\n}",
      "optimizedCode": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass ConcurrentHashSet {\n  private final Set<Integer> set = ConcurrentHashMap.newKeySet();\n\n  public boolean add(int value) {\n    return set.add(value);\n  }\n\n  public boolean remove(int value) {\n    return set.remove(value);\n  }\n\n  public boolean contains(int value) {\n    return set.contains(value);\n  }\n\n  public int size() {\n    return set.size();\n  }\n}",
      "code": "import java.util.*;\nimport java.util.concurrent.*;\n\nclass ConcurrentHashSet {\n  private final Set<Integer> set = ConcurrentHashMap.newKeySet();\n\n  public boolean add(int value) {\n    return set.add(value);\n  }\n\n  public boolean remove(int value) {\n    return set.remove(value);\n  }\n\n  public boolean contains(int value) {\n    return set.contains(value);\n  }\n\n  public int size() {\n    return set.size();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Async Retry Scheduler",
      "difficulty": "Hard",
      "subpattern": "Async retry scheduling",
      "question": "Run a Callable<Boolean> until it succeeds or maxAttempts is reached, returning the number of attempts used.",
      "trigger": "A flaky task must be retried with controlled state and clear stop conditions.",
      "intuition": "Attempt, stop on success, otherwise continue until the attempt limit is exhausted.",
      "edgeCases": "Success on first attempt, never succeeds, task throws, maxAttempts = 0, and interruption while waiting for async result.",
      "constraints": "Return 0 when maxAttempts is 0; thrown exceptions count as failed attempts.",
      "source": {
        "label": "Java Concurrency Reference",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
      },
      "examples": [
        {
          "input": "task fails twice then succeeds, maxAttempts=5",
          "output": "3",
          "explanation": "The scheduler stops immediately after success."
        },
        {
          "input": "task always fails, maxAttempts=3",
          "output": "3",
          "explanation": "All attempts are consumed."
        }
      ],
      "bruteForceComplexity": "Time O(maxAttempts * task time); Space O(1). Sequential retry loop is the baseline.",
      "optimizedComplexity": "Time O(maxAttempts * task time); Space O(1). Single-thread executor runs attempts asynchronously but joins each result.",
      "recursiveComplexity": "Time O(maxAttempts * task time); Space O(maxAttempts) recursion depth.",
      "bruteForceCode": "import java.util.concurrent.*;\n\nclass RetryScheduler {\n  public int runWithRetries(Callable<Boolean> task, int maxAttempts) {\n    int attempts = 0;\n    while (attempts < maxAttempts) {\n      attempts++;\n      try {\n        if (task.call()) return attempts;\n      } catch (Exception ignored) {\n        // Failed attempts are retried until the limit is reached.\n      }\n    }\n    return attempts;\n  }\n}",
      "iterativeCode": "import java.util.concurrent.*;\n\nclass RetryScheduler {\n  public int runWithRetries(Callable<Boolean> task, int maxAttempts) {\n    ExecutorService executor = Executors.newSingleThreadExecutor();\n    try {\n      for (int attempt = 1; attempt <= maxAttempts; attempt++) {\n        Future<Boolean> future = executor.submit(task);\n        try {\n          if (future.get()) return attempt;\n        } catch (ExecutionException ignored) {\n          // Failed attempts are retried until the limit is reached.\n        }\n      }\n      return maxAttempts;\n    } catch (InterruptedException ex) {\n      Thread.currentThread().interrupt();\n      throw new RuntimeException(ex);\n    } finally {\n      executor.shutdownNow();\n    }\n  }\n}",
      "recursiveCode": "import java.util.concurrent.*;\n\nclass RetryScheduler {\n  public int runWithRetries(Callable<Boolean> task, int maxAttempts) {\n    return attempt(task, maxAttempts, 0);\n  }\n\n  private int attempt(Callable<Boolean> task, int maxAttempts, int used) {\n    if (used == maxAttempts) return used;\n    try {\n      if (task.call()) return used + 1;\n    } catch (Exception ignored) {\n      // Failed attempts are retried until the limit is reached.\n    }\n    return attempt(task, maxAttempts, used + 1);\n  }\n}",
      "optimizedCode": "import java.util.concurrent.*;\n\nclass RetryScheduler {\n  public int runWithRetries(Callable<Boolean> task, int maxAttempts) {\n    ExecutorService executor = Executors.newSingleThreadExecutor();\n    try {\n      for (int attempt = 1; attempt <= maxAttempts; attempt++) {\n        Future<Boolean> future = executor.submit(task);\n        try {\n          if (future.get()) return attempt;\n        } catch (ExecutionException ignored) {\n          // Failed attempts are retried until the limit is reached.\n        }\n      }\n      return maxAttempts;\n    } catch (InterruptedException ex) {\n      Thread.currentThread().interrupt();\n      throw new RuntimeException(ex);\n    } finally {\n      executor.shutdownNow();\n    }\n  }\n}",
      "code": "import java.util.concurrent.*;\n\nclass RetryScheduler {\n  public int runWithRetries(Callable<Boolean> task, int maxAttempts) {\n    ExecutorService executor = Executors.newSingleThreadExecutor();\n    try {\n      for (int attempt = 1; attempt <= maxAttempts; attempt++) {\n        Future<Boolean> future = executor.submit(task);\n        try {\n          if (future.get()) return attempt;\n        } catch (ExecutionException ignored) {\n          // Failed attempts are retried until the limit is reached.\n        }\n      }\n      return maxAttempts;\n    } catch (InterruptedException ex) {\n      Thread.currentThread().interrupt();\n      throw new RuntimeException(ex);\n    } finally {\n      executor.shutdownNow();\n    }\n  }\n}"
    }
  ],
  "checklist": [
    "Multiple threads must print, mutate, or proceed in a fixed order.",
    "A method must block until shared state reaches a safe condition.",
    "There is a bounded resource: permits, capacity, workers, or queue slots.",
    "Deadlock is possible because multiple locks/resources are acquired.",
    "Correctness depends on visibility and atomicity, not only algorithmic output."
  ],
  "traps": [
    "Using if instead of while around wait conditions.",
    "Calling wait, notify, or notifyAll without owning the monitor.",
    "Acquiring locks in inconsistent order across threads.",
    "Forgetting to release a semaphore or lock in a finally block.",
    "Using volatile for compound read-modify-write operations.",
    "Assuming thread scheduling order is deterministic."
  ],
  "edgeCases": [
    "n = 0 or n = 1 where no alternation may be needed.",
    "Spurious wakeups from wait or Condition.await.",
    "InterruptedException while blocked.",
    "Queue empty/full boundary transitions.",
    "Duplicate task ids or repeated API calls.",
    "Multiple readers with one writer waiting.",
    "All permits consumed and then released.",
    "Exception inside a critical section."
  ],
  "complexities": [
    "Ordering problems: O(number of prints) time and O(1) synchronization state.",
    "Blocking queues/stacks: O(1) amortized operation time and O(capacity) space.",
    "Concurrent maps/sets: O(1) expected operation time with lock or stripe overhead.",
    "Schedulers/rate limiters: O(log n) for priority queues or O(1) amortized for queues.",
    "Fork-join reductions: O(n) work, O(log n) span, and O(log n) recursion depth."
  ],
  "mentalModel": [
    "Protect every shared invariant with exactly one synchronization strategy.",
    "Wait for a condition, not for a thread identity.",
    "Acquire resources in one global order or use permits to prevent circular wait.",
    "Release in finally blocks so exceptions do not leak locks or permits.",
    "Prefer higher-level java.util.concurrent tools when they directly model the problem."
  ],
  "revisionStrategy": [
    "Day 1: Redo Print in Order, FooBar, ZeroEvenOdd, H2O, and Bounded Queue.",
    "Day 3: Rebuild each using synchronized/wait and then Semaphore/Lock.",
    "Day 7: Practice deadlock-free Dining Philosophers, bank transfer, and LRU cache.",
    "Day 14: Mix producer-consumer, barrier, and rate limiter problems without labels.",
    "Day 30: Explain the lock invariant and wakeup condition before writing code."
  ],
  "unseen": [
    "Three threads must print A, B, C in repeating order for n cycles.",
    "Build a bounded priority queue where consumers block until an item exists.",
    "Throttle user requests so each user gets at most k actions per second.",
    "Transfer money across accounts while many transfers run in parallel.",
    "Execute delayed tasks in timestamp order with one worker thread."
  ]
};
