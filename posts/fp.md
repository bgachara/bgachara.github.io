---
title: Functional Programming
description: Jab at FP
date: 2023-08-01
tags:
  - Haskell
  - FP
---
ref: `Haskell for Imperative programmers: Philipp Hagenlocher`
     `Haskell Beginners: chshersh`

## Introduction

- Declarative definitions of transformations as opposed to mutations.
- Problems are solved via composing.
- Chain of transformations over input.
- Desired outcomes
  - Pure (mathematical) functions
  - Immutable Data
  - No/Less side-effects
  - Declarative
  - Easier to verify
  - Lazy evaluated
  - Abstract Data Types

### Function definition

- name arg1, arg2, arg3 ... = <exp>
- functions have types
- let and where bindings...lazy evaluated
- can write functions in infix notation style

### Recursion

- there are no while and for loops, use recursion
- can use Guards in place of if...then

### Pattern matching

### Accumulators

### Lists and Tuples

- lists should be of the same type.
  - lists functions
- list comprehension
- tuple types don't have to be the same.

### Higher Order functions and Anonymous functions

- Map 
- functions that take in other functions as arguments.
- partial function application and currying
- function composition