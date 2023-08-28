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

## Digital Abstraction

- Microprocessors are the building blocks of computer systems, understanding them is crucial even if you don't like h/w.
- Designs are always expressed in a high-level programming which is compiled to generate circuit descriptions.
- Analog vs Digital systems
  - continuous signals vs discrete symbols
  - digital tolerate noise while analog noise accumulate
- Noise margins
  - a digital device accepts marginal inputs and provides unquestionable outputs(to leave room for noise)
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
- Functinal specifications
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
  
  
