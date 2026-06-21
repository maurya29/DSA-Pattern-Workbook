function coreTopic(id, title, summary, questions) {
  return { id, title, summary, questions };
}

function coreQuestion(name, difficulty, question, answer, traps, code) {
  return { name, difficulty, question, answer, traps, code: code || "" };
}

const CORE_JAVA_TOPICS = [
  coreTopic("java-platform-jvm", "Java Platform, JVM, JRE, JDK", "Platform independence, execution flow, class loading, bytecode, interpreter, JIT, and main method rules.", [
    coreQuestion("Why is Java platform independent but JVM platform dependent?", "Easy", "Explain how the same Java program runs on different operating systems.", [
      "Java source compiles to bytecode, not directly to native machine code.",
      "Bytecode is portable across operating systems.",
      "Each operating system needs its own JVM implementation to translate bytecode to native instructions.",
      "The program is platform independent; the JVM is platform dependent."
    ], [
      "Do not say JVM is platform independent.",
      "Do not confuse JDK with JVM."
    ]),
    coreQuestion("JDK vs JRE vs JVM", "Easy", "State the exact difference between JDK, JRE, and JVM.", [
      "JVM executes bytecode.",
      "JRE contains JVM plus runtime libraries required to run Java applications.",
      "JDK contains JRE plus development tools such as javac, jar, javadoc, and debugging tools.",
      "Use JDK to develop; use JRE-level runtime to run."
    ], [
      "Modern JDK distributions often include runtime tools together; still know the conceptual difference.",
      "javac belongs to JDK, not JVM."
    ]),
    coreQuestion("Interpreter vs JIT compiler", "Medium", "Why does JVM use both interpreter and JIT?", [
      "Interpreter starts executing bytecode quickly.",
      "JIT compiles frequently executed hot code into optimized native code.",
      "This balances startup time and long-running performance.",
      "JIT optimizations include inlining, escape analysis, dead-code elimination, and loop optimizations."
    ], [
      "JIT does not compile every method immediately.",
      "Java is not purely interpreted."
    ]),
    coreQuestion("Class loading phases", "Medium", "What happens when a class is loaded?", [
      "Loading reads class bytes and creates a Class object.",
      "Linking verifies bytecode, prepares static fields with default values, and resolves symbolic references when needed.",
      "Initialization executes static variable assignments and static blocks in textual order.",
      "Initialization happens before first active use of the class."
    ], [
      "Static fields first get default values during preparation.",
      "Explicit static assignments happen later during initialization."
    ], String.raw`class Test {
  static int x = 10;
  static {
    x = 20;
  }

  public static void main(String[] args) {
    System.out.println(Test.x); // 20
  }
}`),
    coreQuestion("Valid main method signatures", "Medium", "Which main method signatures can start a Java application?", [
      "The standard launcher looks for public static void main(String[] args).",
      "The parameter can be String[] args or String... args.",
      "The parameter name can be anything.",
      "Extra overloaded main methods are allowed but are not launcher entry points."
    ], [
      "static is required for the launcher entry point.",
      "Return type must be void for the recognized entry point."
    ], String.raw`public class App {
  public static void main(String... input) {
    System.out.println("valid");
  }
}`)
  ]),

  coreTopic("data-types-literals", "Data Types, Literals, Wrappers", "Primitive ranges, default values, numeric promotion, literals, char, boolean, wrapper caching, and boxing traps.", [
    coreQuestion("Default values vs local variables", "Easy", "Why can instance variables be used without initialization but local variables cannot?", [
      "Instance and static variables get default values from JVM.",
      "Local variables do not get default values.",
      "The compiler enforces definite assignment for local variables before use.",
      "This avoids reading unpredictable stack-local values."
    ], [
      "Only fields get default values.",
      "Local array elements get defaults because array elements are heap fields of the array object."
    ], String.raw`class Test {
  int x;

  void print() {
    int y;
    System.out.println(x); // 0
    // System.out.println(y); // compile-time error
  }
}`),
    coreQuestion("byte and short arithmetic promotion", "Medium", "Why does byte + byte return int?", [
      "byte, short, and char are promoted to int before arithmetic.",
      "The result of b1 + b2 is int, so assigning to byte needs explicit cast.",
      "Compound assignment performs implicit narrowing after arithmetic.",
      "This rule prevents silent overflow surprises in ordinary binary arithmetic."
    ], [
      "b = b + 1 fails; b += 1 compiles.",
      "final compile-time constants are a special case if value fits target type."
    ], String.raw`byte a = 10;
byte b = 20;
// byte c = a + b; // compile-time error
byte c = (byte) (a + b);
a += 1; // valid`),
    coreQuestion("char is numeric", "Easy", "How does char participate in arithmetic?", [
      "char is an unsigned 16-bit integral type.",
      "In arithmetic, char is promoted to int.",
      "char can store Unicode code units from 0 to 65535.",
      "char arithmetic produces numeric results unless cast back to char."
    ], [
      "char is not a String.",
      "Unicode supplementary characters may need surrogate pairs, not a single char."
    ], String.raw`char ch = 'A';
System.out.println(ch + 1);      // 66
System.out.println((char)(ch+1)); // B`),
    coreQuestion("Integer wrapper cache", "Medium", "Predict == results for Integer objects.", [
      "Autoboxed Integer values from -128 to 127 are cached by default.",
      "Within cache range, == may compare the same object reference.",
      "Outside cache range, separate wrapper objects are usually created.",
      "Use equals() for value comparison."
    ], [
      "Do not rely on == for wrappers.",
      "The upper cache can be configured by JVM options, but the guaranteed range is -128 to 127."
    ], String.raw`Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;

System.out.println(a == b); // true
System.out.println(c == d); // false in normal default JVM`),
    coreQuestion("Literal forms and underscores", "Medium", "Which numeric literal forms are legal?", [
      "Decimal, octal, hexadecimal, and binary integer literals are supported.",
      "Underscores are allowed between digits for readability.",
      "Underscores cannot appear at the start, end, next to decimal point, or next to radix prefix.",
      "Octal literals start with 0, so 010 is decimal 8."
    ], [
      "010 is not ten.",
      "1__000 is valid because underscores are between digits."
    ], String.raw`int decimal = 10;
int octal = 010;      // 8
int hex = 0x10;       // 16
int binary = 0b1010;  // 10
int readable = 1_00_000;`)
  ]),

  coreTopic("operators-control-flow", "Operators and Control Flow", "Short-circuiting, assignment operators, evaluation order, switch rules, unreachable code, and assertions.", [
    coreQuestion("&& vs & with booleans", "Easy", "What is the difference between && and & for boolean expressions?", [
      "&& short-circuits when the left side decides the result.",
      "& evaluates both sides even for boolean expressions.",
      "Use && for conditional checks with null guards.",
      "Use & only when both boolean expressions must execute."
    ], [
      "Using & in null checks can throw NullPointerException.",
      "& is also a bitwise operator for integral types."
    ], String.raw`String s = null;
System.out.println(s != null && s.length() > 0); // false
// System.out.println(s != null & s.length() > 0); // NullPointerException`),
    coreQuestion("Compound assignment narrowing", "Medium", "Why does x += 1 compile for byte but x = x + 1 does not?", [
      "x + 1 promotes x to int.",
      "Plain assignment from int to byte needs explicit cast.",
      "Compound assignment includes an implicit cast to the left-hand type.",
      "The implicit cast can overflow silently."
    ], [
      "Compound assignment is not always safer.",
      "It can change values due to narrowing."
    ], String.raw`byte x = 127;
x += 1;
System.out.println(x); // -128`),
    coreQuestion("Evaluation order in expressions", "Hard", "Predict output with increment operators.", [
      "Java evaluates operands from left to right.",
      "Post-increment returns the old value, then increments.",
      "Pre-increment increments first, then returns new value.",
      "Assignment stores the final expression result after side effects."
    ], [
      "Do not reason as if all increments happen after the full expression.",
      "Avoid such expressions in production code."
    ], String.raw`int i = 1;
i = i++ + ++i;
System.out.println(i); // 4`),
    coreQuestion("switch supported types", "Medium", "Which types are supported in switch?", [
      "Traditional switch supports byte, short, char, int, wrappers, enum, and String.",
      "long, float, double, and boolean are not supported in traditional switch.",
      "Modern switch expressions add better syntax but keep type restrictions aligned with supported selectors.",
      "case labels must be compatible constants or enum constants depending on selector type."
    ], [
      "String switch uses equals semantics, not reference comparison.",
      "null selector can throw NullPointerException unless modern guarded/null case is used in supported versions."
    ]),
    coreQuestion("Unreachable code rules", "Medium", "Why does Java reject some unreachable statements?", [
      "The compiler rejects statements that can never execute according to definite reachability rules.",
      "Code after return, throw, break, or continue in the same block is usually unreachable.",
      "The compiler has special treatment for loops with non-constant conditions.",
      "Unreachable code is a compile-time error, not just a warning."
    ], [
      "if (false) statement is unreachable in practice but treated specially by the language.",
      "while(false) is not allowed because the loop body is unreachable."
    ])
  ]),

  coreTopic("classes-objects-encapsulation", "Classes, Objects, Encapsulation", "Object references, this, data hiding, immutability, pass-by-value, and class design rules.", [
    coreQuestion("Reference variable vs object", "Easy", "Explain the difference between reference variable and object.", [
      "An object is the actual instance on the heap.",
      "A reference variable stores a reference used to access an object.",
      "Multiple references can point to the same object.",
      "Assigning one reference to another does not clone the object."
    ], [
      "Java has no pointer arithmetic.",
      "Reference value is passed by value."
    ]),
    coreQuestion("Java is pass-by-value", "Medium", "Why is Java pass-by-value even for objects?", [
      "Method arguments receive copies of values.",
      "For objects, the copied value is the reference.",
      "A method can mutate the object through the copied reference.",
      "A method cannot reassign the caller's reference variable."
    ], [
      "Mutation and reassignment are different.",
      "Do not say Java is pass-by-reference."
    ], String.raw`static void change(StringBuilder sb) {
  sb.append("B");
  sb = new StringBuilder("C");
}

StringBuilder value = new StringBuilder("A");
change(value);
System.out.println(value); // AB`),
    coreQuestion("Encapsulation vs data hiding", "Easy", "Differentiate encapsulation and data hiding.", [
      "Encapsulation bundles data and behavior inside a class.",
      "Data hiding restricts direct access to internal state.",
      "private fields plus controlled methods are a common approach.",
      "Encapsulation improves maintainability and validation."
    ], [
      "Getters and setters alone do not guarantee good encapsulation.",
      "Avoid exposing mutable internal objects directly."
    ]),
    coreQuestion("Create an immutable class", "Medium", "What rules make a class immutable?", [
      "Declare class final or prevent unsafe subclassing.",
      "Make fields private and final where possible.",
      "Do not provide setters.",
      "Defensively copy mutable inputs and outputs.",
      "Ensure this reference does not escape during construction."
    ], [
      "final fields alone are not enough if field objects are mutable.",
      "Returning internal List or Date breaks immutability."
    ], String.raw`final class Person {
  private final String name;
  private final List<String> skills;

  Person(String name, List<String> skills) {
    this.name = name;
    this.skills = new ArrayList<>(skills);
  }

  List<String> getSkills() {
    return Collections.unmodifiableList(skills);
  }
}`),
    coreQuestion("this keyword limitations", "Medium", "Where can this be used and where not?", [
      "this refers to the current object.",
      "It can access instance members and call another constructor using this(...).",
      "this cannot be used in static context.",
      "this(...) constructor call must be the first statement in a constructor."
    ], [
      "this and super constructor calls cannot both appear in the same constructor.",
      "static methods belong to the class, not a current object."
    ])
  ]),

  coreTopic("constructors-initialization", "Constructors, Blocks, Static Context", "Constructor chaining, static blocks, instance blocks, initialization order, final fields, and static restrictions.", [
    coreQuestion("Are constructors inherited?", "Easy", "Does a subclass inherit superclass constructors?", [
      "Constructors are not inherited.",
      "A subclass constructor must invoke a superclass constructor directly or indirectly.",
      "If no constructor call is written, compiler inserts super().",
      "If superclass has no no-arg constructor, subclass must explicitly call an available constructor."
    ], [
      "Constructor name must match class name.",
      "super() insertion fails if no matching no-arg constructor exists."
    ]),
    coreQuestion("super() and this() first statement rule", "Medium", "Why must super() or this() be first in constructor?", [
      "The object must be initialized from the top of hierarchy before subclass initialization.",
      "Constructor chaining must be deterministic.",
      "A constructor can call either this(...) or super(...), not both directly.",
      "If neither is present, compiler inserts super()."
    ], [
      "You cannot execute normal statements before constructor chaining.",
      "Calling instance methods before superclass initialization would be unsafe."
    ]),
    coreQuestion("Initialization order", "Hard", "Predict initialization order for static and instance members.", [
      "Static fields and static blocks run once when class initializes, in textual order.",
      "For object creation: memory default values, superclass constructor chain, instance fields and instance blocks in textual order, then constructor body.",
      "Superclass initialization happens before subclass initialization.",
      "Instance blocks run before constructor body."
    ], [
      "Textual order matters within the same class.",
      "Default values exist before explicit initialization."
    ]),
    coreQuestion("Static context restrictions", "Easy", "Why cannot static methods directly access instance variables?", [
      "Static members belong to the class.",
      "Instance variables belong to a specific object.",
      "Without an object reference, there is no instance state to access.",
      "Create or receive an object reference to access instance members."
    ], [
      "A static method can access instance state through an object reference.",
      "main is static for launcher convenience."
    ]),
    coreQuestion("final fields and constructors", "Medium", "How must blank final fields be initialized?", [
      "A blank final instance field must be assigned exactly once before constructor completes.",
      "It can be assigned in an instance initializer or every constructor.",
      "A blank final static field must be assigned in a static initializer.",
      "After assignment, final variable cannot be reassigned."
    ], [
      "final reference means reference cannot change, not object immutability.",
      "Every constructor path must initialize blank final instance fields."
    ])
  ]),

  coreTopic("inheritance-composition", "Inheritance and Composition", "IS-A, HAS-A, constructor execution, final, covariant return, private methods, and tight coupling.", [
    coreQuestion("IS-A vs HAS-A", "Easy", "When should inheritance be used and when should composition be used?", [
      "Use inheritance for true IS-A relationships.",
      "Use composition for HAS-A relationships and behavior reuse.",
      "Composition usually reduces coupling and improves testability.",
      "Inheritance exposes superclass contract to subclass."
    ], [
      "Do not use inheritance only to reuse code.",
      "A wrong IS-A relation creates fragile designs."
    ]),
    coreQuestion("Multiple inheritance in Java", "Medium", "Why does Java avoid multiple inheritance of classes but allow multiple interfaces?", [
      "Multiple class inheritance can create state and method ambiguity.",
      "Interfaces mainly define contracts and can be implemented multiple times.",
      "Default methods can conflict, but Java forces the implementing class to resolve conflicts.",
      "This keeps inheritance rules deterministic."
    ], [
      "Java supports multiple inheritance of type through interfaces.",
      "It does not support multiple inheritance of implementation through classes."
    ]),
    coreQuestion("Covariant return type", "Medium", "What is covariant return type in overriding?", [
      "An overriding method can return a subtype of the overridden method's return type.",
      "It improves type specificity without casting.",
      "Primitive return types are not covariant.",
      "Return type alone cannot overload methods."
    ], [
      "Only object return types can be covariant.",
      "Method parameters must still match for overriding."
    ], String.raw`class Animal {}
class Dog extends Animal {}

class Parent {
  Animal create() { return new Animal(); }
}

class Child extends Parent {
  @Override
  Dog create() { return new Dog(); }
}`),
    coreQuestion("private methods and overriding", "Medium", "Can private methods be overridden?", [
      "private methods are not inherited by subclass.",
      "A same-signature private method in subclass is a new method, not an override.",
      "Runtime polymorphism does not apply to private methods.",
      "Use @Override to catch wrong assumptions."
    ], [
      "@Override on a private-method attempt will fail.",
      "private methods are resolved inside the declaring class."
    ]),
    coreQuestion("final class, method, and variable", "Easy", "Explain final in three contexts.", [
      "final variable cannot be reassigned.",
      "final method cannot be overridden.",
      "final class cannot be extended.",
      "final reference can still point to a mutable object whose state changes."
    ], [
      "final does not mean immutable object.",
      "final methods can still be overloaded."
    ])
  ]),

  coreTopic("polymorphism-overloading-overriding", "Polymorphism, Overloading, Overriding", "Compile-time vs runtime binding, method hiding, overload resolution, variables, exceptions, and access rules.", [
    coreQuestion("Overloading resolution order", "Hard", "How does compiler choose an overloaded method?", [
      "Exact match is preferred.",
      "Then widening primitive conversion.",
      "Then boxing/unboxing.",
      "Then varargs.",
      "Most specific method wins; ambiguity causes compile-time error."
    ], [
      "Widening beats boxing.",
      "Varargs has lowest priority."
    ], String.raw`void m(long x) { System.out.println("long"); }
void m(Integer x) { System.out.println("Integer"); }

m(10); // long`),
    coreQuestion("Runtime polymorphism applies to methods only", "Medium", "Why are variables not polymorphic?", [
      "Instance method calls are dynamically dispatched based on runtime object.",
      "Fields are resolved by reference type at compile time.",
      "Static methods are also resolved by reference type.",
      "This is why overriding applies to instance methods, not variables."
    ], [
      "Field hiding is not overriding.",
      "Static method hiding is not runtime polymorphism."
    ], String.raw`class Parent {
  int x = 10;
  void print() { System.out.println("parent"); }
}
class Child extends Parent {
  int x = 20;
  void print() { System.out.println("child"); }
}

Parent p = new Child();
System.out.println(p.x); // 10
p.print();              // child`),
    coreQuestion("Static method hiding", "Medium", "Can static methods be overridden?", [
      "Static methods are hidden, not overridden.",
      "Method selection depends on reference type, not runtime object.",
      "A static method in subclass with same signature hides the superclass static method.",
      "Calling static methods through object references is legal but discouraged."
    ], [
      "Runtime dispatch does not apply to static methods.",
      "@Override is invalid for static method hiding."
    ]),
    coreQuestion("Overriding access and exception rules", "Hard", "What restrictions apply while overriding?", [
      "Access level cannot be reduced.",
      "Return type must be same or covariant.",
      "Checked exceptions cannot be broader than superclass method declaration.",
      "Runtime exceptions have no such restriction.",
      "private, static, and final methods cannot be overridden."
    ], [
      "You can throw fewer or narrower checked exceptions.",
      "You can remove throws clause entirely."
    ]),
    coreQuestion("null and overloaded methods", "Hard", "Which overload is selected for null?", [
      "null can match any reference type.",
      "Compiler chooses the most specific reference type.",
      "If two matching types are unrelated, the call is ambiguous.",
      "Cast null to choose a specific overload."
    ], [
      "null cannot match primitive parameters.",
      "String is more specific than Object."
    ], String.raw`void m(Object value) { System.out.println("Object"); }
void m(String value) { System.out.println("String"); }

m(null); // String`)
  ]),

  coreTopic("abstract-interface", "Abstract Classes and Interfaces", "Abstract methods, default methods, static interface methods, marker interfaces, functional interfaces, and conflict rules.", [
    coreQuestion("Abstract class vs interface", "Medium", "When should abstract class be preferred over interface?", [
      "Use abstract class when classes share state or common constructor logic.",
      "Use interface for capability contracts and multiple type inheritance.",
      "An abstract class can have instance fields and constructors.",
      "Interfaces can have public static final constants, abstract methods, default methods, static methods, private helper methods in newer Java."
    ], [
      "An abstract class can have zero abstract methods.",
      "Interfaces are not only for constants."
    ]),
    coreQuestion("Default method conflict", "Hard", "What happens if two interfaces provide the same default method?", [
      "If a class implements two interfaces with conflicting default methods, it must override the method.",
      "The class can choose one default using InterfaceName.super.method().",
      "Class methods always win over interface default methods.",
      "This rule prevents diamond ambiguity."
    ], [
      "The compiler does not silently pick one interface.",
      "A superclass concrete method has priority."
    ], String.raw`interface A { default void show() { System.out.println("A"); } }
interface B { default void show() { System.out.println("B"); } }

class C implements A, B {
  public void show() {
    A.super.show();
  }
}`),
    coreQuestion("Marker interface purpose", "Easy", "Why do marker interfaces exist?", [
      "A marker interface has no methods but marks a type with metadata.",
      "Serializable and Cloneable are classic examples.",
      "Runtime libraries can check marker type with instanceof.",
      "Annotations are often preferred for new designs."
    ], [
      "Serializable has no methods.",
      "Marker interface is a type-level signal."
    ]),
    coreQuestion("Functional interface rules", "Medium", "What makes an interface functional?", [
      "It has exactly one abstract method.",
      "Default and static methods do not count as abstract methods.",
      "Methods matching Object class public methods do not count.",
      "@FunctionalInterface is optional but recommended.",
      "Functional interfaces can be implemented using lambda expressions."
    ], [
      "Adding a second abstract method breaks lambda compatibility.",
      "@FunctionalInterface catches mistakes at compile time."
    ]),
    coreQuestion("Interface fields", "Easy", "What modifiers are applied to interface fields by default?", [
      "Interface fields are public static final by default.",
      "They must be initialized.",
      "They are constants, not instance state.",
      "Implementing classes do not get separate copies."
    ], [
      "Do not put mutable constants in interfaces.",
      "Interface constants can create poor coupling."
    ])
  ]),

  coreTopic("packages-access-modules", "Packages, Access Modifiers, Imports, Modules", "public, protected, default, private, static imports, package rules, and Java module basics.", [
    coreQuestion("Access modifier matrix", "Medium", "Summarize public, protected, default, and private access.", [
      "private: same class only.",
      "default: same package.",
      "protected: same package plus subclasses outside package with subclass reference rules.",
      "public: everywhere if the type is accessible."
    ], [
      "protected outside package is frequently misunderstood.",
      "Top-level classes can be public or default only."
    ]),
    coreQuestion("protected outside package", "Hard", "How can a subclass outside package access protected member?", [
      "Subclass outside package can access inherited protected member through current object or subclass reference.",
      "It cannot access protected member through superclass reference of another instance.",
      "Same package access is simpler and does not need subclass relation.",
      "protected is not the same as public to subclasses everywhere."
    ], [
      "Outside package, reference type matters.",
      "This is a classic exam/interview trap."
    ]),
    coreQuestion("Static import", "Easy", "What does static import do?", [
      "It imports static members so they can be used without class qualification.",
      "It can improve readability for constants or test assertions.",
      "Overuse reduces clarity and can cause name conflicts.",
      "It does not import instance members."
    ], [
      "import static java.lang.Math.* imports static Math members.",
      "Normal import imports types, not members."
    ], String.raw`import static java.lang.Math.max;

int value = max(10, 20);`),
    coreQuestion("Package declaration rules", "Easy", "Where must package and import declarations appear?", [
      "package declaration must be the first non-comment statement.",
      "import declarations come after package and before type declarations.",
      "Only one package declaration is allowed per source file.",
      "A source file can contain multiple top-level classes but at most one public top-level class."
    ], [
      "Public top-level class name must match file name.",
      "java.lang is imported implicitly."
    ]),
    coreQuestion("Java modules basics", "Medium", "What problem does the Java module system solve?", [
      "Modules provide strong encapsulation and explicit dependencies.",
      "module-info.java declares requires and exports.",
      "A package is visible to other modules only if exported.",
      "Modules help reduce classpath conflicts and improve reliable configuration."
    ], [
      "requires declares dependency on another module.",
      "exports exposes packages, not individual classes."
    ])
  ]),

  coreTopic("object-class-contracts", "Object Class Contracts", "equals, hashCode, toString, clone, getClass, finalization, identity, and mutable key traps.", [
    coreQuestion("equals and hashCode contract", "Hard", "What is the equals and hashCode contract?", [
      "If two objects are equal by equals(), they must have the same hashCode().",
      "If two objects have same hashCode(), they may or may not be equal.",
      "equals must be reflexive, symmetric, transitive, consistent, and false for null.",
      "hashCode must be consistent while fields used in equality do not change."
    ], [
      "Breaking the contract breaks HashMap and HashSet behavior.",
      "Do not use mutable fields as equality keys unless objects are not mutated while stored."
    ]),
    coreQuestion("Mutable key in HashMap", "Hard", "Why is mutable key dangerous in HashMap?", [
      "HashMap locates entries using hashCode and equals.",
      "If key fields used in hashCode change after insertion, lookup goes to the wrong bucket.",
      "The entry still exists internally but becomes difficult to find.",
      "Use immutable keys or do not mutate key fields while stored."
    ], [
      "The map does not automatically rehash mutated keys.",
      "This is a real production bug pattern."
    ]),
    coreQuestion("== vs equals()", "Easy", "Differentiate == and equals().", [
      "For primitives, == compares values.",
      "For references, == compares whether references point to same object.",
      "equals() is a method intended for logical equality.",
      "Classes must override equals() for value-based comparison."
    ], [
      "String overrides equals().",
      "Default Object.equals() behaves like reference equality."
    ]),
    coreQuestion("clone shallow vs deep copy", "Medium", "What is shallow clone and deep clone?", [
      "Shallow copy copies object fields as they are.",
      "Reference fields still point to the same nested objects.",
      "Deep copy also copies nested mutable objects.",
      "Cloneable is a marker interface; Object.clone() throws CloneNotSupportedException if not implemented."
    ], [
      "clone() design is considered awkward; copy constructors or factories are often cleaner.",
      "Shallow clone can share mutable state unexpectedly."
    ]),
    coreQuestion("finalize is unreliable", "Medium", "Why should finalize not be used for cleanup?", [
      "finalize execution is not guaranteed promptly or at all before program exits.",
      "It can delay garbage collection and create performance issues.",
      "It can accidentally resurrect objects.",
      "Use try-with-resources, Cleaner, or explicit close patterns instead."
    ], [
      "finalize is deprecated for removal in modern Java.",
      "Do not depend on GC for releasing external resources."
    ])
  ]),

  coreTopic("strings", "String, StringBuilder, StringBuffer", "String pool, immutability, intern, concatenation, builder classes, equality, and memory traps.", [
    coreQuestion("String pool vs new String", "Medium", "How many objects can be created by String s = new String(\"java\")?", [
      "The literal \"java\" is placed in the string pool if not already present.",
      "new String(\"java\") creates a separate heap object.",
      "So it can create one or two objects depending on pool state.",
      "The reference s points to the heap object, not the pooled literal."
    ], [
      "Do not always answer exactly two without considering existing pool state.",
      "String literals are interned."
    ], String.raw`String a = "java";
String b = new String("java");
System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true`),
    coreQuestion("Why is String immutable?", "Easy", "Give practical reasons for String immutability.", [
      "String literals can be safely pooled.",
      "String is safe as a key in hash-based collections.",
      "String is widely used in security-sensitive APIs such as class loading and file paths.",
      "Immutability helps thread safety and caching hash codes."
    ], [
      "String reference variables can change; String objects cannot.",
      "Concatenation creates new String objects unless optimized."
    ]),
    coreQuestion("StringBuilder vs StringBuffer", "Easy", "When should StringBuilder and StringBuffer be used?", [
      "StringBuilder is mutable and not synchronized.",
      "StringBuffer is mutable and synchronized.",
      "StringBuilder is preferred for single-threaded string building.",
      "StringBuffer is rarely needed unless shared mutable buffer must be synchronized."
    ], [
      "Synchronization does not make compound application logic automatically safe.",
      "Do not use string concatenation in large loops when builder is clearer."
    ]),
    coreQuestion("intern() behavior", "Hard", "What does String.intern() return?", [
      "intern() returns canonical pooled representation of the string.",
      "If an equal string exists in pool, that pooled reference is returned.",
      "Otherwise the string is added to the pool or its representation is used depending on JVM implementation.",
      "After intern(), == can be true when both references point to pooled canonical object."
    ], [
      "intern() can affect memory usage.",
      "Use equals() for normal string comparison."
    ]),
    coreQuestion("String concatenation trap", "Medium", "Predict == result with compile-time constants.", [
      "Compile-time constant string expressions are folded by compiler.",
      "Runtime concatenation creates a new String unless optimized in a way not visible by == contract.",
      "final primitive/String constants can participate in compile-time folding.",
      "Use equals() for content."
    ], [
      "final variable initialized with compile-time constant behaves differently from normal variable.",
      "== with strings tests reference."
    ], String.raw`String a = "ab";
String b = "a" + "b";
String x = "a";
String c = x + "b";

System.out.println(a == b); // true
System.out.println(a == c); // false`)
  ]),

  coreTopic("arrays-varargs-main", "Arrays, Varargs, Main Method", "Array covariance, defaults, jagged arrays, varargs ambiguity, main args, and heap pollution.", [
    coreQuestion("Array covariance", "Hard", "Why can String[] be assigned to Object[] and still fail later?", [
      "Java arrays are covariant.",
      "String[] is considered a subtype of Object[].",
      "Runtime array type is still String[].",
      "Storing a non-String through Object[] reference causes ArrayStoreException."
    ], [
      "Generics are invariant to avoid similar runtime failures.",
      "Array store checks happen at runtime."
    ], String.raw`Object[] values = new String[2];
values[0] = "ok";
values[1] = 10; // ArrayStoreException`),
    coreQuestion("Array default values", "Easy", "What are default values of array elements?", [
      "Numeric primitive arrays default to 0 or equivalent.",
      "boolean arrays default to false.",
      "char arrays default to '\\u0000'.",
      "Reference arrays default to null.",
      "Array local variable itself must still be initialized before use."
    ], [
      "Array elements get defaults even if array reference is local.",
      "The array object lives on heap."
    ]),
    coreQuestion("Jagged arrays", "Easy", "What is a jagged array?", [
      "A jagged array is an array of arrays where inner arrays can have different lengths.",
      "int[][] is not necessarily rectangular.",
      "Each row is a separate array object.",
      "Rows can be initialized independently."
    ], [
      "matrix.length gives number of rows.",
      "matrix[i].length can differ per row."
    ]),
    coreQuestion("Varargs rules", "Medium", "What are the key varargs rules?", [
      "Only one varargs parameter is allowed.",
      "It must be the last parameter.",
      "Inside method, varargs is treated as an array.",
      "Varargs has lowest priority in overload resolution."
    ], [
      "m(int...) and m(int[]) cannot coexist because they have same signature.",
      "Generic varargs can cause heap pollution warnings."
    ]),
    coreQuestion("Command line arguments", "Easy", "How does main receive command line arguments?", [
      "String[] args contains command line tokens passed after class name.",
      "All arguments are strings.",
      "The JVM does not automatically parse numeric values.",
      "args.length can be zero."
    ], [
      "Program name is not stored at args[0] in Java.",
      "Accessing args[0] without length check can fail."
    ])
  ]),

  coreTopic("exception-handling", "Exception Handling", "Checked vs unchecked, try-catch-finally, try-with-resources, suppressed exceptions, custom exceptions, and overriding rules.", [
    coreQuestion("Checked vs unchecked exceptions", "Easy", "Differentiate checked and unchecked exceptions.", [
      "Checked exceptions are verified by compiler and must be caught or declared.",
      "Unchecked exceptions are RuntimeException and Error subclasses.",
      "Unchecked exceptions usually represent programming bugs or unrecoverable conditions.",
      "Checked exceptions are used for recoverable external conditions."
    ], [
      "Exception itself is checked except RuntimeException branch.",
      "Errors should generally not be caught for normal recovery."
    ]),
    coreQuestion("finally execution guarantees", "Medium", "Does finally always execute?", [
      "finally executes after try/catch in normal control flow.",
      "It executes even when return or exception occurs, before method actually returns.",
      "It may not execute if JVM exits, process is killed, machine crashes, or thread is forcibly stopped.",
      "A return in finally can override earlier return or exception and should be avoided."
    ], [
      "System.exit() prevents normal finally execution.",
      "Never return from finally in production code."
    ], String.raw`static int value() {
  try {
    return 10;
  } finally {
    return 20;
  }
}

System.out.println(value()); // 20`),
    coreQuestion("try-with-resources", "Medium", "Why is try-with-resources preferred?", [
      "It automatically closes resources implementing AutoCloseable.",
      "Resources close in reverse order of creation.",
      "It reduces boilerplate and avoids leaks.",
      "Exceptions from close can become suppressed exceptions attached to the primary exception."
    ], [
      "Resource variable is effectively final inside try block.",
      "Close order is reverse declaration order."
    ]),
    coreQuestion("throw vs throws", "Easy", "Differentiate throw and throws.", [
      "throw is used inside method body to actually throw an exception object.",
      "throws is used in method declaration to declare possible exceptions.",
      "throw works with one exception object at a time.",
      "throws can list multiple exception types."
    ], [
      "throw new Exception() needs handling if checked.",
      "throws does not throw by itself."
    ]),
    coreQuestion("Exception rules in overriding", "Hard", "What exception changes are legal in overriding?", [
      "Overriding method cannot throw broader checked exceptions.",
      "It can throw narrower checked exceptions.",
      "It can throw fewer checked exceptions or none.",
      "Unchecked exceptions are unrestricted by overriding rules.",
      "This preserves substitutability of subclass objects."
    ], [
      "This rule applies only to checked exceptions.",
      "Constructors do not override."
    ])
  ]),

  coreTopic("collections-framework", "Collections Framework", "List, Set, Map, Queue, hashing, ordering, fail-fast behavior, comparators, and concurrent collection basics.", [
    coreQuestion("ArrayList vs LinkedList", "Easy", "When should ArrayList or LinkedList be used?", [
      "ArrayList stores elements in resizable array and gives fast random access.",
      "LinkedList stores nodes and gives efficient insertion/removal when node position is known.",
      "For most general use, ArrayList performs better due to cache locality.",
      "LinkedList also implements Deque."
    ], [
      "LinkedList random access is O(n).",
      "Removing from middle of ArrayList is O(n) due to shifting."
    ]),
    coreQuestion("HashMap internal working", "Hard", "Explain put/get in HashMap at expert level.", [
      "HashMap computes hash from key hashCode and spreads bits.",
      "Index is chosen from table size.",
      "Within bucket, equals() checks actual key equality.",
      "Collisions are stored in linked nodes or tree bins after threshold conditions.",
      "Resize rehashes distribution when load factor threshold is crossed."
    ], [
      "hashCode chooses bucket; equals chooses matching key inside bucket.",
      "Poor hashCode causes collisions and performance degradation."
    ]),
    coreQuestion("Fail-fast vs fail-safe", "Medium", "Why does ConcurrentModificationException happen?", [
      "Fail-fast iterators detect structural modification outside iterator and throw ConcurrentModificationException.",
      "ArrayList, HashMap, HashSet iterators are fail-fast best effort.",
      "Use Iterator.remove() for safe removal during iteration.",
      "Concurrent collections use weakly consistent iterators instead."
    ], [
      "Fail-fast is not guaranteed in all concurrent races.",
      "CopyOnWriteArrayList iteration sees snapshot."
    ], String.raw`List<Integer> list = new ArrayList<>(List.of(1, 2, 3));
for (Integer value : list) {
  if (value == 2) {
    list.remove(value); // may throw ConcurrentModificationException
  }
}`),
    coreQuestion("Comparable vs Comparator", "Easy", "Differentiate Comparable and Comparator.", [
      "Comparable defines natural ordering inside the class using compareTo.",
      "Comparator defines external ordering using compare.",
      "A class has only one natural order but can have many comparators.",
      "Comparator supports chaining and null handling helpers."
    ], [
      "compareTo/compare must be consistent with equals when used in sorted sets/maps unless intentionally designed otherwise.",
      "Returning subtraction can overflow; use Integer.compare."
    ]),
    coreQuestion("HashSet vs TreeSet vs LinkedHashSet", "Medium", "Compare major Set implementations.", [
      "HashSet gives no ordering guarantee and uses hashing.",
      "LinkedHashSet preserves insertion order.",
      "TreeSet keeps sorted order using natural ordering or Comparator.",
      "TreeSet operations are O(log n); HashSet average operations are O(1)."
    ], [
      "TreeSet may reject incomparable mixed types.",
      "TreeSet null behavior depends on Java version and comparator."
    ])
  ]),

  coreTopic("generics", "Generics", "Type erasure, invariance, wildcards, bounded types, raw types, heap pollution, and generic method design.", [
    coreQuestion("Type erasure", "Hard", "What is type erasure and why does it matter?", [
      "Generic type information is mostly removed at compile time.",
      "The compiler inserts casts and bridge methods where needed.",
      "Runtime usually cannot distinguish List<String> from List<Integer>.",
      "Erasure preserves backward compatibility with pre-generics bytecode."
    ], [
      "You cannot use instanceof List<String>.",
      "You cannot overload methods only by generic type parameter."
    ]),
    coreQuestion("Generics are invariant", "Medium", "Why is List<String> not a subtype of List<Object>?", [
      "Generics are invariant to preserve type safety.",
      "If List<String> were List<Object>, code could add Integer into it.",
      "Use wildcards for flexible APIs.",
      "List<? extends Object> can read as Object but cannot add arbitrary objects."
    ], [
      "Arrays are covariant; generics are invariant.",
      "This is a deliberate safety difference."
    ]),
    coreQuestion("PECS rule", "Hard", "Explain extends and super wildcard rule.", [
      "Producer Extends: use ? extends T when source produces T values.",
      "Consumer Super: use ? super T when destination consumes T values.",
      "With extends, reading as T is safe but adding T is not.",
      "With super, adding T is safe but reading gives Object."
    ], [
      "extends is not for adding values except null.",
      "super is ideal for copy destination."
    ], String.raw`static <T> void copy(List<? extends T> source, List<? super T> destination) {
  for (T item : source) {
    destination.add(item);
  }
}`),
    coreQuestion("Raw types", "Medium", "Why are raw types dangerous?", [
      "Raw types disable generic type checking.",
      "They can insert wrong element types into generic collections.",
      "The failure appears later as ClassCastException.",
      "Use parameterized types or bounded wildcards instead."
    ], [
      "Raw types exist for backward compatibility.",
      "Warnings should not be ignored casually."
    ]),
    coreQuestion("Generic arrays", "Hard", "Why cannot we create new T[] directly?", [
      "Generic type T is erased at runtime.",
      "Arrays need runtime component type for store checks.",
      "Creating new T[] would be unsafe because runtime does not know T.",
      "Use List<T>, array constructor references, or reflective Array.newInstance when needed."
    ], [
      "new List<String>[10] is also illegal.",
      "Generic array creation can lead to heap pollution."
    ])
  ]),

  coreTopic("nested-inner-classes", "Nested and Inner Classes", "Static nested classes, member inner classes, local classes, anonymous classes, captures, and this references.", [
    coreQuestion("Static nested vs inner class", "Medium", "Differentiate static nested class and non-static inner class.", [
      "Static nested class does not need an enclosing instance.",
      "Non-static inner class is tied to an outer object.",
      "Inner class can access outer instance members directly.",
      "Static nested class can access only static outer members directly."
    ], [
      "Use static nested class when outer instance state is not needed.",
      "Non-static inner classes can accidentally retain outer object."
    ]),
    coreQuestion("Anonymous inner class", "Easy", "When is anonymous inner class useful?", [
      "It creates a one-time implementation of interface or subclass.",
      "It can override methods inline.",
      "Before lambdas, it was common for callbacks.",
      "It can define extra members but they are not accessible through interface reference."
    ], [
      "Anonymous class creates a class, not just a method body.",
      "Lambda and anonymous class have different this semantics."
    ]),
    coreQuestion("Effectively final capture", "Medium", "Why must local variables captured by inner classes/lambdas be final or effectively final?", [
      "Captured local variables are copied into generated object state.",
      "Local variables live on stack and may disappear after method returns.",
      "Allowing mutation would create confusing synchronization and lifetime semantics.",
      "Effectively final means not reassigned after initialization."
    ], [
      "Object state referenced by captured variable may still mutate.",
      "The variable reference is effectively final, not necessarily the object."
    ]),
    coreQuestion("Outer this reference", "Medium", "How do you refer to outer object from inner class?", [
      "Use OuterClassName.this to refer to enclosing object.",
      "Use this for current inner object.",
      "This is useful when fields or methods have same names.",
      "Static nested classes do not have OuterClassName.this."
    ], [
      "Outer.this exists only for non-static nested classes.",
      "Name shadowing can make code hard to read."
    ]),
    coreQuestion("Inner class memory leak risk", "Medium", "How can inner classes cause memory leaks?", [
      "A non-static inner class holds implicit reference to outer object.",
      "Long-lived inner instances can prevent outer object from being garbage collected.",
      "Use static nested classes when outer state is not required.",
      "Be careful with listeners, callbacks, and background tasks."
    ], [
      "This is common in UI/event listener designs.",
      "Static nested class avoids implicit outer reference."
    ])
  ]),

  coreTopic("multithreading-fundamentals", "Multithreading Fundamentals", "Thread lifecycle, start vs run, synchronization, wait/notify, volatile, daemon threads, and deadlocks.", [
    coreQuestion("start() vs run()", "Easy", "What is the difference between calling start() and run()?", [
      "start() creates a new thread and then JVM invokes run() on that new thread.",
      "run() called directly executes like a normal method on current thread.",
      "start() can be called only once per Thread object.",
      "Calling start() twice throws IllegalThreadStateException."
    ], [
      "Direct run() does not start a new thread.",
      "Thread scheduling is controlled by JVM/OS."
    ]),
    coreQuestion("sleep() vs wait()", "Medium", "Differentiate sleep and wait.", [
      "sleep() pauses current thread for a time and does not release monitor lock.",
      "wait() releases monitor lock and waits until notify/notifyAll or timeout/interruption.",
      "wait() must be called inside synchronized context on the same monitor.",
      "sleep() is static method of Thread; wait() is method of Object."
    ], [
      "wait without synchronized throws IllegalMonitorStateException.",
      "Always wait in a loop checking condition."
    ]),
    coreQuestion("synchronized object lock vs class lock", "Medium", "Which lock is used by synchronized methods?", [
      "Synchronized instance method locks current object.",
      "Synchronized static method locks Class object.",
      "Synchronized block can lock any chosen monitor object.",
      "Different object locks do not block each other."
    ], [
      "static synchronized and instance synchronized do not use same lock.",
      "Lock private final objects to avoid external interference."
    ]),
    coreQuestion("volatile visibility", "Hard", "What does volatile guarantee and not guarantee?", [
      "volatile guarantees visibility of latest write to other threads.",
      "volatile prevents certain reordering around the variable.",
      "volatile does not make compound actions atomic.",
      "Use AtomicInteger or synchronization for increments."
    ], [
      "count++ is not atomic even if count is volatile.",
      "volatile is good for flags and safe publication patterns."
    ]),
    coreQuestion("Daemon threads", "Easy", "What is a daemon thread?", [
      "Daemon thread is a background service thread.",
      "JVM can exit when only daemon threads remain.",
      "Daemon status must be set before starting the thread.",
      "GC and background housekeeping threads are typical examples."
    ], [
      "Do not use daemon threads for critical work that must finish.",
      "setDaemon after start throws IllegalThreadStateException."
    ])
  ]),

  coreTopic("concurrency-utilities", "Concurrency Utilities", "ExecutorService, Future, Callable, locks, atomics, concurrent collections, latches, barriers, and thread pools.", [
    coreQuestion("ExecutorService over raw Thread", "Medium", "Why use ExecutorService instead of creating threads manually?", [
      "ExecutorService manages thread reuse and task queueing.",
      "It separates task submission from thread management.",
      "It supports graceful shutdown and result handling.",
      "Thread pools avoid unbounded thread creation overhead."
    ], [
      "Always shut down executors.",
      "Unbounded queues can still cause memory pressure."
    ]),
    coreQuestion("Callable vs Runnable", "Easy", "Differentiate Callable and Runnable.", [
      "Runnable.run() returns void and cannot throw checked exceptions directly.",
      "Callable.call() returns a value and can throw checked exceptions.",
      "ExecutorService.submit can accept both.",
      "Callable result is retrieved through Future."
    ], [
      "Future.get() blocks and wraps exceptions in ExecutionException.",
      "Runnable can still communicate through shared state, but that needs synchronization."
    ]),
    coreQuestion("ConcurrentHashMap", "Hard", "Why is ConcurrentHashMap better than synchronized HashMap for concurrent access?", [
      "ConcurrentHashMap allows concurrent reads and segmented/bin-level update coordination.",
      "It avoids locking the whole map for most operations.",
      "Its iterators are weakly consistent, not fail-fast.",
      "Compound operations should use atomic methods like compute, merge, putIfAbsent."
    ], [
      "size during concurrent updates can be approximate/expensive depending on version and contention.",
      "Multiple separate calls are not automatically atomic together."
    ]),
    coreQuestion("CountDownLatch vs CyclicBarrier", "Medium", "Compare CountDownLatch and CyclicBarrier.", [
      "CountDownLatch waits until a count reaches zero.",
      "CountDownLatch cannot be reset.",
      "CyclicBarrier waits until a fixed number of parties arrive.",
      "CyclicBarrier can be reused after all parties pass the barrier."
    ], [
      "Latch is one-shot.",
      "Barrier is for peer threads meeting at a common point."
    ]),
    coreQuestion("ReentrantLock vs synchronized", "Hard", "When is ReentrantLock useful?", [
      "ReentrantLock supports tryLock, interruptible lock acquisition, fairness option, and multiple Condition objects.",
      "synchronized is simpler and automatically releases lock on block exit.",
      "ReentrantLock must be unlocked in finally.",
      "Use synchronized unless advanced lock features are needed."
    ], [
      "Forgetting unlock causes serious deadlock.",
      "Fair locks can reduce throughput."
    ])
  ]),

  coreTopic("io-nio-serialization", "IO, NIO, Serialization", "Byte streams, character streams, buffering, Path/Files, serialization, transient, serialVersionUID, and resource handling.", [
    coreQuestion("Byte stream vs character stream", "Easy", "When should InputStream/OutputStream or Reader/Writer be used?", [
      "Use byte streams for binary data.",
      "Use character streams for text data with encoding.",
      "Reader/Writer convert bytes to characters using charset.",
      "Always specify charset for predictable text processing."
    ], [
      "Platform default charset can cause bugs.",
      "Do not read binary files with Reader."
    ]),
    coreQuestion("Buffered streams", "Easy", "Why use buffering in IO?", [
      "Buffering reduces expensive system calls.",
      "It improves throughput for many small reads/writes.",
      "BufferedReader adds convenient readLine for text.",
      "Flush output when data must be pushed immediately."
    ], [
      "close usually flushes, but explicit flush may be needed before close in interactive protocols.",
      "Buffering does not change file content semantics."
    ]),
    coreQuestion("Serialization transient and static fields", "Medium", "How do transient and static fields behave in serialization?", [
      "transient instance fields are not serialized and restore to default values.",
      "static fields belong to class, not object, so they are not part of serialized object state.",
      "serialVersionUID verifies class compatibility during deserialization.",
      "Custom writeObject/readObject can control serialization details."
    ], [
      "static value after deserialization is current class value, not saved object value.",
      "Sensitive fields should be transient or custom handled."
    ]),
    coreQuestion("serialVersionUID", "Medium", "Why declare serialVersionUID?", [
      "It identifies serialized class version.",
      "If stream UID and class UID differ, deserialization fails with InvalidClassException.",
      "Explicit UID prevents compiler-generated UID changes from breaking compatibility unexpectedly.",
      "It should change when serialized form becomes incompatible."
    ], [
      "It does not solve all compatibility problems.",
      "Changing field types can still break logic."
    ]),
    coreQuestion("NIO Path and Files", "Medium", "Why use java.nio.file APIs?", [
      "Path represents filesystem paths more flexibly than File.",
      "Files provides convenient static operations for reading, writing, copying, walking, and attributes.",
      "NIO supports better exception detail and symbolic link handling.",
      "It integrates with channels and non-blocking IO APIs."
    ], [
      "File is legacy but still widely seen.",
      "Always close streams from Files methods when they return streams."
    ])
  ]),

  coreTopic("enums-annotations-reflection", "Enums, Annotations, Reflection", "Enum internals, singleton enum, annotation retention, targets, reflection access, proxies, and metadata.", [
    coreQuestion("Enum constructor rules", "Easy", "Why cannot enum constructors be public?", [
      "Enum instances are fixed constants declared inside enum.",
      "The JVM controls enum instance creation.",
      "Enum constructors are implicitly private.",
      "You cannot create enum objects using new."
    ], [
      "Enum can have fields, methods, and constructors.",
      "Enum constants are created before static fields declared after them are used carefully."
    ]),
    coreQuestion("Enum singleton", "Medium", "Why is enum singleton robust?", [
      "Enum singleton is serialization-safe by default.",
      "It resists reflection-based multiple instantiation.",
      "The JVM guarantees one instance per enum constant per classloader.",
      "It is concise for simple singleton designs."
    ], [
      "Classloader boundaries can still create separate enum classes.",
      "Use normal classes when lazy initialization with dependencies is needed."
    ], String.raw`enum Database {
  INSTANCE;

  void connect() {
    System.out.println("connected");
  }
}`),
    coreQuestion("Annotation retention policies", "Medium", "Explain SOURCE, CLASS, and RUNTIME retention.", [
      "SOURCE annotations exist only in source and are discarded by compiler.",
      "CLASS annotations are recorded in class file but not necessarily available at runtime reflection.",
      "RUNTIME annotations are available through reflection.",
      "Choose retention based on who consumes the annotation."
    ], [
      "Reflection needs RUNTIME retention.",
      "Annotation target controls where annotation can be used."
    ]),
    coreQuestion("Reflection private access", "Hard", "Can reflection access private members?", [
      "Reflection can inspect metadata and invoke members.",
      "setAccessible(true) can suppress Java language access checks in many cases.",
      "Modules and security restrictions can block illegal reflective access.",
      "Reflection is powerful but slower and less type-safe than direct calls."
    ], [
      "Do not rely on reflective private access across module boundaries.",
      "Reflection can break encapsulation."
    ]),
    coreQuestion("Dynamic proxy", "Hard", "What is Java dynamic proxy used for?", [
      "It creates runtime implementation of interfaces.",
      "InvocationHandler intercepts method calls.",
      "It is used for AOP-like behavior, transactions, logging, and framework proxies.",
      "JDK dynamic proxy works with interfaces; class proxies need libraries or other mechanisms."
    ], [
      "JDK proxy cannot directly proxy concrete classes without interface.",
      "equals, hashCode, toString calls may also be intercepted."
    ])
  ]),

  coreTopic("jvm-memory-gc-classloading", "JVM Memory, GC, Class Loading", "Heap, stack, metaspace, classloaders, GC roots, references, memory leaks, and tuning-level interview concepts.", [
    coreQuestion("Heap vs stack vs metaspace", "Medium", "What is stored in heap, stack, and metaspace?", [
      "Heap stores objects and arrays.",
      "Each thread has stack frames for method calls, local variables, and operand stack.",
      "Metaspace stores class metadata in native memory in modern HotSpot JVM.",
      "Static fields are associated with class metadata but object values still live where their type requires."
    ], [
      "Local reference variable may be on stack; referenced object is on heap.",
      "Metaspace replaced PermGen in Java 8 HotSpot."
    ]),
    coreQuestion("GC roots", "Medium", "What are GC roots?", [
      "GC roots are starting points for reachability analysis.",
      "Examples include thread stack references, static fields, JNI references, and active monitors.",
      "Objects reachable from roots are live.",
      "Unreachable objects become eligible for garbage collection."
    ], [
      "Eligible does not mean immediately collected.",
      "Strong reachability prevents normal GC collection."
    ]),
    coreQuestion("Strong, soft, weak, phantom references", "Hard", "Compare Java reference types.", [
      "Strong references prevent collection.",
      "Soft references are cleared under memory pressure and are sometimes used for caches.",
      "Weak references are cleared eagerly once only weakly reachable.",
      "Phantom references are used with ReferenceQueue for post-mortem cleanup tracking."
    ], [
      "WeakHashMap keys are weakly referenced.",
      "PhantomReference.get() always returns null."
    ]),
    coreQuestion("Classloader hierarchy", "Hard", "Explain parent delegation model.", [
      "Classloaders usually delegate class loading request to parent first.",
      "Bootstrap loads core Java classes.",
      "Platform and application classloaders load broader platform and application classes.",
      "Parent delegation avoids duplicate core classes and improves security."
    ], [
      "Custom classloaders can break or customize delegation.",
      "Same class name loaded by different classloaders is treated as different type."
    ]),
    coreQuestion("Memory leak in Java", "Medium", "How can memory leaks happen in a garbage-collected language?", [
      "Leaks happen when objects are no longer useful but still reachable.",
      "Common causes include static collections, listener registrations, ThreadLocal values, caches without eviction, and non-static inner classes.",
      "GC cannot collect reachable objects.",
      "Use profilers, heap dumps, weak references, and explicit lifecycle cleanup."
    ], [
      "GC removes unreachable objects, not unused objects.",
      "ThreadLocal leaks are common in pooled threads."
    ])
  ]),

  coreTopic("java8-core-features", "Java 8 Core Features", "Default methods, functional interfaces, Optional, Date/Time API, method references, and stream laziness.", [
    coreQuestion("Default method purpose", "Medium", "Why were default methods added to interfaces?", [
      "They allow interfaces to evolve without breaking all implementors.",
      "They support behavior reuse in interface contracts.",
      "Classes can override default methods.",
      "Conflict rules keep multiple inheritance deterministic."
    ], [
      "Default methods should not turn interfaces into stateful base classes.",
      "Class method wins over interface default method."
    ]),
    coreQuestion("Optional best practices", "Medium", "How should Optional be used?", [
      "Use Optional mainly as a return type to represent possible absence.",
      "Avoid Optional fields and method parameters in most domain models.",
      "Use map, flatMap, filter, orElseGet, and orElseThrow to handle absence clearly.",
      "Do not call get() without checking presence."
    ], [
      "orElse evaluates fallback eagerly.",
      "orElseGet evaluates fallback lazily."
    ]),
    coreQuestion("Date/Time API improvements", "Easy", "Why is java.time preferred over Date and Calendar?", [
      "java.time classes are immutable and thread-safe.",
      "They model concepts clearly: LocalDate, LocalDateTime, Instant, ZonedDateTime, Duration, Period.",
      "They provide better timezone handling.",
      "They avoid many confusing legacy Date/Calendar behaviors."
    ], [
      "LocalDateTime has no timezone.",
      "Instant represents a machine timestamp."
    ]),
    coreQuestion("Method reference types", "Medium", "List major method reference forms.", [
      "Static method reference: ClassName::staticMethod.",
      "Instance method of particular object: object::instanceMethod.",
      "Instance method of arbitrary object of type: ClassName::instanceMethod.",
      "Constructor reference: ClassName::new."
    ], [
      "Method reference is shorthand for compatible lambda.",
      "Target functional interface decides the exact signature."
    ]),
    coreQuestion("Stream laziness", "Medium", "Why does a stream pipeline not run until terminal operation?", [
      "Intermediate operations are lazy.",
      "They build a pipeline description.",
      "A terminal operation pulls data through the pipeline.",
      "This enables short-circuiting and operation fusion."
    ], [
      "peek without terminal operation does nothing.",
      "Streams cannot be reused after terminal operation."
    ], String.raw`Stream<String> stream = Stream.of("a", "bb")
    .peek(System.out::println);

// Nothing printed yet
stream.count(); // prints values while terminal operation runs`)
  ]),

  coreTopic("modern-java", "Modern Java Essentials", "var, records, sealed classes, switch expressions, pattern matching, text blocks, and migration interview points.", [
    coreQuestion("var limitations", "Easy", "Where can var be used?", [
      "var can be used for local variables with initializer.",
      "It cannot be used for fields, method parameters, or return types.",
      "It cannot be initialized with null alone.",
      "The type is inferred at compile time and remains static."
    ], [
      "var is not dynamic typing.",
      "Use explicit types when readability suffers."
    ]),
    coreQuestion("Records", "Medium", "What does a record provide?", [
      "A record is a concise carrier for immutable-by-design data.",
      "It generates private final fields, accessor methods, constructor, equals, hashCode, and toString.",
      "Records are shallowly immutable; referenced mutable objects can still mutate.",
      "Records can have validation in compact constructors."
    ], [
      "Record accessors are name(), not getName() by default.",
      "Records cannot extend arbitrary classes."
    ]),
    coreQuestion("Sealed classes", "Medium", "Why use sealed classes?", [
      "Sealed classes restrict which classes can extend or implement them.",
      "They model closed hierarchies.",
      "Permitted subclasses must be final, sealed, or non-sealed.",
      "They improve exhaustiveness analysis with pattern matching/switch in newer Java."
    ], [
      "sealed is not same as final.",
      "All permitted subclasses must be known according to language/module/package rules."
    ]),
    coreQuestion("Switch expression", "Medium", "How is switch expression different from classic switch statement?", [
      "Switch expression returns a value.",
      "Arrow labels avoid accidental fall-through.",
      "yield is used to return a value from a block case.",
      "It improves exhaustiveness and readability."
    ], [
      "Classic colon switch can still fall through.",
      "Expression form must produce a value for all paths."
    ]),
    coreQuestion("Text blocks", "Easy", "What are text blocks used for?", [
      "Text blocks represent multi-line string literals.",
      "They reduce escaping for JSON, SQL, HTML, and templates.",
      "Indentation is normalized by compiler.",
      "They are still ordinary String objects."
    ], [
      "Be aware of incidental indentation.",
      "Trailing spaces need explicit handling."
    ])
  ]),

  coreTopic("tricky-output-best-practices", "Tricky Output and Best Practices", "Classic expert-level traps around equality, finally, NaN, BigDecimal, overloads, and API choices.", [
    coreQuestion("NaN comparison", "Medium", "Predict comparisons with Double.NaN.", [
      "NaN is not equal to anything using ==, including itself.",
      "Double.isNaN should be used to test NaN.",
      "Double.compare has defined ordering behavior for NaN.",
      "NaN usually represents undefined numeric result."
    ], [
      "x == Double.NaN is always false.",
      "Use Double.isNaN(x)."
    ], String.raw`double x = Double.NaN;
System.out.println(x == x);        // false
System.out.println(Double.isNaN(x)); // true`),
    coreQuestion("BigDecimal double constructor trap", "Medium", "Why is new BigDecimal(0.1) dangerous?", [
      "double 0.1 is not represented exactly in binary floating point.",
      "new BigDecimal(0.1) captures that inexact binary value.",
      "BigDecimal.valueOf(0.1) or string constructor gives expected decimal representation.",
      "Use BigDecimal(String) for exact decimal constants."
    ], [
      "This matters in money calculations.",
      "Do not use double for precise currency."
    ], String.raw`System.out.println(new BigDecimal(0.1));
System.out.println(BigDecimal.valueOf(0.1));`),
    coreQuestion("return in finally", "Hard", "What happens if finally returns a value?", [
      "finally executes after try/catch before method completes.",
      "A return in finally overrides return from try/catch.",
      "It can also hide exceptions thrown earlier.",
      "This is legal but dangerous and should be avoided."
    ], [
      "This can destroy debugging information.",
      "Static analysis tools usually warn about it."
    ]),
    coreQuestion("StringBuilder equality", "Easy", "Why does StringBuilder equality surprise people?", [
      "StringBuilder does not override equals for content equality.",
      "Its equals method is inherited from Object.",
      "Two builders with same text are not equal unless same object.",
      "Convert to String for content comparison."
    ], [
      "String overrides equals; StringBuilder does not.",
      "StringBuffer also does not provide content-based equals."
    ], String.raw`StringBuilder a = new StringBuilder("java");
StringBuilder b = new StringBuilder("java");
System.out.println(a.equals(b)); // false`),
    coreQuestion("Choose clarity over clever code", "Easy", "What is the best practice for tricky Java syntax in production?", [
      "Avoid expressions that depend on subtle evaluation order.",
      "Prefer readable control flow over clever one-liners.",
      "Use standard library utilities where they express intent clearly.",
      "Write tests for equality, concurrency, serialization, and collection contracts."
    ], [
      "Interview tricks are for understanding, not production style.",
      "Readable code wins over showing off syntax."
    ])
  ])
];
