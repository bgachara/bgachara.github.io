---
title: Program Analysis
description: notes
date: 2023-05-01
tags:
  - static analysis
  - dynamic analysis
---

## Motivation

- Fundamental knowledge in language, compiler and runtime implementation will help make better engineering decisions, everywhere.
- Compiler optimization trains in bit-fiddling as well as algorithmic thinking

## Approaches to Program Analysis

- Automated analysis of program behaviour, to find errors, optimize performance, find security vulnerabilities.
- Program Analysis cannot ensure termination, soundness and completeness
- Heartbleed vulnerability.
- Four main apporaches of PA:
  - Data Flow Analysis.
  - Constraint Based Analysis.
  - Abstract Interpretation.
  - Type and Effect Systems.

## Introduction

- Where is program analysis used
  - Compilers
  - Bug finding tools
  - Performance profilers
  - Code completion
  - Automated testing
  - Code Summarization/Documentation
  
- Static Analysis
  - `Lint, Coverity` - Suspicious error patterns
  - `Ms SLAM` - check API usage rules
  - `FB Infer` - Memory leak detection
  - `ESC/Java` - Verifying invariants
- Dynamic Analysis
  - `Purify` - Array bound checking
  - `Valgrind` - Memory leak detection
  - `Eraser` - Datarace detection
  - `Daikon` - Finding likely invariants

- Static Analysis:
    - Try to discover information about a program without running it.
    - Cost is proportional to program's size.
    - Is less effective as it may report spurious errors, false positives
- Dynamic Analysis:
    - Runs the program and collect information about events that took place at runtime.
    - Cost is proportional to program's run time.
    - Its unsound as it only examines a finite number of runs in terms effectiveness therefore it may miss some errors, false negatives

- Dynamic Analysis include
  - Profiling - execute and log events that happened at runtime. gprof
  - Test generation - produce tests that cover most of the program code. klee
  - Emulation - execute program in a virtual machine that takes care of collecting and analyzing data. valgrind
  - Instrumentation - augment the program with a meta-program that monitors its behviour. addressSanitizer.

- Static Analyses
  - Dataflow analyses
    - propagate information based on the dependencies between program elements, which are given by the syntax of the program.
  - Constraint-based analyses
    - we derive constraints from the program.Relations between these constraints are not determined explicitly by the program syntax
  - Type Analyses
    - propagate information as type annotations, allowing us to prove properties about the program such as progress and preservation. 

- Parts of a Static Analysis
  - Program representation
    - CFG, AST or bytecode
  - Abstract domain
    - how to approximate program values
  - Transfer functions
    - assignments, conditionals, merge points
  - Fixed-point computation algorithm
    - invoke transfer functions
    - iterative algorithms

- Soundness and Completeness in programs
  - false positives and false negative 
- Precision and Recall
  - true positives/ rejected and true positives/bad
- Undecidability of program properties
  - program analysis cannot ensure termination + soundness + completeness.
  - termination determines whether a good program analysis can be designed.

- Operational Semantics
  - what the program does, execution on an idealized machine.
- Denotational Semantics
  - What the program means
  - Mathematical object in some suitable semantic domain, function from states to states
- Axiomatic Semantics
  - What properties the program does.
  - Collection of logical properties afforded by a program, pre and post conditions.
  
- Program Invariants  
  - Loop Invarinats
    - a property of a loop that holds before and after each iteration
    - captures the essence of the loop's correctness and by extension of algorithms that employ loops.
  - Class invariants
    - a property that holds for all objects of a class
    - established upon the construction of the object and constantly maintained between calls to public methods

## Software specifications

- Specifications must be explicit.
  - Testing checks whether program implementation agrees with program spec.
  - Testing is a form of consistency checking between implementation and specification.
- Specs evolve over time.

- Classification of Testing Approaches
  - Manual vs Automated 
    - find bugs quickly
    - no need to write tests
    - no need to maintain tests when s/w changes
    vs
    - Efficient test suite
    - Potential better coverage
  - Black-box vs White-box
    - don't have to modify code
    - does not need to analyze or study code
    - code in any format
    vs
    - efficient test suite
    - potential better coverage.

- Classification of specifications
  - Safety properties
    - program will never reach a bad state
    - forms: 
      - Assertions, 
      - Types  
        - adding the specification to the implementation allows computer to check the imlementation against the specification.
        - *Checker framework
      - Type-state properties
        - refine types with finite state information.
        - enables to specify which operations are valid in each state and how operations affect the state.
        - also called temporal safety properties.
        - i.e acquire locks, file read after open, root privileges.
  - Liveness properties
    - program will eventually reach a good state
    - program termination, starvation freedom
  - Pre and Post conditions
    - A pre-condition is a predicate
      - assumed to hold before a function executes.
    - A post-condition is a predicate
      - expected to hold after a function executes whenever the precondition also holds.
    - Most useful if they are executable
    - Need not be precise.
  
- Houdini Algorithm
  - An annotation assistant for the static modular verifier.
  - Gnenerate many candidate invarinats and employ ESC/Java to verify or refute each
  - Different techniques for guessing invariants
    - Static analysis - mined from source code based on heuristics
    - Dynamic analysis(Daikon) - facts observed while running the program.
  - Workflow
    - Source -> Invariant Guesser -> Annotated source -> Invariant checker -> Invariant warnings -> Annotation Remover -> (Annotation Refutation Loop)
  - Pros
    - infers both loop invarinats and method contracts
    - infers the strongest invariant in the candidate set
    - easy to implement
  - Cons
    - only infers conjuctive invariants.
    - getting a high-quality invarinat rewuires aggressively many invariants which makes refutation process more expensive
    - no guarantee inferred invariants useful for verifying desired property.
    
- How good is your Test Suite
  - how do we know that our test suite is good??
    - too few tests: may miss bugs
    - too many tests: costly to run, bloat and redundancy, harder to maintain
  - Approaches
    - Code coverage metrics
      - metric to quantify the extent to which a program's code is tested by a given test suite.
      - given as percentage of some aspect of the program executed in the tests.
      - 100% coverage rare in practice
        - safety-critical code
      - Types
        - Function coverage
        - Statement coverage
        - Branch coverage
        - Line coverage
        - Condition coverage
        - Basic block coverage
        - Path coverage
    - Mutation Analysis
      - founded on competent programmer assumption, program is close to correct to begin with
      - Key idea
        - Test variations(mutants) of the program
      - If test suite is good, should report faied tests in the mutants.
      - Find set of test cases to distinguish original program from its mutants.
      - What if a mutant result is the same as the original??
    
## Data Flow Analysis

- Propagate analysis iformation along the edges of a control flow graph.
- Control Flow graph(CFG)
  - directed graph that summarises flow of control in all possible runs of the program.
  - Node represents statements in program.
- Abstract vs concrete states
- Abstract Domain
  - ordered in a lattice. 
- Goal
  - Compute analysis state at each program point
- For each statement, define how it affects the analysis state.

- Available expression analysis
  - for each program point, compute which expressions must have already been computed and not later modified.
    - useful to avoid re-computing an expression
    - used as part of compiler optimizations
- Transfer Functions
  - How a given statement affects the analysis state
  - analysis state = available expressions
- Two functions
  - gen: availabe expressions generated by a statement
    - gen: Stmt -> P(Expr)
    - a statement generates an available expression e if;
      - it evaluated e
      - it does not later write any variable used in e.
    - otherwise function returns empty set.
  - kill: availabel expressions killed by a statement.
    - a statemtn kills an availabel expression e if;
      - it modifies any of the variable used in e
    - otherwise, returns an empty set.
- Always start with a control flow graph of a program beofre dataflow analysis.
- Propagating Available Expressions
  - Forward Analysis
    - propagate available expressions in the direction of control flow
    - for each statement s, outgoing available expressions are: incoming avail. exprs. minus kill(s) plus gen(s)
    - when control flow splits, propagate available expressions both ways
    - when control flows merge, intersect the incoming available expressions.
- Data Flow equations
  - AE(entry)(s), AE(exit)(s)

### Define a Data Flow Analysis

- Defined by 6 properties
  - Domain
    - analysis associated some information with every program input
      - infomration means elements of a set
    - Domain of analysis: all possible elements the set may have.
      - for all availabe expressions analysis: domain is set of non-trivial expressions
  - Direction
    - analysis propages information along the control flow graph
      - forward analysis: normal flow of control
      - backward analysis: invert all edges(reasons about executions in reverse)
  - Transfer Function
    - defines how a statement affects the propagated information.
    - dfexit(s) = some finctions of dfentry(s()
  - Meet Operator
    - what if two statements s1,s2 flow to a statement s?
      - forward analysis: execution branches merge
      - backward analysis: branching point
    - meet operator defined how to combine the incoming information
      - union
      - intersection
  - Boundary Condition
    - what information to start with at the first CFG node?
      - forward analysis: first node is the entry node.
      - backward analysis: first node is exit node
    - common choices
      - empty set
      - empty domain
  - Initial values
    - what is the information to start with at intermediate nodes?
    - common choices
      - empty set
      - empty domain
      
### Reaching Definitions Analysis

- For each program point compute which assignments may have been made and may not have been overwritten.
- Define the 6 properties of this analysis
  - domain - definitions in the code
  - direction - forward
  - meet operator - union
  - transfer function; gen(s), kill(s)
  - boundary condition - entry node starts with all varibles undefined
- always start with CFG.

### Very Busy expression analysis

- For each program point, find expressions that must be very busy, on all future paths, expressions will be used before any of the variables in it are redefined.
- useful for program optimizations, hoisting
- hoisting an expression, pre-compute it. before entering a block for later use.  
- define all 6 properties of the analysis
  - domain: all non-trivial expressions in code
  - direction: backward
  - meet: intersection
  - transfer function: backwards analysis - returns expressions that are very busy expressions at entry of statement.
  - boundary conditions: final node starts with no very busy expressions
  - initial values: no very busy expressions

### Live Variable Analysis

- For each statement, find variables that are may be live at the exit from the statement
- "live" - variable is used before being redefined.
- useful for identifying dead code
  - bug detections: dead assignments are typically unexpected
  - optimizations: remove dead code.
- define all 6 properties of the analysis
  - domain: all varibales occuring in the code
  - direction: backward
  - meet operator: union
  - transfer function: backward - returns set of variables that are live at entry of statement
  - boundary conditions: final node starts with no live variables.
  - initial values: all nodes have no libe variables

### Solving Data flow equations

- Transfer functions yield data flow equations for each statement.
- Round-robin, iterative algorithm
- Work List Algorithm
  - will it always terminate?
  - impose constraints to ensure terminations
    - domain of analysis
    - transfer function and meet operator are monotonic wrt to partial order.

### Intra vs Inter-procedural

- Intra
  - reason about a function in isolation
- Inter-
  - reason about multiple functions
  - calls and returns
  - one cfg per fucntion
  - connect call sites to entry nodes of callee
  - conect exit code back to call site.
  - analysis considers only possible inter-proc flows
  - arguments passed into call
  - return values propagated to caller
  - local variables not propagated, instead continues with state just before call.

### Sensitivities

- What your program looksat during analysis
  - Flow-sensitive: 
    - Takes into account the order of statements.
  - Path-sensitive: 
    - Takes into account the predicates at conditional brancehs
  - Context-sensitive(intra-procedural): 
    - Takes into account the specific call site that leads into another function.

## Call Graph Analysis

- Abstraction of all method calls in a program
  - Nodes: Methods
  - Edges: Calls
  - Flow-insensitive: No execution order

- Here: Static call graph
  - abstract of all calls that may execute  
  - gives an overestimation of calls

- Prune graph
  - focus on feasible behavior
  - minimize
    - reachable methods
    - call edges
    - potentiall polymorphic call sites

### Call Graph Algorithms

- Class Hierarchy Analysis(CHA)
  - most simple analysis
  - for a polymorphic call site m() on declared type T:
    - call edge to T.m and any subclass of T that implements m.
  - pros
    - very simple
    - correct: contains edges for all calls that the program may execute
    - few requirements: needs only hierarchy, not other analysis information
  - cons
    - very imprecise: most edges will never be executed

- Rapid Type Analysis
  - Like CHA but, take into account only those types that the program actually instantiates.
  - Pros
    - still pretty fast
    - correct
    - much more precise thatn CHA. prunes nodes ad edges
  - Cons
    - does not reason about assignments

- Variable Type Analysis(VTA)
  - reason about assignments
  - infer what types the objects involved in a call may have
  - Prune calls that are infeasible based on the inferred types
  
  - Type propagation steps
    - Form initial conservative call graph
      - e.g CHA or RTA
    - Build type-propagation graph
    - Collapse strongly connected components
    - Propagates types in one iteration
  - How to represent fields in this analysis??
    - *
  - Pros
    - More precise than RTA
      - considers only those types that may actually reach the call site
    - Still relatively fast
  - Cons
    - Requires initial call graph
      - actually a refinement algorithm
    - Some imprecision remains
      - because of field-based analysis

- Declared-Type Analysis(DTA)
  - small brother to VTA
  - also reasons about assignments and how they propagate types
  - Not per variable but per type.
  - *steps like above*
  - Pros
    - faster than VTA
    - more precise than RTA
  - Cons
    - less precise than VTA

- Spark Framework 
  - RTA, DTA and VTA: instances of one single unifying framework
  - Genera Recipe
    - First build a pointer-assignment graph(PAG)
    - Propagate information via graph
  - Combine call graph construction with points-to analysis
    - Reason about objects a variable may refer to
  - Pointer-Assignment Graph
    - Nodes
      - Allocation
        - one for each new a()
        - represents a set of objects created here
        - has an associated type
      - Variable
        - one for each local variable, parameter, static field and thrown exception
        - represents a memory location holding pointers to objects
        - mat be typed(depends on setting)
      - Field reference
        - one fore each p.f
        - represents a pointer dereference
        - has a varibale node as its base
        - also models contents of arrays
    - Edges 
      - Allocation
        - represents allocation of an object assigned to a variable
        - p = new HashMap()
      - Assignment
        - represents assignment among variables and fields
        - also apply for those below (field store and field load)
      - Field store
      - Field load
  
  - Points-to sets
    - each variable, set of objects the variable may refer to
  
  - Subset-based analysis
    - allocation and assignment edges induce subset constraints
      - just because p = new 1; does not mean we dont have  p = new 2;
      - flow-insensitive
  - Introduce helper node: concrete fields
  - represents all objects pointed to by field f of all objects created at allocation site 
  
  - Iterative propagation algorithms
    - initialize according to allocation edges
    - repeat until no changes
      - propagate sets along assignment edges a-> b
      - for each load edge a.f -> b;
        - for each cpts(a) propagate pts(c.f) to pts(b)
      - for each store edge a -> b.f
        - for each cpts(b) propagate pts(a) to pts(c.f)
  - Spark framework supports many variants
    - just one allocation site per type
    - Fields simply represented by their signature
    - Equality instead of subsets for assignments
  
  - Pros
    - Generic algorithm where precision and efficiency can be tuned
    - Jointly computing call graph and points-to sets increases precision
  
  - Cons
    - Still flow-insensitive
    - Can be quite expensive to compute


## Random Testing and Fuzzing

- Manual Testing
  - important but limited by human time

- Automated Testing
  - Test execution
    - Regularly execute regression test suite
  - Test creation
    - Automatic test generation
  - Automated testing of programs is hard.
    - pathways through a program increases exponentially with number of branch points.
    - probably impossible for entire systems.
    
### Test creation
  
- Blackbox
  - No analysis of program

- Greybox
  - Lightweight analysis of program
  - e.g coverage achieved by inputs

- Whitebox
  - More heavyweight analysis of program
  - e.g conditions that trigger specific paths
  
- All of them use feedback from test executions
- Test across single functions, class and its fucntions, library or entire tool.

### Randoop 

- Based on Feedback-Directed Random Test Generation paper 2007
- Idea:
  - Guide randomized creation of new test inputs by feedback about execution of previous inputs
    - avoid redundant inputs
    - avoid illegal inputs
  - Test input here means sequence of method calls.
- Build test inputs incrementally.
  - new test inputs extend previous ones
- As soon as test input is created, execute it.
- Use execution results to guide generation
  - Away from redundant or illegal method sequences
  - Towards sequences tht create new object states
- Randoop: Input/Output
  - implementation of feedback-directed random test generation
  - Input
    - classes under test
    - time limit
    - set of contracts
      - method contracts, e.g throws no exception
      - object invariants, e.g 
  - Output
    - test cases with assertions
  
  - Algorithm spec
    - Initialize components
    - Pick a method
    - Check if there are arguments needed to call above method.
    - If not start a new sequence
    - Classify sequence
      - no contract violation
      - not redundant
    - Pick another method
    - Classify sequence
      - discard if one already exists
    - Pick another method
      - need sequence that constructs above method
      - look into available components and if there reuse sequence
    - Classify said method
      - add to set of components
    - Runs this until end of time period

- Redundant Sequences 
  - during generation, maintain a set of all objects created.
  - Sequence is redundant if all objects created during its execution are in the above set (using equals() to compare)
  - Could also use more sophisticated state equivalence methods
    - heap canonicalization(expensive)
    
- Test Oracles
  - oracle for contract-violating test cases
    - assertTrue(u.equals(u))
  - oracle for normal-behavior test cases
    - assertEquals(2, 1.size())

### Greybox Fuzzing

- Guide input generation toward a goal
  - Guidance based on lightweight program analysis

- Three main steps
  - Randomly generate inputs
  - Get feedback from test executions:
    What code is covered
  - Mutate inputs that have covered new code.

- American Fuzzy Lop
  - Simple yet effective fuzzing tool
    - targets c/cpp programs
    - imputs are files read by the program
  - Widely used in industry

- Algorithm
  - Queue of test inputs
  - Seed inputs
  - Choose next input
  - Mutate input - is interesting?? discard or enqueue

- Basic block CFG - sequence of operations/statements that are always executed together, no branch in between.
- Measuring coverage
  - Different coverage metrics
    - line/statement/branch/path coverage
  - Here: Branch coverage
    - branches between basic blocks
    - rationale: reaching a code location not enough to trigger a bug, but state also matters
  - Compromise between
    - Effort spent on measuring coverage.
    - Guidance it provides to the fuzzer.
  - Efficient implementations
    - Instrumentation added at branching points
      - cur_location
      - shared_mem[cur_location ^ prev_location]++
      - prev_location = cur_location >> 1;
  - Detecting New behaviors
    - inputs that trigger a new edge in the CFG considered as new behaviour
    - alternative: consider new paths
      - more expensive to track
      - path explosion
  - Edge Hit Couts
    - refinement if the previous definition of new behaviors
    - for each edge, count how often it is taken
      - approx counts based on buckets of increasing size.
  - Evolving the input queue
    - Maintain queue of inputs
      - initially see inouts provided by user
      - once used keep input if it cover new edges
      - add new inputs by mutating existing input
    - Queue sizes of 1k to 10k
  - Mutation Operators
    - Create new inputs from existing inputs
    - Random transformations of bytes in an existing input
      - Bit flips
      - Addition and substraction
      - Insertion
      - Splicing 
  - More tricks for Fast Fuzzing
    - Time and memory limits
      - discard input when execution is too expensive
    - Pruning the queue
      - periodically select subset of inputs that still cover every edge seen so far
    - Prioritize how many mutants to generate from an input in the queue
      - focus on unusual paths or try to reach specific locations
  
## Symbolic and Concolic Testing

- White box testing technique
- Reference papers
  - DART: directed automated random testing
  - KLEE: Unassisted and Automated Genereation of High Coverage Tests for Complex Systems, PROGRAMS
  - Automated Whitebox Fuzz Testing

- Symbolic Execution
  - Reason about behaviour of program by executing it with symbolic values.
  - Originally proposed by Jmes King and Lori Clarke
  - Became practical due to advances in constraint solving(SMT solvers)
  - Execution tree
    - Binary Tree
    - Nodes: Conditional statements
    - Edges: Execution of sequence on non-conditional statements
    - Each path in the tree represents an equivalence class of inputs
  - Symbolic values and Symbolic state
    - unknown values, user inputs are kept symbolically
    - Symbolic state maps variables to symbolic values  
  - Path conditions
    - quantifier-free formula over the symbolic inputs that encodes all branch decisions taken so far.
  - Satisfiability of Formulas
    - Determine whether a path is feasible: check if its path condition is satisfiable.
    - Done by powerful SMT/SAT solvers.
    - Z3, Yices, STP
    - For a satisfiable formula, solvers also provide a concrete solution.
  - Basic applications
    - Detect infeasible paths
    - Generate test inputs
    - Find bugs and vulnerabilities
  - Advanced Applications
    - Generate program invariants
    - Prove that two pieces of code are equivalent
    - Debugging
    - Automated program repair
  - Challenges of S.E
    - Loops and recursion: 
      - Infinite execution tree
      - Dealing with large execution trees
        - Heuristically select which branch to explore next
          - Select at random
          - Select based on coverage.
          - Prioritize based on distance to interesting program locations
          - Interleaving symbolic execution with random testing.
    - Path explosion
      - Apply same techniques as used above for loops and recursion to deal with large execution trees.
    - Environment modelling:
      - Deal with native/system/library calls
      - Program behavious may depend on parts of system not analyzed by symbolic execution.
      - Solution implemented by KLEE.
        - If all arguments are concrete forward to OS.
        - Otherwise provide models that can handle symbolic files with the gola of exploring all possible legal interactions with the environment.
    - Solver limitations: 
      - Complex path conditions
    - Heap modelling: 
      - Data structures and pointers
  
- Concolic Testing
  - mix concrete and symbolic execution = concolic
  - Perform concrete and symbolic execution side-by-side
  - Gather path constraints while program executes.
  - After one execution, negate one decision and re-execute with new input that triggers another path.
  - Path conditions determine the next execution path...negate last decision taken on a given path
  - Algorithm
    - repeat until all paths are covered
    - Execute program with concrete input i and collect symbolic constraints at branch points: C
    - Negate one constraint to force taking an alternative branch b'
    - Call constraint solver to find solution for C': New concrete input i'
    - Execute with i' to take branch b'
    - Check at runtime that b' is indeed taken otherwise divergent execution.
  - When symbolic reasoning is impossible or impractical, fall back to concrete values 
    - Native/system/api
    - Ops not handles by the solver
  - Large scale application of Concolic testinf
    - SAGE: concolic trsting tool developed at Ms.
    - Test robustness against unexpected inputs read from files
      - audio files
      - office documents
    - Start with known input files and handles bytes read from files as symbolic input
    - Use concolic execution to compute variants of these files.
    - Bounimova et.al paper Ms   


## Information Flow Analysis
  
- Reference papers
  - A Lattice Model of Secure Information Flow Denning, Comm ACM, 1976
  - Dytan: A Generic Dynamic Taint Analysis Framework, Clause et al, 2007
- Secure the data manipulated by a computing system
- Enforce a security policy
  - Confidentiality
    - secret data does not leak to non-secret places
  - Integrity
    - High-integrity data is not influenced by low-integrity data
- Goal
  - Check whether information from one place propagates to another place
    - place here means code location or variable
  - Complements techniwues that impose limits on releasing information
    - Access control lists
    - Cryptography  
- How to analyse the flow of information
  - Assign to each value some meta information that tracks the secrecy of the value.
  - Propagate meta information on program operations.
- Non-interference
  - Property that information flow analysis aims to ensure.
  - Confidential data does not interfere with public data.
    - Variantion of confidential input does not cause a variation of public output
    - Attacker cannot observe any difference between two executions that differe only in their confidential input.
- Information Level Policy
  - Lattice of security labels
    - How to represent different levels of secrecy??
      - Set of security labels
      - Form a universally bounded lattice.
    - Universally bounded lattice
      - Tuple of 6 elements(S set of security classes, 
              -> Partial order of security classes,
              Lower_bound 
              Upper_bound
              Least upper_bound - union of two pieces of security classes
              Greates lower_bound - intersection of security classes)
    - Information flow policy
      - Policy specifies secrecy of values and which flows are allowed
        - Lattice of security classes
        - Sources of secret information
        - Untrusted sinks
      - No flow from source to sink.
    - Declassification
      - No flow from high to low is impractical.
      - Eg hash value comparison*
      - mechanism to remove or lower security class of a value.
  - Analyzing information flows
    - given an information flow policy, analysis checks for policy violations
      - detect vulnerable code, SQL injections.
      - detect malicious code, privacy violations
      - check if program behaves as expected, secret data never written to console
    - Explicit vs Implicit Flows
      - Explicit: caused by data flow dependence
      - Implicit: caused by control flow dependence.
    - Static and Dynamic Analysis
      - Static information flow analysis
        - Overapproximate all possible data and control flow dependencies
        - Result: whether information may flow from secret source to untrusted sink
      - Dynamic information flow analysis
        - Associate security labels(taint markings) with memory locations
        - Propagate labels at runtime.
        - Tainted sources and sinks
          - Sources
            - Variables
            - Return values of a particular function
            - Data from a particular I/O stream
          - Sinks
            - Variables
            - Parameters given to a particular function
            - Instructions of a particular type(jump instructions)
        - Taint propagation
          - Explicit flows
            - For every operations that produes a new value, propagate labels of inputs to labels of output.
          - Implicit flows
            - Maintain security stack S: Labels of all values that influence the current flow of control
            - When x influences a branch decision at location loc, push label(x) on S
            - When control flow reaches immediate post-dominator of loc, pop label(x) from S
            - When an operation is executed while S is non-empty, consider all labels on S as input to the operation.
          - Hidden Implicit Flows
            - Implicit flows may happen even though a branch is not executed.
            - Approach explained so far will miss such hidden flows.
            - Tor eveal hidden flows: for every conditional with branches b1 and b2,
              - conservatively overapproximate which values may be defined in b1.
              - Add spurious definitions into b2.
      - Dytan
        - dynamic information flow analysis for x86 binaries.
        - *paper reference above.
      - There exists channels that information flow analysis may have missed, i.e power consumption, timing
      
### Program Slicing

- Reference papers
  - Program slicing,Weiser 1984
  - Thin Slicing, Sridharan 2007
  - Dynamic program slicing, Agrawal and Horgan 1990
  - A survey of program slicing techniques, 1995

- Extract an executable subset of a program that potentially affects the values at a particular program location
  - Slicing criterion = program location + variable
  - An observer focusing on the slicing criterion cannot distinguish a run of the program from a run of the slice. 

- Applications
  - Debugging: focus on parts of program relevant for a bug
  - Program understanding: Which statements influence this statement??
  - Change impact analysis: Which parts of a program are affected by a change? What should be retested?
  - Parallelization: Determine parts of a program that can be computed independently of each other.
- Forward vs backward
  - statements that are influenced by the slicing criterion vs statements that influence the slicing criterion
- Static vs dynamic
  - statically computing a minimum slice is undecidable
  - dynamically computed slice focuses on particular execution/input.

- Static program slicing
  - Weiser, 1984
  - Graph reachability problem based on program dependence graph.
  - P.D.G
    - Directed graph representing the data and control dependences between statements.
      - Nodes
        - Statements
        - Predicate expressions
      - Edges
        - Data flow dependences: one edge for each definition-use pair
        - Control flow dependences.
    - Variable Definition and Use
      - A variable definition for a varibale v is a basic block that assigns to v; can be local, global variable, parameter or property.
      - A variable use for a variable v is a basic block that reads the value of v; conditions, computations, output
    - Definition-clear paths
      - A definition-clear path for a variable v is a path n1...nk in the CFG such that n1 is a varibale definition and nk is variable use.
      - No other n1 between is a variable definition of n.
    - Definition-use pair
      - A DU-pair for a variable v is a pair of nodes(d, u) such that there is a definition-clear path d,...u in the CFG.
    - Control Flow dependencies
      - Post-dominator
        - n2 strictly post-dominates node n1 if every path n1,...exit in the CFG contains n2.
      - Control dependence
        - n2 is control-dependent on n1 not equal n2 if 
          - there exists a cf path P where n2 post-dominates any node in P
          - and n2 does not post-dominate n1.
      - Computing slices
        - all statements from which n is reachable.
- Thin slicing
  - Static slices are often very large.
    - Worst case: Entire program
    - Too large for common debugging and program understanding tasks
  - Main reason: Aims at an executable program but not needed for many tasks
  - Idead: Heuristically focus on statemented needed for common debugging tasks
    - Thin slice
  - Let user expand the thin slice on demand
    - Thin slices include producer statements but exclude explainer statements
      - Why do heap accesses read/write the same object??
      - Why can this producer execute?
    - Most explainers are not useful for common tasks.
    - Expose explainers on demand via incremental expansion.
  - Definition
    - Statement directly uses a memory location if it used it for some computation other than pointer dereference.
    - Dependence graph G for thin slicing: Data dependences computed based on direct uses only.
    - Thin slice: statements reachable from the criterion.

- Dynamic Slicing
  - Statements of an execution that must be executed to give a varibale a particular value.
    - For an execution, a particular input
    - SLice for one input may be different from slice for another inout
  - Useful in debugging: Get a reduced program that leads to the unexpected value.
  - Approaches
    - Simple Approach
      - given an execution history(sequence of pdg nodes that are executed), slice for statement n and variable v.
        - Keep PDG nodes only if there are in history
        - Use static slicing approach(graph reachability) on reduced PDG.
      - Limitations
        - Multiple occurences of a single statemtn are representated as a single PDG node
        - Difference occurences of a statemetn may have different dependences.
          - All occurences get conflated
        - Slices may be larger than necessary.
    - Dynamic dependence graph
      - Nodes: Occurences of nodes of static PDG
      - Edges: Dynamic data and control flow dependences
      - Slice for statement n and varibales V that are defined or used at n:
        - Compute nodes Sdyn that can reach ani of the nodes that represent occurences of n.
        - Slice = statements with at least one node in Sdyn
      - May yield a program that if executed with another input, does not give the same value for the slicing criterion that the original program
      - Instead: Focuses on isolating statements that affect a particular value, useful for debugging anf program understanding.
    - Check F Tip survey on slicing.
    
### Path Profiling

- Reference paper
  - Efficient path profiling, Ball and Larus, 1995
  - While program path Larus 1999
  - HOLMES: Effective statistical debugging via efficient path profiling, Chilimbi 2009.
  
- Goal:
  - Count how often a path through a function is executed.
  - Applications
    - Profile-directed compiler optimizations
    - Performance tuning: Which paths are worth tuning??
    - Test coverage: Which paths are not yet tested??
    - Statisitical debugging: Paths correlated with failure are more likely to contain the bug.
    - Energy analysis: Warn developers about paths and statements associated with high power consumption.
  - Challenges
    - Runtime overhead: limit slowdown of program
    - Accuracy: Ideall, precise profiles(no heuristics, no approximations)
    - Infinitely many paths
  - Start with CFG
  
- Edge Profiling
  - Instrument each branching point
  - Count how often each CFG edge is executed.
  - Estimate most frequent path: Always follow most frequent edge.
  - Simple, efficient but too local and hence fails to uniquely identify the most frequent path.
  
- Ball-Larus Algorithm for DAGs
  - assign a number to each path
    - Goal: Sum along a path yields unique number for path.
    - How: Associate with each node a value: NumPaths(n) = number of paths from n to exit
    - Compute Numpaths
      - Visit nodes in reverse topological order
      - If n is leaf node: NumPaths(n) = 1 else NumPaths(n) = sum of NumPaths of destination of outgoing edges
    - Enough to achieve precise goal
  - compute path number by incrementing a counter at branching points.
    - Goal: Minimize additions along edges.
    - Spanning Tree
      - Given graph G
      - Spanning tree T, undirected subgraph of G that is a tree and that contains all nodes of G.
    - Chord edges: edges in G but not in T    
    - Choose spanning tree with maximum edge cost
      - cost of individual edges is assumed to be known
    - Compute increments at the chords of the spanning tree, based on existing event counting algorithm.
    - Instrument subset of all edges.
    - Assumes to know/estimate how frequent edges are executed
  - Properties of path encoding
    - Precise: a single unique encoding for each path.
    - Minimal: Instruments subset of edges with minimal cost
  - Assumptions
    - Control flow graph is a directed acyclic graph.
    - n paths (numbered 0 to n-1)
    - Graph has unique entry and exit nodes
    - Artificial back edge from exit to entry.
  - Instrumentation
    - Basic Idea
      - Initialize sum at entry: r=0
      - Increment at edges: r+=
      - At exit, increment counter for path: count[r]++
    - Optimization
      - Initialize with incremented value, if first chord on path: r=..
      - Increment sum and counter for path, if last chord on path: count[r+..]++
  - Regenerating the Path
    - Knowing the sum r, how to determine the path?
      - Use edges values from step 1("non-minimal increments")
      - Start at entry with R = r
      - At branches, use edge with largest value v that is smaller than or equal to R and set R-=v

- Generalization of Ball-Larus to Cyclic CFGs
  - For each backedge n -> m, add dummy edges.
  - Remove backedges and add DAG-based increments
  - In addition, add instrumentation to each backedge
  - Leads to four kinds of paths
    - From entry to exit
    - From entry to backedge
    - From end of backedge to beginning of possibly another backedge
    - From end of backedge to exit
  - Full path information can be constructed from these four kinds.
   

### Concurrency

- Reference papers
  - Eraser: A dynamic data race detector for multithreaded programs, Savage, 1997
  - Fully automatic and precise detection of thread safety violation, Pradel, 2012
  - Finding and reproducing heisenburgs in concurrent programs, Musuvathi, 2008
  
- Concurrency needed to take advantage, full use of the hardware.
- Many real-world problems are inherently concurrent.
  - Servers must handle multiple concurrent requests
  - Computations done on huge data often are embrassingly parallel

- Concurrency styles
  - Message-passing
    - No shared memory
    - Actor concurrency model
  - Thread-based, shared memory
    - All threads access the same shared memory
    - Synchronize locks and latches

- Sequential consistency
  - Programs execute under sequential consistency
  - Program order is preserved: Each thread's instructions execute in the specified order
  - Shared memory ehaves like a global array: Reads and writes are done immediately
  - We assume sequential consistency for the rest of the text.
  - Many real-world platforms have more complex semantics("memory models")
  
- Data Races
  - Use locks that ensure accesses to shared memory do not interfere

- Dynamic Data Race detections
  - Look for unprotected accesses to shared memory.
  - All accesses to a shared memory location v should happen while holding the same lock L, consistent locking discipline
  - Dynamic analysis that monitors all lock acquisitions, lock releases and accesses of shared memory locations.
  - Uses Lockset Algorithm
    - Let locksHeld(t) be the set of locks held by thread t.
    - For each shared memory location v, initialize C(v) to the set of all locks
    - On each access to v by thread t, 
      - Set C(v):= C(v) intersection locksHeld(t)
      - If C(v) = empty issue a warning.
  - Simple lockset algorithm produce false positives
    - variables initialized without locks held
    - read-shared data read without locks held
    - read-write locking mechanisms(producer-consumer style)
  - Refinement of the lockset algorithm
    - Keep state of each shared memory location
    - Issue warnings only in the shared-modified state.
    - states: Virgin-> Exclusive -> Shred -> Shared-modified.
  - Assumes consistent locking discipline.
  - May miss data races because it does not consider all possible interleavings.
  - May report false positive

- Thread Safety
  - Popular way to encapsulate the challenges of concurrent programming: Thread-safe classes.
  - Class ensures correct synchronization
  - Clients can use instances as if they were alone
  - Rest of program can treat implemeantation of thread-safe class as a blackbox.
  - Correctness of program relies on thread safety of specific classes.
  - What if the class is actually not thread-safe??
  - ConTeGe - Concurrent Test Generator
    - creates multi-threaded unit tests
    - detects thread safety violations by comparing concurrent behavior against linearizations.
    - Algorithm
      - Create prefix
        - Instantiate CUT
        - Call methods(randomly)
      - Create suffixes for prefix
        - Call methods on shared CUT instance
      - Prefix + two suffixes  = test
  - Thread safety oracle
    - Focus on exceptions and deadlocks
    - Compare concurrent executions to linearization
    - Linearizations
      - Put all calls into one thread
      - Preserve order of calls within a thread.
    - Properties of the oracle
      - Sound but incomplete
        - All reported violations are real
        - Cannot guarantee thread safety
      - Independent of bug type
        - Data races
        - Atomicity violations
        - Deadlocks

- Interleavings
  - Scheduling Non-determinism
    - A single program executed with a single input may have many different interleavings
    - Scheduler decided interleavings non-deterministically
    - Some interleavings may expose bugs, others execute correctly(Heisenbugs)
    - How to explore different interleavings?? How to detect buggy interleavings??
  - CHESS in a nutshell
    - A user mode scheduler that controls all scheduling non-determinism
    - Guarantees:
      - Every program run takes a new thread interleaving.
      - Can reproduce the interleaving for every run
    - Systematic but non-exhaustive exploration of the set of possible interleavings.
    - Tree of interleavings
      - Search space of possible interleavings: represent as a tree
      - Node = points of scheduling decision
      - Edge = decisions taken
      - Each path = one possible schedule.
    - State space explosion
      - Number of interleavings: O(n^n.k), exponential in both n and k
      - Exploring all interleavings does not scale to large programs
    - Preemption Bounding
      - Limit exploration to schedules with a small number c of preemptions
        - Preemption = context switches forced by the scheduler
      - Number of schedules: O(n2.k)^c.n!)
        - exponential in c and n, but not in k
      - Based on empirical observation: Most concurrency bugs can be triggered with few(<2) preemptions.
    - Implementaion via binary instrumentation
    - Other ways to control scheduling
      - Randomly delay concurrency-related operations
      - Heuristics, known bug patterns or programmer annotations
      - Active testing, find potential bugs and then bia scheduler towards confirming them.