---
title: Understanding Programming Languages
description: Notes on approaching a new PL
date: 2023-06-01
tags:
    - languages
---
## Motivation

- Understanding the principles that run across languages, appreciating which language features are best suited for which type of application and
  knowing how to craft interpreters that bring these languages to life : Essentials of programming languages.

- Programming languages shapes programming thought and how ideas and computations are expressed.

- Increased ability to express ideas
- Improved background for choosing appropriate languages
- Increased ability to learn new languages
- Better understanding of significance of implementation
- Better use of languages that are already known
- Overall advancement of computing

## Properties of PL.

- Syntax.
- Names.
- Type System.
- Semantics.
  - What do programs mean?
  - Correct reasoning about programs and interfaces.
- Idioms
  - What are typical patterns for using language features to express your computation?
- Memory model.
- Libraries
  - What facilities does the language provide as standard?
- Tools
  - What do language implementations provide to make your job easier?
- Evaluation Mechanism.
- Abstraction Mechanism.


## Language Features.

1. Garbage Collection
2. First-class functions.
3. Static type-checking.
4. Parametric Polymorphism
5. Immutable programming
6. Automatic type inference.
7. Algebraic data types.
8. Pattern matching.
9. Language Syntax.
10. Performance
11. Explicit memory management


- *What is the standard library of a language*

- *How do you know when a programming language is taking advantage of modern HPC*

- *What and How important are programming paradigms*

- *Regular vs Context-free languages*

- *Clear understanding of Static Analysis*

- *Cost of runtime safety checks and garbage collection*

- *What is hidden control flow??(someonefindmeziggg!)*

- Control Structures.
    - Direct sequencing.
    - Conditional branching.
- Iterations.
    - Bounded Iterations.
    - Conditional / Unbounded Iterations.
- Subroutines / Procedures.


## Tools

- Antlr - ANother Tool for Language Recognition.
    - Parser that automates the construction of language recognizers.


## Domain Specific Languages.

- Internal Dsl and External Dsl.
  - *identify areas ready for dsl application i.e sql,html,audio,js,*


## Taxonomy of safety violations

- Memory Access Errors.
  - Spatial Access Errors.
  - Temporal Access Errors.
- Type cast Errors.
- Memory Leak Errors 
  - Fail to release all the memory they allocate.


```eng

Defn:

A toolchain is a set of tools that are used in a chain with the purpose of compiling and running code written in
a specific programming language.

The C toolchain is a toolchain because in addition to the compiler, you also need the standard library which contains the implementations of standard functions in binary form (CPU instructions), 
the assembler, because technically the compiler outputs assembly language, which is a human readable format for the CPU instructions which is converted to the actual binary CPU instructions by the assembler (also called the object file),
and finally the linker which links the standard library, our object files and possibly other libraries together to form the final executable.

```

- Language design is difficult because of the extraordinary complex and unexpected interaction effects between all parts of the language,
  difficult to design and maintain a strict structuring discipline.

- Programming Languages should aid in program design, documentation and debugging.

- Types are the central organizing principle of the theory of pl, language features are manifestations of type structure.

- The syntax of a language is governed by the constructs that define its types and semantics by the interactions among those constructs.

- The concept of safety emerges as the coherence of the statics and dynamics of a language.

- Orthogonality - Small set of well thought features that can be combined in a logical way to supply more powerful building blocks.
  Ideally those features should not intefere with one another or hedged out via inconsistencies, exceptional cases and arbitrary restrictions. 


## Types of PL abstraction

- Data Abstraction
- Control Abstraction

## Levels of Abstraction

- Basic Abstraction - most localised machine information.
- Structured Abstraction - intermediate information about the structure of a program.
- Unit Abstraction - large scale information in the program.

  Imperative - sequence of statements that represent commands.


## Data models

- Each pl has its own data model and these differ from one another.
- The basic principle under which most pl deal with data is that each program has access to "boxes" which we can think of as regions of storage.
- Each box has a type...int, char.
- We may store in that box any value of the correct type for that box, data objects.
- We may also name boxes, any expression that denotes that box.
- Operations on data include arithmetic, accessing elements, dereferencing.


## What is the best programming language??

- *Insert shoe and car analogy.
- *Also insert good mechanic analogy.

### Expressions vs Statements

### Scopes and Shadowing

## Programming paradigm

- This is an approach to programming a computer based on a mathematical theory or a coherent set of principles.
- Each paradigm supports a set of concepts that makes it the best for a certain kind of problem.
- Different programming problems need different programming concepts to solve them cleanly and one or two paradigms do not contain the right concepts.

### Paradigm property

- Observable non-determinism
  - non-determinism is when the execution of program is not completely determined by its specification,
    i.e at some point during the execution the specification allows the program to choose what to do next.
  - During execution, this choice is made by a part of the runtime called the scheduler.
  - Non-determinism is observable if a user can see different results from executions that start at the same internal configuration.
  - Typical effect is race condition, happens when timing affects the choice made by the scheduler.
  - Observable non-determinism should be supported only if its expressive power is needed, i.e concurrent programming.
- Named State
  - Ability to remember information or more precisely to store a sequence of values in time.
  - It's expressive power is strongly influenced by the paradigm that contains it.
  - Axes of expressiveness, state is named or unnamed, deterministic or non-deterministic and sequential or concurrent, giving 8 combinations.

- Pick paradigm with just the right concepts. Too few and programs become complicated, Too many and reasoning becomes complicated. 
