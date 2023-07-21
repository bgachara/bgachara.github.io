---
title: Type Systems
description: Notes on type systems from the pierce book
date: 2023-07-01
tags:
  - type systems
  - pierce
  - PL
---

ref: `Type systems for PL`

## Introduction

- Core topics
  - simple type systems
  - type reconstruction
  - universal and existential polymorphism
  - subtyping
  - bounded quantification
  - recursive types
  - type operators
  
### What is it Catherine??

- Collections of rules for checking the consistency of programs.
- Typed vs Untyped and Strongly vs Weakly typed.
- Earliest type systems were used for numerical calculations, differentiate between natural number valued variables and arithmetic expressions allowing compilers
  to use different representations and generate appropriate machine instructions for arithmetic expressions.
- Classification extended to structured data(arrays, records) and higher-order functions, including
  - parametric polymorphism - single term used across different types. i.e sorting
  - module systems - define interfaces between parts of a large program.
  - subtyping and object types
  - specification languages and formal logics.

### Applications of Type systems

- Compiling and Optimization(static analyses)
- Proof-carrying code
- Security
- Theorem proving
- Databases
- Y2K conversions
- Verify protocols

 
