---
title: Computational Structures
description: Bridge h/w to s/w
date: 2023-10-01
tags: 
  - computation
ref:
  - MIT 6.004
---

## Modules

- Digital design
  - Combinatorial and Sequential circuits
- Computer Architecture
  - Assembly language, processors, caches, pipelining
- Computer systems
  - operating systems, virtual memory, I/O
- Abstractions let us reason about behaviour while shielding us from the details of the implementation.
- Implementation technologies can evolve while preserving the engineering investment at higher levels
- E.g, Virtual machines, Instruction set + memory, Digital circuits, Bits and Logic gates.

### Role of Computer Architect

- Look backward(to the past)
  - Understand tradeoffs and designs, upsides/downsides, past workloads.
  - Analyze and evaluate the past.

- Look forward(to the future)
  - Be the dreamer and create new designs, listen to dreamers.
  - Push the state of the art.
  - Evaluate new design choices.

- Look up(towards problems in the computing stack)
  - Understand important problems and their nature.
  - Develop architectures and ideas to solve important problems.

- Look down(towards device/circuit technology)
  - Understand the capabilities of the underlying technology.
  - Predict and adapt to the future of technology(you are designing for N years ahead).
  - Enable the future technology.

- One needs to consider many things in designing a new system + have good intuition/insight into ideas/tradeoffs
- Problem ->Algorithm ->Program/Language ->Runtime System(VM,OS,MM) ->ISA(Architecture) ->Microarchitecture ->Logic ->Circuits ->Electrons
- Breaking the abstraction layers(between components and transformation hierarchy levels)and knowing what is underneath enables you to solve problems and 
  design better future systems.
- Cooperation between multiple components and layers can enable more effective solutions and systems.

## Reference Papers

- Memory Performance Attacks: Denial of Memory Service in Multi-Core Systems.
- Stall-Time Fair Memory Access Scheduling for Chip Multiprocessors
- Reducing Memory Interference in Multicore Systems via Application-Aware Memory Channel Partitioning.
- Retention Aware Intelligent DRAM refresh. 
- Memory Scaling A systems architecture perspective
- Improving DRAM performance by parallelizing refreshes with accesses.

## Digital Abstraction

- Microprocessors are the building blocks of computer systems, understanding them is crucial even if you don't like h/w.
- Designs are always expressed in a high-level programming which is compiled to generate circuit descriptions.
- Analog vs Digital systems
  - continuous signals vs discrete symbols
  - digital tolerate noise while analog noise accumulate
- Noise margins
  - A digital device accepts marginal inputs and provides unquestionable outputs(to leave room for noise)
  - digital systems are restorative.
  - cancelling nose requires active components, components that inject energy into the system.
  - noise margins should be positive.
- Voltage transfer characteristic
  - buffer: a simple digital device that copies its input value to its output.
  - vtc does not tell you anything about how fast a device is, measures static behaviour not dynamic behaviour.
- Digital circuits
  - combinational circuits
    - does not have memory
    - each output is a function of current input values.
    - Inverter, AND
  - sequential circuits
    - have memory
    - each output depends on current input and memory values.

## Combinational Devices

- This is a circuit element that has
  - one or more digital inputs
  - one or more digital outputs
  - a functional specification that details the value of each output for every possible combination of valid input values.
  - a timing specification consisting at a minimum  of a propagation delay, an upper bound on the required time to produce valid, stable output values 
    from an arbitarary set of valid, stable input values.
  - above referred to as static discipline.
- A set of interconnected elements is a combinational device if
  - each circuit element is combinational
  - every input is connected to exactly one output or to a constant(0 or 1)
  - the circuit contains no directed cycles.
- Functional specifications
  - Systematic approaches
    - Truth tables - enumerateoutput values for all possible combinations of input values.
      - Equivalence and normal form
        - Write a sum of product terms where each term covers a single 1 in the truth table, called the function's normal form.
        - Corollary, boolean expressions can represent any combinational function.
    - Boolean expressions - are equations containing binary variables and three operations, and, or, not
      - Duality principle, if a boolean expression is true then replacing 0 <--> 1 and AND <-->OR yields another expression that is true.
      - Boolean properties
        - Commutative
        - Associative
        - Distributive
        - Complements
        - Absorption
        - Reduction
        - DeMorgan's Law
  - Any combinational function can be specified as a truth table or Boolean expression.

- Boolean Algebra to Gates
  - Logic diagram represents a Boolean expression as a circuit schematic with logic gates and wires.
  - AND, NOT, OR are universal.
  - Straightforward Logic synthesis
    - We can implement any sum-of-products Boolean expression with three levels of gates, inverters, and, or
    - However, we can often implement same function with fewer gates.
  - A minimum sum-of-products is a sum of products expression that has the smallest possible number of AND and OR operators.
  - Reduction of terms
  - Use of dont care in the truth tables
  - Multi-level boolean simplification

- Logic Optimization
  - In practice, tools use boolean simplification and other techniques to synthesize a circuit that meets certain area, delay and power goals.
  - Synthesizing an optimized circuit is a very complex problem.
    - Boolean simplification
    - Mapping to cell libraries with many gates
    - Multidimensional tradeoffs.
  - Infeasible to do by hand, hence h/w designers write circuits in a HDL and use a synthesis tool to derive optimized implementations.
- Other Gates
  - XOR(Exclusive-OR)
  - NAND and NOR, inverting logic, universal too.
- Standrd Cell Library
  - Library of gates and their physical characteristics.
  - Observations
    - In current technology, CMOS, inverting gates are faster and smaller
    - Delay and area grow with number of inputs.
  - Design tradeoffs, delay vs size.
  
- Boolean Algebra and Arithmetic
  - Numbers can be represented in binary notation and arithmetic can be performed on binary numbers.
  - Binary arithmetic has one-to-one correspondence with Boolean algebra, thus all arithmetic operations can be expressed as Boolean or combinational circuits.  
  - Combinational logic for an adder
    - Half adder: adds two 1-bit numbers and produces a sum and a carry bit.
    - Full adder: adds two one-bit numbers and a carry and produces a sum bit and a carry bit
    - Cascade FAs to perform binary addition.
  - Describe 32-bit adder.
  - Muxes and Multiplexer.
    - if a and b are n-bit wide then this structure is replicated n times; s is the same input for all the replicated structures.
    - gate level implementations??
    - n -way mux can be implemented using n-1 two-way muxes.
  - Logical shifts
    - can get away with log n shifters, shift n can be broken down itno log n steps of fixed-length shifts of size 1, 2, 4
    - i.e for a 32-bit number, a 5-bit n can specify all the needed shifts.

- Binary Arithmetic
  - conversion from decimal to binary, subtract largest power of 2 until 0.
  - `Hexadecimal`, base-16, each group of 4 adjacent bits is encoded as a single hexadecimal digit.
- Binary Modular arithmetic
  - If we use a fixed number of bits, addition and other operations may produce results outside the range that the output can represent, `overflow`
  - Common approach
    - Ignore the extra bit, modular arithmetic, with N-bit numbers, equivalent to following all operations with mode 2^N, visually "wrap around".
- Encoding Negative Integers
  - We use sign-magnitude representation for decimal numbers, encoding the number's sign separately from its magnitude.
  - Circuits for addition and subtraction are different and more complex than with unsigned numbers.
- Two's complement encoding
  - The high-order bit of the n-bit representation has negative weight.
  - Negative numbers have 1 in the high-order bit.
  - Encodes negative integers while preserving the simplicity of unsigned arithmetic.
  - To negate a number, we invert all the bits and add one.
    - Why does this work??
- Binary multiplication is simply repeated addition.

- Design tradeoffs in hardware design
  - Each function allows many implementations with widely different delay, area and power tradeoffs.
  - Choosing the right algorithms is key to optimizing your design.
    - Tools cannot compensate for an inefficient algorithm.

- Carry-Select Adder trades area for speed.
- Carry-Lookahead Adders(CLAs), compute all carry bits in 0log n delay.
  - Transofrm chain of carry computations into a tree.
  - Useful beyond adders, computes any one-dimensional bianry recurrence in 0log n delay, comparators, priority encoders.
- Carry generation and propagation.
  - Generate and propagate compose hierarchically.
- Carry-lookahead adders perform addition with modest area cost, this technique can be used to optimize a broad class of circuits.
