const JAVA_LAMBDA_STREAMS_SUPPORT_CODE = String.raw`import java.util.*;

class Employee {
  private final int id;
  private final String name;
  private final String department;
  private final double salary;
  private final int age;
  private final String gender;
  private final boolean active;
  private final List<String> skills;

  Employee(int id, String name, String department, double salary, int age, String gender, boolean active, List<String> skills) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;
    this.age = age;
    this.gender = gender;
    this.active = active;
    this.skills = new ArrayList<>(skills);
  }

  int getId() { return id; }
  String getName() { return name; }
  String getDepartment() { return department; }
  double getSalary() { return salary; }
  int getAge() { return age; }
  String getGender() { return gender; }
  boolean isActive() { return active; }
  List<String> getSkills() { return Collections.unmodifiableList(skills); }
}

class Product {
  private final String name;
  private final String category;

  Product(String name, String category) {
    this.name = name;
    this.category = category;
  }

  String getName() { return name; }
  String getCategory() { return category; }
}

class User {
  private final String name;
  private final boolean active;

  User(String name, boolean active) {
    this.name = name;
    this.active = active;
  }

  String getName() { return name; }
  boolean isActive() { return active; }
}

class Student {
  private final String name;
  private final int marks;

  Student(String name, int marks) {
    this.name = name;
    this.marks = marks;
  }

  String getName() { return name; }
  int getMarks() { return marks; }
}`;

const JAVA_STREAM_IMPORTS = String.raw`import java.security.SecureRandom;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;`;

function java(body) {
  return `${JAVA_STREAM_IMPORTS}

class Solution {
${body.trim()}
}`;
}

function p(name, difficulty, question, trigger, code, complexity) {
  return { name, difficulty, question, trigger, code, complexity };
}

function topic(id, title, summary, problems) {
  return { id, title, summary, problems };
}

const JAVA_LAMBDA_STREAM_TOPICS = [
  topic("lambda-basics", "Lambda Basics", "Syntax, comparator lambdas, functional interfaces, and replacing anonymous classes.", [
    p("Sort a list of integers using lambda", "Easy", "Return a sorted copy of a list of integers using a lambda comparator.", "Use a lambda when Comparator logic is short and local to the sort.", java(String.raw`
  List<Integer> sortIntegers(List<Integer> numbers) {
    return numbers.stream()
        .sorted((a, b) -> Integer.compare(a, b))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Sort strings by length", "Easy", "Sort strings from shortest to longest.", "Comparator compares derived values instead of the original string.", java(String.raw`
  List<String> sortByLength(List<String> words) {
    return words.stream()
        .sorted((a, b) -> Integer.compare(a.length(), b.length()))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Find maximum element using lambda comparator", "Easy", "Find the maximum number in a list using max() and a lambda comparator.", "max() needs comparison logic; lambda supplies it inline.", java(String.raw`
  int maxNumber(List<Integer> numbers) {
    return numbers.stream()
        .max((a, b) -> Integer.compare(a, b))
        .orElseThrow(() -> new NoSuchElementException("numbers is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Create a custom functional interface and implement it using lambda", "Easy", "Create a calculator-style interface and implement it with lambda expressions.", "A lambda can implement any interface with exactly one abstract method.", java(String.raw`
  @FunctionalInterface
  interface Operation {
    int apply(int left, int right);
  }

  int calculateSum(int a, int b) {
    Operation add = (left, right) -> left + right;
    return add.apply(a, b);
  }`), "Time O(1), Space O(1)."),
    p("Replace anonymous classes with lambda expressions", "Easy", "Replace an anonymous Runnable class with a lambda expression.", "Anonymous classes with one method are direct lambda candidates.", java(String.raw`
  Runnable buildTask() {
    return () -> System.out.println("Task is running");
  }

  void runTask() {
    buildTask().run();
  }`), "Time O(1), Space O(1)."),
    p("Sort Employee objects by salary", "Medium", "Sort employees by salary in ascending order.", "Comparator can read a field through a getter and compare that value.", java(String.raw`
  List<Employee> sortBySalary(List<Employee> employees) {
    return employees.stream()
        .sorted((a, b) -> Double.compare(a.getSalary(), b.getSalary()))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Sort Employee by department and salary", "Medium", "Sort employees by department, then salary inside each department.", "Use comparator chaining when one field breaks ties for another field.", java(String.raw`
  List<Employee> sortByDepartmentAndSalary(List<Employee> employees) {
    return employees.stream()
        .sorted(Comparator.comparing(Employee::getDepartment)
            .thenComparingDouble(Employee::getSalary))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Chain Comparators using thenComparing()", "Medium", "Sort employees by department, then age, then name.", "thenComparing() creates stable priority order across multiple fields.", java(String.raw`
  List<Employee> sortByDepartmentAgeAndName(List<Employee> employees) {
    return employees.stream()
        .sorted(Comparator.comparing(Employee::getDepartment)
            .thenComparingInt(Employee::getAge)
            .thenComparing(Employee::getName))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n).")
  ]),

  topic("functional-interfaces", "Functional Interfaces", "Predicate, Function, Consumer, Supplier, chaining, and method references.", [
    p("Predicate to check even numbers", "Easy", "Use Predicate to test whether a number is even.", "Predicate<T> returns boolean and fits filter/test logic.", java(String.raw`
  boolean isEven(int value) {
    Predicate<Integer> even = number -> number % 2 == 0;
    return even.test(value);
  }`), "Time O(1), Space O(1)."),
    p("Predicate to check palindrome", "Easy", "Use Predicate to test whether a string is a palindrome.", "Predicate is useful when a reusable yes/no rule is needed.", java(String.raw`
  boolean isPalindrome(String value) {
    Predicate<String> palindrome = text -> IntStream.range(0, text.length() / 2)
        .allMatch(i -> text.charAt(i) == text.charAt(text.length() - 1 - i));
    return palindrome.test(value);
  }`), "Time O(n), Space O(1)."),
    p("Predicate chaining using and(), or(), negate()", "Medium", "Filter strings that are nonblank and either start with A or are long.", "Predicate chaining keeps business rules composable.", java(String.raw`
  List<String> filterImportantWords(List<String> words) {
    Predicate<String> nonBlank = word -> word != null && !word.trim().isEmpty();
    Predicate<String> startsWithA = word -> word.startsWith("A");
    Predicate<String> longWord = word -> word.length() >= 8;

    return words.stream()
        .filter(nonBlank.and(startsWithA.or(longWord)).and(nonBlank.negate().negate()))
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Function to convert String to Integer", "Easy", "Convert a numeric string into an Integer using Function.", "Function<T,R> transforms one type into another.", java(String.raw`
  int parseNumber(String value) {
    Function<String, Integer> parse = Integer::parseInt;
    return parse.apply(value);
  }`), "Time O(k), Space O(1), where k is string length."),
    p("Function to calculate square", "Easy", "Use Function to calculate the square of an integer.", "Function can represent reusable transformation logic.", java(String.raw`
  int square(int value) {
    Function<Integer, Integer> square = number -> number * number;
    return square.apply(value);
  }`), "Time O(1), Space O(1)."),
    p("Function chaining using andThen()", "Medium", "Trim a string, parse it, then square the parsed value.", "andThen() feeds the previous output into the next function.", java(String.raw`
  int parseThenSquare(String value) {
    Function<String, String> trim = String::trim;
    Function<String, Integer> parse = Integer::parseInt;
    Function<Integer, Integer> square = number -> number * number;

    return trim.andThen(parse).andThen(square).apply(value);
  }`), "Time O(k), Space O(k)."),
    p("Consumer to print Employee details", "Easy", "Use Consumer to print details for every employee.", "Consumer<T> performs an action without returning a value.", java(String.raw`
  void printEmployees(List<Employee> employees) {
    Consumer<Employee> printer = employee -> System.out.println(
        employee.getId() + " " + employee.getName() + " " + employee.getSalary());

    employees.forEach(printer);
  }`), "Time O(n), Space O(1)."),
    p("Supplier to generate random OTP", "Medium", "Use Supplier to generate a six-digit OTP.", "Supplier<T> produces a value without input.", java(String.raw`
  String generateOtp() {
    SecureRandom random = new SecureRandom();
    Supplier<String> otpSupplier = () -> String.format("%06d", random.nextInt(1_000_000));
    return otpSupplier.get();
  }`), "Time O(1), Space O(1).")
  ]),

  topic("stream-creation", "Stream Creation", "Create streams from collections, arrays, factory methods, and infinite generators.", [
    p("Create stream from List", "Easy", "Create a stream from a List and collect uppercase values.", "List already exposes stream() for sequential pipelines.", java(String.raw`
  List<String> uppercase(List<String> names) {
    return names.stream()
        .map(String::toUpperCase)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Create stream from Array", "Easy", "Create a stream from an int array and calculate sum.", "Arrays.stream() creates primitive and object streams from arrays.", java(String.raw`
  int sum(int[] numbers) {
    return Arrays.stream(numbers).sum();
  }`), "Time O(n), Space O(1)."),
    p("Create stream using Stream.of()", "Easy", "Create a stream from fixed values using Stream.of().", "Stream.of() is best for small fixed input lists.", java(String.raw`
  List<String> fixedNames() {
    return Stream.of("Asha", "Ravi", "Sana")
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Create infinite stream using iterate()", "Medium", "Generate the first n even numbers using Stream.iterate().", "iterate() creates the next value from the previous value.", java(String.raw`
  List<Integer> firstEvenNumbers(int count) {
    return Stream.iterate(0, number -> number + 2)
        .limit(count)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Create infinite stream using generate()", "Medium", "Generate random numbers with Stream.generate().", "generate() repeatedly calls a Supplier with no previous state.", java(String.raw`
  List<Integer> randomNumbers(int count) {
    SecureRandom random = new SecureRandom();
    return Stream.generate(() -> random.nextInt(100))
        .limit(count)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n).")
  ]),

  topic("filtering", "Filtering", "Use filter() with predicates to keep only matching records.", [
    p("Find all even numbers", "Easy", "Return all even numbers from a list.", "filter() keeps values that satisfy a Predicate.", java(String.raw`
  List<Integer> evenNumbers(List<Integer> numbers) {
    return numbers.stream()
        .filter(number -> number % 2 == 0)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Find all odd numbers", "Easy", "Return all odd numbers from a list.", "Use filter() when the output is a subset of the input.", java(String.raw`
  List<Integer> oddNumbers(List<Integer> numbers) {
    return numbers.stream()
        .filter(number -> number % 2 != 0)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Find employees with salary > 50000", "Easy", "Return employees whose salary is greater than 50000.", "Filter object lists by a numeric field.", java(String.raw`
  List<Employee> highSalaryEmployees(List<Employee> employees) {
    return employees.stream()
        .filter(employee -> employee.getSalary() > 50_000)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Find active users", "Easy", "Return only active users.", "Boolean getters are direct filter predicates.", java(String.raw`
  List<User> activeUsers(List<User> users) {
    return users.stream()
        .filter(User::isActive)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Find products belonging to Electronics category", "Easy", "Return products whose category is Electronics.", "Use filter() with equalsIgnoreCase() for category matching.", java(String.raw`
  List<Product> electronicsProducts(List<Product> products) {
    return products.stream()
        .filter(product -> "Electronics".equalsIgnoreCase(product.getCategory()))
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Find strings starting with A", "Easy", "Return strings that start with uppercase A.", "Prefix checks fit naturally inside filter().", java(String.raw`
  List<String> startingWithA(List<String> values) {
    return values.stream()
        .filter(value -> value.startsWith("A"))
        .collect(Collectors.toList());
  }`), "Time O(n * k), Space O(n)."),
    p("Find strings ending with n", "Easy", "Return strings that end with lowercase n.", "Suffix checks are simple filter predicates.", java(String.raw`
  List<String> endingWithN(List<String> values) {
    return values.stream()
        .filter(value -> value.endsWith("n"))
        .collect(Collectors.toList());
  }`), "Time O(n * k), Space O(n).")
  ]),

  topic("mapping", "Mapping", "Use map() to transform each input element into another value.", [
    p("Convert all names to uppercase", "Easy", "Return names converted to uppercase.", "map() transforms every element.", java(String.raw`
  List<String> toUppercase(List<String> names) {
    return names.stream()
        .map(String::toUpperCase)
        .collect(Collectors.toList());
  }`), "Time O(n * k), Space O(n * k)."),
    p("Convert all names to lowercase", "Easy", "Return names converted to lowercase.", "Use map() when output size equals input size.", java(String.raw`
  List<String> toLowercase(List<String> names) {
    return names.stream()
        .map(String::toLowerCase)
        .collect(Collectors.toList());
  }`), "Time O(n * k), Space O(n * k)."),
    p("Extract employee names from Employee list", "Easy", "Return only employee names.", "Map objects to one selected field.", java(String.raw`
  List<String> employeeNames(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getName)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Extract employee salaries", "Easy", "Return employee salaries.", "Use mapToDouble for numeric primitive output.", java(String.raw`
  List<Double> employeeSalaries(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getSalary)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Convert List<String> to List<Integer>", "Easy", "Parse all numeric strings into integers.", "map() changes element type from String to Integer.", java(String.raw`
  List<Integer> parseNumbers(List<String> values) {
    return values.stream()
        .map(Integer::parseInt)
        .collect(Collectors.toList());
  }`), "Time O(n * k), Space O(n)."),
    p("Get length of each string", "Easy", "Return the length of every string.", "Mapping can derive a computed property.", java(String.raw`
  List<Integer> lengths(List<String> values) {
    return values.stream()
        .map(String::length)
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n).")
  ]),

  topic("distinct-sorting", "Distinct and Sorting", "Deduplicate and order values or objects.", [
    p("Remove duplicates", "Easy", "Return values without duplicates while preserving encounter order.", "distinct() removes duplicates using equals() and hashCode().", java(String.raw`
  List<Integer> removeDuplicates(List<Integer> numbers) {
    return numbers.stream()
        .distinct()
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Sort ascending", "Easy", "Sort numbers in ascending order.", "sorted() uses natural order for comparable values.", java(String.raw`
  List<Integer> sortAscending(List<Integer> numbers) {
    return numbers.stream()
        .sorted()
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Sort descending", "Easy", "Sort numbers in descending order.", "Use reverseOrder() when natural order must be flipped.", java(String.raw`
  List<Integer> sortDescending(List<Integer> numbers) {
    return numbers.stream()
        .sorted(Comparator.reverseOrder())
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Sort strings alphabetically", "Easy", "Sort strings in lexicographic order.", "String has natural alphabetical ordering.", java(String.raw`
  List<String> sortAlphabetically(List<String> values) {
    return values.stream()
        .sorted()
        .collect(Collectors.toList());
  }`), "Time O(n log n * k), Space O(n)."),
    p("Sort strings by length", "Easy", "Sort strings by length, then alphabetically.", "Use comparator chaining for deterministic ties.", java(String.raw`
  List<String> sortByLengthThenName(List<String> values) {
    return values.stream()
        .sorted(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Sort employees by salary", "Medium", "Sort employees by salary in descending order.", "Object sorting requires a field-based comparator.", java(String.raw`
  List<Employee> sortEmployeesBySalaryDesc(List<Employee> employees) {
    return employees.stream()
        .sorted(Comparator.comparingDouble(Employee::getSalary).reversed())
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Sort employees by age", "Medium", "Sort employees by age in ascending order.", "Use comparingInt for primitive int fields.", java(String.raw`
  List<Employee> sortEmployeesByAge(List<Employee> employees) {
    return employees.stream()
        .sorted(Comparator.comparingInt(Employee::getAge))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n).")
  ]),

  topic("collectors", "Collectors", "Convert streams into lists, sets, maps, strings, counts, sums, averages, min, and max.", [
    p("Convert stream to List", "Easy", "Collect a stream into a List.", "Collectors.toList() materializes stream output.", java(String.raw`
  List<String> collectToList(Stream<String> stream) {
    return stream.collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Convert stream to Set", "Easy", "Collect a stream into a Set.", "Collectors.toSet() removes duplicate values.", java(String.raw`
  Set<String> collectToSet(Stream<String> stream) {
    return stream.collect(Collectors.toSet());
  }`), "Time O(n), Space O(n)."),
    p("Convert stream to Map", "Medium", "Convert employees into a map by id.", "toMap() needs key mapper, value mapper, and merge rule if keys can repeat.", java(String.raw`
  Map<Integer, Employee> employeeById(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.toMap(
            Employee::getId,
            Function.identity(),
            (existing, replacement) -> existing));
  }`), "Time O(n), Space O(n)."),
    p("Join strings with comma", "Easy", "Join names with comma separator.", "joining() is the collector for string concatenation.", java(String.raw`
  String joinWithComma(List<String> names) {
    return names.stream()
        .collect(Collectors.joining(", "));
  }`), "Time O(total characters), Space O(total characters)."),
    p("Count total elements", "Easy", "Count stream elements.", "counting() is useful inside collectors; count() is direct terminal operation.", java(String.raw`
  long countNames(List<String> names) {
    return names.stream()
        .collect(Collectors.counting());
  }`), "Time O(n), Space O(1)."),
    p("Calculate average salary", "Easy", "Calculate average employee salary.", "averagingDouble() summarizes numeric object fields.", java(String.raw`
  double averageSalary(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.averagingDouble(Employee::getSalary));
  }`), "Time O(n), Space O(1)."),
    p("Calculate total salary", "Easy", "Calculate total employee salary.", "summingDouble() adds numeric object fields.", java(String.raw`
  double totalSalary(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.summingDouble(Employee::getSalary));
  }`), "Time O(n), Space O(1)."),
    p("Find maximum salary", "Easy", "Find maximum employee salary.", "mapToDouble with max avoids Optional<Employee> when only salary is needed.", java(String.raw`
  double maximumSalary(List<Employee> employees) {
    return employees.stream()
        .mapToDouble(Employee::getSalary)
        .max()
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Find minimum salary", "Easy", "Find minimum employee salary.", "mapToDouble with min returns the smallest numeric field.", java(String.raw`
  double minimumSalary(List<Employee> employees) {
    return employees.stream()
        .mapToDouble(Employee::getSalary)
        .min()
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(1).")
  ]),

  topic("grouping-by", "GroupingBy", "Most asked employee grouping problems using Collectors.groupingBy().", [
    p("Group employees by department", "Medium", "Return employees grouped by department.", "groupingBy() partitions records by a classifier key.", java(String.raw`
  Map<String, List<Employee>> groupByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment));
  }`), "Time O(n), Space O(n)."),
    p("Count employees per department", "Medium", "Return department wise employee count.", "Use downstream counting() when grouped values are counts.", java(String.raw`
  Map<String, Long> countByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()));
  }`), "Time O(n), Space O(d)."),
    p("Find highest paid employee per department", "Hard", "Return the highest paid employee for every department.", "Use groupingBy() with maxBy() as a downstream collector.", java(String.raw`
  Map<String, Employee> highestPaidByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(
            Employee::getDepartment,
            Collectors.collectingAndThen(
                Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary)),
                employee -> employee.orElseThrow(() -> new NoSuchElementException("empty department")))));
  }`), "Time O(n), Space O(d)."),
    p("Find average salary per department", "Medium", "Return average salary for each department.", "groupingBy() can run averagingDouble() per group.", java(String.raw`
  Map<String, Double> averageSalaryByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(
            Employee::getDepartment,
            Collectors.averagingDouble(Employee::getSalary)));
  }`), "Time O(n), Space O(d)."),
    p("Group employees by age", "Easy", "Return employees grouped by age.", "Any stable field can be the grouping key.", java(String.raw`
  Map<Integer, List<Employee>> groupByAge(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getAge));
  }`), "Time O(n), Space O(n)."),
    p("Find employees grouped by salary range", "Medium", "Group employees into LOW, MID, and HIGH salary ranges.", "Use a custom classifier method when the key is derived.", java(String.raw`
  Map<String, List<Employee>> groupBySalaryRange(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(this::salaryRange));
  }

  private String salaryRange(Employee employee) {
    if (employee.getSalary() < 50_000) {
      return "LOW";
    }
    if (employee.getSalary() <= 100_000) {
      return "MID";
    }
    return "HIGH";
  }`), "Time O(n), Space O(n)."),
    p("Multi-level grouping: Department then Age", "Hard", "Group employees first by department and then by age.", "Nested groupingBy() builds a map of maps.", java(String.raw`
  Map<String, Map<Integer, List<Employee>>> groupByDepartmentThenAge(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(
            Employee::getDepartment,
            Collectors.groupingBy(Employee::getAge)));
  }`), "Time O(n), Space O(n).")
  ]),

  topic("partitioning-by", "PartitioningBy", "Split data into true and false buckets.", [
    p("Partition employees by salary > 50000", "Easy", "Partition employees into salary greater than 50000 and not greater than 50000.", "partitioningBy() is groupingBy() for boolean keys.", java(String.raw`
  Map<Boolean, List<Employee>> partitionByHighSalary(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.partitioningBy(employee -> employee.getSalary() > 50_000));
  }`), "Time O(n), Space O(n)."),
    p("Partition numbers into even and odd", "Easy", "Partition numbers into even and odd groups.", "Boolean tests should use partitioningBy() instead of groupingBy().", java(String.raw`
  Map<Boolean, List<Integer>> partitionEvenOdd(List<Integer> numbers) {
    return numbers.stream()
        .collect(Collectors.partitioningBy(number -> number % 2 == 0));
  }`), "Time O(n), Space O(n)."),
    p("Partition students into pass/fail", "Easy", "Partition students by marks greater than or equal to pass marks.", "partitioningBy() cleanly names pass/fail as true/false buckets.", java(String.raw`
  Map<Boolean, List<Student>> partitionPassFail(List<Student> students, int passMarks) {
    return students.stream()
        .collect(Collectors.partitioningBy(student -> student.getMarks() >= passMarks));
  }`), "Time O(n), Space O(n).")
  ]),

  topic("reduction", "Reduction", "Use reduce() for folding streams into one value.", [
    p("Sum of all numbers", "Easy", "Use reduce() to calculate the sum of all numbers.", "reduce() combines elements into a single accumulated result.", java(String.raw`
  int sum(List<Integer> numbers) {
    return numbers.stream()
        .reduce(0, Integer::sum);
  }`), "Time O(n), Space O(1)."),
    p("Product of all numbers", "Easy", "Use reduce() to calculate product of all numbers.", "The identity for multiplication is 1.", java(String.raw`
  int product(List<Integer> numbers) {
    return numbers.stream()
        .reduce(1, (left, right) -> left * right);
  }`), "Time O(n), Space O(1)."),
    p("Maximum number", "Easy", "Use reduce() to find the maximum number.", "Use a binary operator that keeps the better value.", java(String.raw`
  int maximum(List<Integer> numbers) {
    return numbers.stream()
        .reduce(Integer::max)
        .orElseThrow(() -> new NoSuchElementException("numbers is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Minimum number", "Easy", "Use reduce() to find the minimum number.", "A reduction without identity returns Optional for empty safety.", java(String.raw`
  int minimum(List<Integer> numbers) {
    return numbers.stream()
        .reduce(Integer::min)
        .orElseThrow(() -> new NoSuchElementException("numbers is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Total salary of employees", "Medium", "Use reduce() to add employee salaries.", "Map to salary first, then reduce doubles.", java(String.raw`
  double totalSalary(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getSalary)
        .reduce(0.0, Double::sum);
  }`), "Time O(n), Space O(1)."),
    p("Concatenate strings", "Easy", "Use reduce() to concatenate strings with spaces.", "Reduction can combine strings, but joining() is usually preferred.", java(String.raw`
  String concatenate(List<String> words) {
    return words.stream()
        .reduce("", (left, right) -> left.isEmpty() ? right : left + " " + right);
  }`), "Time O(total characters squared) in worst case, Space O(total characters).")
  ]),

  topic("optional", "Optional", "Find values safely and handle absence with orElse, orElseGet, and orElseThrow.", [
    p("Find first employee", "Easy", "Return the first employee as Optional.", "findFirst() returns Optional because the stream may be empty.", java(String.raw`
  Optional<Employee> firstEmployee(List<Employee> employees) {
    return employees.stream().findFirst();
  }`), "Time O(1) for ordered lists, Space O(1)."),
    p("Find highest salary employee", "Medium", "Return the employee with the highest salary.", "max() returns Optional for empty input.", java(String.raw`
  Optional<Employee> highestSalaryEmployee(List<Employee> employees) {
    return employees.stream()
        .max(Comparator.comparingDouble(Employee::getSalary));
  }`), "Time O(n), Space O(1)."),
    p("Handle null safely", "Easy", "Trim a nullable name and return Unknown when missing.", "Optional.ofNullable() protects null before map/filter operations.", java(String.raw`
  String cleanName(String name) {
    return Optional.ofNullable(name)
        .map(String::trim)
        .filter(value -> !value.isEmpty())
        .orElse("Unknown");
  }`), "Time O(k), Space O(k)."),
    p("Use orElse()", "Easy", "Return default employee name when Optional is empty.", "orElse() supplies an eager fallback value.", java(String.raw`
  String employeeNameOrDefault(Optional<Employee> employee) {
    return employee.map(Employee::getName)
        .orElse("No employee");
  }`), "Time O(1), Space O(1)."),
    p("Use orElseGet()", "Easy", "Return generated fallback text only when Optional is empty.", "orElseGet() lazily calls Supplier only on empty Optional.", java(String.raw`
  String employeeNameOrGeneratedDefault(Optional<Employee> employee) {
    return employee.map(Employee::getName)
        .orElseGet(() -> "Employee-" + UUID.randomUUID());
  }`), "Time O(1), Space O(1)."),
    p("Use orElseThrow()", "Easy", "Return employee or throw a custom exception when absent.", "orElseThrow() is the strict branch for required values.", java(String.raw`
  Employee requiredEmployee(Optional<Employee> employee) {
    return employee.orElseThrow(() -> new NoSuchElementException("employee not found"));
  }`), "Time O(1), Space O(1).")
  ]),

  topic("flatmap", "FlatMap", "Flatten nested lists and one-to-many relationships.", [
    p("Convert List<List<Integer>> to List<Integer>", "Medium", "Flatten nested integer lists into one list.", "flatMap() removes one nesting level.", java(String.raw`
  List<Integer> flattenNumbers(List<List<Integer>> nestedNumbers) {
    return nestedNumbers.stream()
        .flatMap(List::stream)
        .collect(Collectors.toList());
  }`), "Time O(total elements), Space O(total elements)."),
    p("Flatten list of employee skills", "Medium", "Return all skills from all employees.", "Each employee maps to many skills, so map() is not enough.", java(String.raw`
  List<String> allSkills(List<Employee> employees) {
    return employees.stream()
        .flatMap(employee -> employee.getSkills().stream())
        .collect(Collectors.toList());
  }`), "Time O(total skills), Space O(total skills)."),
    p("Flatten nested lists", "Medium", "Flatten nested lists of strings.", "flatMap() converts Stream<List<T>> into Stream<T>.", java(String.raw`
  List<String> flattenStrings(List<List<String>> nestedValues) {
    return nestedValues.stream()
        .flatMap(Collection::stream)
        .collect(Collectors.toList());
  }`), "Time O(total elements), Space O(total elements)."),
    p("Get unique skills across all employees", "Medium", "Return unique employee skills sorted alphabetically.", "flatMap() produces skills, distinct() deduplicates them.", java(String.raw`
  List<String> uniqueSkills(List<Employee> employees) {
    return employees.stream()
        .flatMap(employee -> employee.getSkills().stream())
        .distinct()
        .sorted()
        .collect(Collectors.toList());
  }`), "Time O(s log s), Space O(s), where s is total skills.")
  ]),

  topic("terminal-operations", "Stream Terminal Operations", "Practice anyMatch, allMatch, noneMatch, findFirst, findAny, count, max, and min.", [
    p("anyMatch()", "Easy", "Check whether any number is even.", "anyMatch() stops as soon as one element matches.", java(String.raw`
  boolean hasEvenNumber(List<Integer> numbers) {
    return numbers.stream()
        .anyMatch(number -> number % 2 == 0);
  }`), "Time O(n) worst case, Space O(1)."),
    p("allMatch()", "Easy", "Check whether all numbers are positive.", "allMatch() validates every element against one rule.", java(String.raw`
  boolean allPositive(List<Integer> numbers) {
    return numbers.stream()
        .allMatch(number -> number > 0);
  }`), "Time O(n) worst case, Space O(1)."),
    p("noneMatch()", "Easy", "Check whether no string is blank.", "noneMatch() is the clean negative existence check.", java(String.raw`
  boolean hasNoBlankValues(List<String> values) {
    return values.stream()
        .noneMatch(value -> value == null || value.trim().isEmpty());
  }`), "Time O(n) worst case, Space O(1)."),
    p("findFirst()", "Easy", "Return the first name starting with S.", "findFirst() respects encounter order.", java(String.raw`
  Optional<String> firstNameStartingWithS(List<String> names) {
    return names.stream()
        .filter(name -> name.startsWith("S"))
        .findFirst();
  }`), "Time O(n) worst case, Space O(1)."),
    p("findAny()", "Easy", "Return any employee from Engineering.", "findAny() allows faster results in parallel streams when order is not important.", java(String.raw`
  Optional<Employee> anyEngineeringEmployee(List<Employee> employees) {
    return employees.parallelStream()
        .filter(employee -> "Engineering".equals(employee.getDepartment()))
        .findAny();
  }`), "Time O(n) worst case, Space O(1)."),
    p("count()", "Easy", "Count active employees.", "count() terminates the stream and returns long.", java(String.raw`
  long activeEmployeeCount(List<Employee> employees) {
    return employees.stream()
        .filter(Employee::isActive)
        .count();
  }`), "Time O(n), Space O(1)."),
    p("max()", "Easy", "Find max number.", "max() uses a comparator and returns Optional.", java(String.raw`
  Optional<Integer> maxNumber(List<Integer> numbers) {
    return numbers.stream()
        .max(Integer::compareTo);
  }`), "Time O(n), Space O(1)."),
    p("min()", "Easy", "Find min number.", "min() is the symmetric terminal operation to max().", java(String.raw`
  Optional<Integer> minNumber(List<Integer> numbers) {
    return numbers.stream()
        .min(Integer::compareTo);
  }`), "Time O(n), Space O(1)."),
    p("Is any employee earning > 1 lakh?", "Easy", "Check whether any employee earns more than 100000.", "Use anyMatch() for existence questions.", java(String.raw`
  boolean hasEmployeeAboveOneLakh(List<Employee> employees) {
    return employees.stream()
        .anyMatch(employee -> employee.getSalary() > 100_000);
  }`), "Time O(n) worst case, Space O(1)."),
    p("Are all employees active?", "Easy", "Check whether every employee is active.", "Use allMatch() for universal checks.", java(String.raw`
  boolean areAllEmployeesActive(List<Employee> employees) {
    return employees.stream()
        .allMatch(Employee::isActive);
  }`), "Time O(n) worst case, Space O(1)."),
    p("Is any department empty?", "Medium", "Given all departments and employees, check whether any department has no employee.", "Build present department set, then use anyMatch() on master departments.", java(String.raw`
  boolean hasEmptyDepartment(List<String> departments, List<Employee> employees) {
    Set<String> departmentsWithEmployees = employees.stream()
        .map(Employee::getDepartment)
        .collect(Collectors.toSet());

    return departments.stream()
        .anyMatch(department -> !departmentsWithEmployees.contains(department));
  }`), "Time O(n + d), Space O(d).")
  ]),

  topic("advanced-employee-dataset", "Advanced Employee Dataset Questions", "Frequently asked employee analytics with Stream API.", [
    p("Find second highest salary", "Medium", "Return the second highest distinct salary.", "Use distinct salaries, sort descending, then skip one.", java(String.raw`
  double secondHighestSalary(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getSalary)
        .distinct()
        .sorted(Comparator.reverseOrder())
        .skip(1)
        .findFirst()
        .orElseThrow(() -> new NoSuchElementException("second salary not found"));
  }`), "Time O(n log n), Space O(n)."),
    p("Find third highest salary", "Medium", "Return the third highest distinct salary.", "skip(2) after descending distinct salaries.", java(String.raw`
  double thirdHighestSalary(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getSalary)
        .distinct()
        .sorted(Comparator.reverseOrder())
        .skip(2)
        .findFirst()
        .orElseThrow(() -> new NoSuchElementException("third salary not found"));
  }`), "Time O(n log n), Space O(n)."),
    p("Find top 3 highest paid employees", "Medium", "Return the top 3 employees by salary.", "Sort objects by salary descending and limit result.", java(String.raw`
  List<Employee> topThreeHighestPaidEmployees(List<Employee> employees) {
    return employees.stream()
        .sorted(Comparator.comparingDouble(Employee::getSalary).reversed())
        .limit(3)
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Find duplicate employee names", "Medium", "Return employee names that occur more than once.", "Group by name and keep groups with count greater than one.", java(String.raw`
  Set<String> duplicateEmployeeNames(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getName, Collectors.counting()))
        .entrySet()
        .stream()
        .filter(entry -> entry.getValue() > 1)
        .map(Map.Entry::getKey)
        .collect(Collectors.toSet());
  }`), "Time O(n), Space O(n)."),
    p("Count employees in each department", "Medium", "Return employee count per department.", "groupingBy with counting is the standard count-per-key pattern.", java(String.raw`
  Map<String, Long> countEmployeesByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()));
  }`), "Time O(n), Space O(d)."),
    p("Department with highest average salary", "Hard", "Return the department whose average salary is highest.", "Compute average per department, then max over map entries.", java(String.raw`
  String departmentWithHighestAverageSalary(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(
            Employee::getDepartment,
            Collectors.averagingDouble(Employee::getSalary)))
        .entrySet()
        .stream()
        .max(Map.Entry.comparingByValue())
        .map(Map.Entry::getKey)
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(d)."),
    p("Youngest employee", "Easy", "Return the employee with minimum age.", "min() with comparingInt finds youngest by age.", java(String.raw`
  Employee youngestEmployee(List<Employee> employees) {
    return employees.stream()
        .min(Comparator.comparingInt(Employee::getAge))
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Oldest employee", "Easy", "Return the employee with maximum age.", "max() with comparingInt finds oldest by age.", java(String.raw`
  Employee oldestEmployee(List<Employee> employees) {
    return employees.stream()
        .max(Comparator.comparingInt(Employee::getAge))
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Employee with longest name", "Medium", "Return employee whose name has maximum length.", "Compare derived string length.", java(String.raw`
  Employee employeeWithLongestName(List<Employee> employees) {
    return employees.stream()
        .max(Comparator.comparingInt(employee -> employee.getName().length()))
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Average salary by gender", "Medium", "Return average salary grouped by gender.", "Group by gender with averagingDouble downstream collector.", java(String.raw`
  Map<String, Double> averageSalaryByGender(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(
            Employee::getGender,
            Collectors.averagingDouble(Employee::getSalary)));
  }`), "Time O(n), Space O(g)."),
    p("Highest paid employee in each department", "Hard", "Return the highest paid employee per department.", "Group by department and use maxBy salary inside each group.", java(String.raw`
  Map<String, Employee> highestPaidEmployeeByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(
            Employee::getDepartment,
            Collectors.collectingAndThen(
                Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary)),
                employee -> employee.orElseThrow(() -> new NoSuchElementException("empty department")))));
  }`), "Time O(n), Space O(d)."),
    p("Department having maximum employees", "Medium", "Return the department with the highest number of employees.", "Count per department, then find max count.", java(String.raw`
  String departmentHavingMaximumEmployees(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()))
        .entrySet()
        .stream()
        .max(Map.Entry.comparingByValue())
        .map(Map.Entry::getKey)
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(d)."),
    p("Sort employees by department then salary", "Medium", "Sort employees by department ascending and salary descending.", "Comparator chaining can mix ascending and descending fields.", java(String.raw`
  List<Employee> sortByDepartmentThenSalaryDesc(List<Employee> employees) {
    return employees.stream()
        .sorted(Comparator.comparing(Employee::getDepartment)
            .thenComparing(Comparator.comparingDouble(Employee::getSalary).reversed()))
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Find employees whose names start with S", "Easy", "Return employees with names starting with S.", "Use filter on object field.", java(String.raw`
  List<Employee> employeesWhoseNamesStartWithS(List<Employee> employees) {
    return employees.stream()
        .filter(employee -> employee.getName().startsWith("S"))
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Find salary statistics", "Medium", "Return count, sum, min, average, and max salary.", "summaryStatistics() gives all salary aggregates in one pass.", java(String.raw`
  DoubleSummaryStatistics salaryStatistics(List<Employee> employees) {
    return employees.stream()
        .mapToDouble(Employee::getSalary)
        .summaryStatistics();
  }`), "Time O(n), Space O(1).")
  ]),

  topic("string-stream-problems", "String Stream Problems", "Character and word level Stream API practice.", [
    p("Count vowels", "Easy", "Count vowels in a string.", "chars() turns a String into an IntStream.", java(String.raw`
  long countVowels(String text) {
    return text.chars()
        .filter(ch -> "aeiouAEIOU".indexOf(ch) >= 0)
        .count();
  }`), "Time O(n), Space O(1)."),
    p("Count characters frequency", "Medium", "Return frequency of every character preserving first-seen order.", "Group characters after boxing int chars to Character.", java(String.raw`
  Map<Character, Long> characterFrequency(String text) {
    return text.chars()
        .mapToObj(ch -> (char) ch)
        .collect(Collectors.groupingBy(
            Function.identity(),
            LinkedHashMap::new,
            Collectors.counting()));
  }`), "Time O(n), Space O(k)."),
    p("Find duplicate characters", "Medium", "Return characters appearing more than once.", "Frequency map plus filter identifies duplicates.", java(String.raw`
  Set<Character> duplicateCharacters(String text) {
    return characterFrequency(text).entrySet()
        .stream()
        .filter(entry -> entry.getValue() > 1)
        .map(Map.Entry::getKey)
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }

  private Map<Character, Long> characterFrequency(String text) {
    return text.chars()
        .mapToObj(ch -> (char) ch)
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
  }`), "Time O(n), Space O(k)."),
    p("Find first non-repeating character", "Medium", "Return the first character that appears once.", "LinkedHashMap preserves encounter order for frequency scan.", java(String.raw`
  Optional<Character> firstNonRepeatingCharacter(String text) {
    Map<Character, Long> frequency = text.chars()
        .mapToObj(ch -> (char) ch)
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));

    return frequency.entrySet()
        .stream()
        .filter(entry -> entry.getValue() == 1)
        .map(Map.Entry::getKey)
        .findFirst();
  }`), "Time O(n), Space O(k)."),
    p("Find first repeating character", "Medium", "Return the first character whose total frequency is greater than one.", "Count first, then scan in insertion order.", java(String.raw`
  Optional<Character> firstRepeatingCharacter(String text) {
    Map<Character, Long> frequency = text.chars()
        .mapToObj(ch -> (char) ch)
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));

    return frequency.entrySet()
        .stream()
        .filter(entry -> entry.getValue() > 1)
        .map(Map.Entry::getKey)
        .findFirst();
  }`), "Time O(n), Space O(k)."),
    p("Reverse each word", "Easy", "Reverse every word while keeping word order.", "Map each word to its reversed form.", java(String.raw`
  String reverseEachWord(String sentence) {
    return Arrays.stream(sentence.split("\\s+"))
        .map(word -> new StringBuilder(word).reverse().toString())
        .collect(Collectors.joining(" "));
  }`), "Time O(n), Space O(n)."),
    p("Reverse sentence using streams", "Medium", "Reverse word order in a sentence using streams.", "Use IntStream indexes to read words from the end.", java(String.raw`
  String reverseSentence(String sentence) {
    List<String> words = Arrays.asList(sentence.trim().split("\\s+"));
    return IntStream.range(0, words.size())
        .mapToObj(index -> words.get(words.size() - 1 - index))
        .collect(Collectors.joining(" "));
  }`), "Time O(n), Space O(n)."),
    p("Sort characters alphabetically", "Easy", "Return characters sorted alphabetically.", "chars().sorted() sorts character code points.", java(String.raw`
  String sortCharacters(String text) {
    return text.chars()
        .sorted()
        .mapToObj(ch -> String.valueOf((char) ch))
        .collect(Collectors.joining());
  }`), "Time O(n log n), Space O(n).")
  ]),

  topic("number-stream-problems", "Number Stream Problems", "Numeric Stream API patterns for duplicates, missing values, ranking, and set operations.", [
    p("Find duplicates", "Medium", "Return duplicate numbers from a list.", "Group by value and keep counts greater than one.", java(String.raw`
  Set<Integer> duplicateNumbers(List<Integer> numbers) {
    return numbers.stream()
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
        .entrySet()
        .stream()
        .filter(entry -> entry.getValue() > 1)
        .map(Map.Entry::getKey)
        .collect(Collectors.toSet());
  }`), "Time O(n), Space O(n)."),
    p("Find missing number", "Easy", "Given numbers from 1 to n with one missing, return the missing number.", "Use arithmetic sum and stream sum.", java(String.raw`
  int missingNumber(int[] numbers, int n) {
    int expected = n * (n + 1) / 2;
    int actual = Arrays.stream(numbers).sum();
    return expected - actual;
  }`), "Time O(n), Space O(1)."),
    p("Find second largest", "Medium", "Return the second largest distinct number.", "Use distinct sorted descending and skip one.", java(String.raw`
  int secondLargest(List<Integer> numbers) {
    return numbers.stream()
        .distinct()
        .sorted(Comparator.reverseOrder())
        .skip(1)
        .findFirst()
        .orElseThrow(() -> new NoSuchElementException("second largest not found"));
  }`), "Time O(n log n), Space O(n)."),
    p("Find second smallest", "Medium", "Return the second smallest distinct number.", "Use distinct sorted ascending and skip one.", java(String.raw`
  int secondSmallest(List<Integer> numbers) {
    return numbers.stream()
        .distinct()
        .sorted()
        .skip(1)
        .findFirst()
        .orElseThrow(() -> new NoSuchElementException("second smallest not found"));
  }`), "Time O(n log n), Space O(n)."),
    p("Find frequency of numbers", "Easy", "Return frequency of every number.", "groupingBy(Function.identity(), counting()) is the frequency-map pattern.", java(String.raw`
  Map<Integer, Long> frequency(List<Integer> numbers) {
    return numbers.stream()
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
  }`), "Time O(n), Space O(n)."),
    p("Separate even and odd", "Easy", "Partition numbers into even and odd groups.", "partitioningBy() creates true and false buckets.", java(String.raw`
  Map<Boolean, List<Integer>> separateEvenOdd(List<Integer> numbers) {
    return numbers.stream()
        .collect(Collectors.partitioningBy(number -> number % 2 == 0));
  }`), "Time O(n), Space O(n)."),
    p("Find common elements in two arrays", "Medium", "Return unique numbers present in both arrays.", "Build a set from one array, filter the other, then distinct.", java(String.raw`
  List<Integer> commonElements(int[] first, int[] second) {
    Set<Integer> secondValues = Arrays.stream(second)
        .boxed()
        .collect(Collectors.toSet());

    return Arrays.stream(first)
        .boxed()
        .filter(secondValues::contains)
        .distinct()
        .collect(Collectors.toList());
  }`), "Time O(n + m), Space O(m)."),
    p("Find intersection", "Medium", "Return intersection preserving duplicate counts.", "Use a frequency map for the second array and decrement as matches are used.", java(String.raw`
  List<Integer> intersectionWithCounts(int[] first, int[] second) {
    Map<Integer, Long> counts = Arrays.stream(second)
        .boxed()
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

    return Arrays.stream(first)
        .boxed()
        .filter(value -> {
          long count = counts.getOrDefault(value, 0L);
          if (count == 0) {
            return false;
          }
          counts.put(value, count - 1);
          return true;
        })
        .collect(Collectors.toList());
  }`), "Time O(n + m), Space O(m)."),
    p("Find union", "Easy", "Return union of two arrays without duplicates.", "concat() merges streams; distinct() removes duplicates.", java(String.raw`
  List<Integer> union(int[] first, int[] second) {
    return Stream.concat(Arrays.stream(first).boxed(), Arrays.stream(second).boxed())
        .distinct()
        .collect(Collectors.toList());
  }`), "Time O(n + m), Space O(n + m)."),
    p("Find top K largest numbers", "Medium", "Return top k largest distinct numbers.", "Sort descending, then limit k.", java(String.raw`
  List<Integer> topKLargest(List<Integer> numbers, int k) {
    return numbers.stream()
        .distinct()
        .sorted(Comparator.reverseOrder())
        .limit(k)
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n).")
  ]),

  topic("parallel-stream", "Parallel Stream", "When parallel streams help, how to measure them, and how to avoid shared mutable state.", [
    p("Difference between Stream and ParallelStream", "Easy", "Show sequential and parallel sum methods for the same input.", "parallelStream() splits work across the common ForkJoinPool; stream() stays sequential.", java(String.raw`
  long sequentialSum(List<Integer> numbers) {
    return numbers.stream()
        .mapToLong(Integer::longValue)
        .sum();
  }

  long parallelSum(List<Integer> numbers) {
    return numbers.parallelStream()
        .mapToLong(Integer::longValue)
        .sum();
  }`), "Time O(n), Space O(1); parallel overhead depends on data size and CPU cores."),
    p("Calculate sum using parallel stream", "Easy", "Calculate sum using parallel stream.", "Use parallelStream() for independent associative operations.", java(String.raw`
  long sumUsingParallelStream(List<Integer> numbers) {
    return numbers.parallelStream()
        .mapToLong(Integer::longValue)
        .sum();
  }`), "Time O(n / p) ideal with p processors, Space O(1)."),
    p("Find performance difference", "Medium", "Measure sequential and parallel sum duration.", "Benchmark both paths on the same input before choosing parallel stream.", java(String.raw`
  Map<String, Long> compareSequentialAndParallel(List<Integer> numbers) {
    long sequentialStart = System.nanoTime();
    numbers.stream().mapToLong(Integer::longValue).sum();
    long sequentialTime = System.nanoTime() - sequentialStart;

    long parallelStart = System.nanoTime();
    numbers.parallelStream().mapToLong(Integer::longValue).sum();
    long parallelTime = System.nanoTime() - parallelStart;

    Map<String, Long> result = new LinkedHashMap<>();
    result.put("sequentialNanos", sequentialTime);
    result.put("parallelNanos", parallelTime);
    return result;
  }`), "Time O(n), Space O(1)."),
    p("Thread safety issues in parallel stream", "Hard", "Count words safely in a parallel stream.", "Avoid mutating shared HashMap/List inside forEach; use concurrent collectors.", java(String.raw`
  Map<String, Long> safeWordFrequency(List<String> words) {
    return words.parallelStream()
        .collect(Collectors.groupingByConcurrent(Function.identity(), Collectors.counting()));
  }`), "Time O(n), Space O(k); parallel speed depends on contention and input size.")
  ]),

  topic("top-25-interview-questions", "Top 25 Interview Questions", "Revise these repeatedly for Java 8 Stream and Lambda interviews.", [
    p("Second highest salary employee", "Medium", "Find an employee whose salary is the second highest distinct salary.", "Find second salary first, then locate matching employee.", java(String.raw`
  Employee secondHighestSalaryEmployee(List<Employee> employees) {
    double secondSalary = employees.stream()
        .map(Employee::getSalary)
        .distinct()
        .sorted(Comparator.reverseOrder())
        .skip(1)
        .findFirst()
        .orElseThrow(() -> new NoSuchElementException("second salary not found"));

    return employees.stream()
        .filter(employee -> employee.getSalary() == secondSalary)
        .findFirst()
        .orElseThrow(() -> new NoSuchElementException("employee not found"));
  }`), "Time O(n log n), Space O(n)."),
    p("Highest salary per department", "Hard", "Find highest salary employee for every department.", "Group employees and use maxBy salary as downstream collector.", java(String.raw`
  Map<String, Employee> highestSalaryPerDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(
            Employee::getDepartment,
            Collectors.collectingAndThen(
                Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary)),
                employee -> employee.orElseThrow(() -> new NoSuchElementException("empty department")))));
  }`), "Time O(n), Space O(d)."),
    p("Group employees by department", "Medium", "Group employees by department.", "Classic groupingBy classifier problem.", java(String.raw`
  Map<String, List<Employee>> groupEmployeesByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment));
  }`), "Time O(n), Space O(n)."),
    p("Count employees by department", "Medium", "Count employees per department.", "Use counting downstream collector.", java(String.raw`
  Map<String, Long> countEmployeesByDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()));
  }`), "Time O(n), Space O(d)."),
    p("Duplicate elements in list", "Medium", "Return duplicate values from a list.", "Frequency map detects repeated elements.", java(String.raw`
  Set<Integer> duplicateElements(List<Integer> numbers) {
    return numbers.stream()
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
        .entrySet()
        .stream()
        .filter(entry -> entry.getValue() > 1)
        .map(Map.Entry::getKey)
        .collect(Collectors.toSet());
  }`), "Time O(n), Space O(n)."),
    p("First non-repeating character", "Medium", "Return first non-repeating character from a string.", "LinkedHashMap keeps original character order.", java(String.raw`
  Optional<Character> firstNonRepeatingCharacter(String text) {
    Map<Character, Long> frequency = text.chars()
        .mapToObj(ch -> (char) ch)
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));

    return frequency.entrySet().stream()
        .filter(entry -> entry.getValue() == 1)
        .map(Map.Entry::getKey)
        .findFirst();
  }`), "Time O(n), Space O(k)."),
    p("Frequency of characters", "Easy", "Return character frequency map.", "Box chars and group by identity.", java(String.raw`
  Map<Character, Long> frequencyOfCharacters(String text) {
    return text.chars()
        .mapToObj(ch -> (char) ch)
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
  }`), "Time O(n), Space O(k)."),
    p("Frequency of words", "Easy", "Return word frequency map.", "Split into words and group by identity.", java(String.raw`
  Map<String, Long> frequencyOfWords(String sentence) {
    return Arrays.stream(sentence.trim().split("\\s+"))
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
  }`), "Time O(n), Space O(k)."),
    p("Partition even/odd", "Easy", "Partition numbers into even and odd.", "Boolean split means partitioningBy().", java(String.raw`
  Map<Boolean, List<Integer>> partitionEvenOdd(List<Integer> numbers) {
    return numbers.stream()
        .collect(Collectors.partitioningBy(number -> number % 2 == 0));
  }`), "Time O(n), Space O(n)."),
    p("Top 3 salaries", "Medium", "Return top three distinct salaries.", "Sort distinct salary values descending and limit three.", java(String.raw`
  List<Double> topThreeSalaries(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getSalary)
        .distinct()
        .sorted(Comparator.reverseOrder())
        .limit(3)
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Flatten nested list", "Medium", "Flatten nested integer lists.", "flatMap() removes one collection level.", java(String.raw`
  List<Integer> flattenNestedList(List<List<Integer>> nestedNumbers) {
    return nestedNumbers.stream()
        .flatMap(List::stream)
        .collect(Collectors.toList());
  }`), "Time O(total elements), Space O(total elements)."),
    p("Remove duplicates", "Easy", "Remove duplicates from a list.", "distinct() removes repeated values.", java(String.raw`
  List<Integer> removeDuplicates(List<Integer> numbers) {
    return numbers.stream()
        .distinct()
        .collect(Collectors.toList());
  }`), "Time O(n), Space O(n)."),
    p("Sort employee by salary", "Medium", "Sort employees by salary descending.", "Use comparingDouble and reversed().", java(String.raw`
  List<Employee> sortEmployeeBySalary(List<Employee> employees) {
    return employees.stream()
        .sorted(Comparator.comparingDouble(Employee::getSalary).reversed())
        .collect(Collectors.toList());
  }`), "Time O(n log n), Space O(n)."),
    p("Average salary per department", "Medium", "Find average salary by department.", "Group by department with averagingDouble.", java(String.raw`
  Map<String, Double> averageSalaryPerDepartment(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.averagingDouble(Employee::getSalary)));
  }`), "Time O(n), Space O(d)."),
    p("Department with highest average salary", "Hard", "Find department with maximum average salary.", "Aggregate first, then max by entry value.", java(String.raw`
  String departmentWithHighestAverageSalary(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.averagingDouble(Employee::getSalary)))
        .entrySet()
        .stream()
        .max(Map.Entry.comparingByValue())
        .map(Map.Entry::getKey)
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(d)."),
    p("Find duplicate names", "Medium", "Find repeated employee names.", "Group employee names and keep counts greater than one.", java(String.raw`
  Set<String> duplicateNames(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getName)
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
        .entrySet()
        .stream()
        .filter(entry -> entry.getValue() > 1)
        .map(Map.Entry::getKey)
        .collect(Collectors.toSet());
  }`), "Time O(n), Space O(n)."),
    p("Join all names with comma", "Easy", "Join employee names with comma.", "Map to names then use joining().", java(String.raw`
  String joinAllNamesWithComma(List<Employee> employees) {
    return employees.stream()
        .map(Employee::getName)
        .collect(Collectors.joining(", "));
  }`), "Time O(total characters), Space O(total characters)."),
    p("Convert list to map", "Medium", "Convert employees into map keyed by id.", "toMap requires a key mapper and value mapper.", java(String.raw`
  Map<Integer, Employee> listToMap(List<Employee> employees) {
    return employees.stream()
        .collect(Collectors.toMap(Employee::getId, Function.identity(), (first, second) -> first));
  }`), "Time O(n), Space O(n)."),
    p("Salary statistics", "Medium", "Return salary summary statistics.", "summaryStatistics gives min, max, sum, count, and average.", java(String.raw`
  DoubleSummaryStatistics salaryStatistics(List<Employee> employees) {
    return employees.stream()
        .mapToDouble(Employee::getSalary)
        .summaryStatistics();
  }`), "Time O(n), Space O(1)."),
    p("Find youngest employee", "Easy", "Return employee with minimum age.", "min() with comparing age.", java(String.raw`
  Employee youngestEmployee(List<Employee> employees) {
    return employees.stream()
        .min(Comparator.comparingInt(Employee::getAge))
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Find oldest employee", "Easy", "Return employee with maximum age.", "max() with comparing age.", java(String.raw`
  Employee oldestEmployee(List<Employee> employees) {
    return employees.stream()
        .max(Comparator.comparingInt(Employee::getAge))
        .orElseThrow(() -> new NoSuchElementException("employees is empty"));
  }`), "Time O(n), Space O(1)."),
    p("Find common elements in arrays", "Medium", "Return unique common values from two arrays.", "Set lookup keeps the stream filter O(1) average per element.", java(String.raw`
  List<Integer> commonElements(int[] first, int[] second) {
    Set<Integer> secondSet = Arrays.stream(second).boxed().collect(Collectors.toSet());
    return Arrays.stream(first)
        .boxed()
        .filter(secondSet::contains)
        .distinct()
        .collect(Collectors.toList());
  }`), "Time O(n + m), Space O(m)."),
    p("Second largest number", "Medium", "Return second largest distinct number.", "Distinct, sort descending, skip one.", java(String.raw`
  int secondLargestNumber(List<Integer> numbers) {
    return numbers.stream()
        .distinct()
        .sorted(Comparator.reverseOrder())
        .skip(1)
        .findFirst()
        .orElseThrow(() -> new NoSuchElementException("second largest not found"));
  }`), "Time O(n log n), Space O(n)."),
    p("Missing number", "Easy", "Find missing number from 1 to n.", "Subtract actual stream sum from expected arithmetic sum.", java(String.raw`
  int missingNumber(int[] numbers, int n) {
    return n * (n + 1) / 2 - Arrays.stream(numbers).sum();
  }`), "Time O(n), Space O(1)."),
    p("String character count", "Easy", "Count every character in a string.", "chars() plus groupingBy creates the frequency map.", java(String.raw`
  Map<Character, Long> stringCharacterCount(String text) {
    return text.chars()
        .mapToObj(ch -> (char) ch)
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
  }`), "Time O(n), Space O(k).")
  ])
];
