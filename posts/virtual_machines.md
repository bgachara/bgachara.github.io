---
title: Virtual Machines
description: Notes on Virtual Machines in all their forms.
date: 2023-04-01
tags:
  - virtual machines
  - languages
---
# Notes on Virtual Machine.

`programming language virtual machines need a page of their own.`
`Advanced design and Implementation of Virtual Machines`
`Virtual Machines: Versatile platforms for process and systems`

## Introduction

- What is the use and need of virtual machine?
  - A virtual machine is an indirection engine which redirects code and data inside of the "guest" sandbox.
  - Virtualisation differs from abstraction in that virtualization does not hide implementation details, details here being the same as in the underlying real system.
  - A discussion on virtual machines is also a discussion on computer architectures in a broader sense.
  - A virtual machine is implemented by adding a layer of s/w to a real machine to support the desired virtual machine architecture.
  - Computer architecture refers to the functionality and appearance of a computer system but not the details of its implementation.
  - It is formally described through a spec of an interface and the logical behaviour of resources manipulated via the interface.
  - A Vm can circumvent real machine compatibility constraints and hardware resoure constraints to enable a higher degree of software portability and flexibility.
  - A major consideration in constructing VMs is the fidelity with which a virtual machine implements architected interfaces. 
  - They help (computer) security, (application) productivity and (application) portability.
  - Necessary for safe languages: 
    - Memory safety - ensures that a certain type of data in memory follows restrictions on that type.i.e an array never out of bounds.
    - Operation safety - operations on the data follow said restrictions.
    - Control safety - flow of execution never gets stuck or run wild.
  - Provides management of code and data.
  - Application Programming Interface
    - key element is a standard library that an application calls to invoke various services available on the system, including those provided by the OS.
    - enables applications written to th API to be ported easily(via recompilation) to any system that supports the same API.
    - Specifies an abstraction of the details of implementation of services especially those involving privileged hardware.
  - A system is a full execution environment that can simultaneously support a number of processes potentially belonging to different users.
  - It is important to note that equivalent performance is usually not required as part of virtualization.
  - Virtualization thus consists of two parts;
    - Mapping of virtual resources or state i.e registers, memory, files to real resources in the underlying machine.
    - Use of real machine instructions and/or system calls to carry out the actions specified by virtual machine instructions and/or system calls.
  - General classifications
    - Process Vms
      - translates a set of OS and user-level instructions from one platform to another, forming a process vm capable of executing programs developed for a different OS and ISA.
      - virtualizing s/w is referred to as runtime, created to support a guest process and runs ontop of an OS.
      - multiprogramming can be thought of as virtualization, since each process is given illusion of having complete machine to itself.
    - System Vms
      - provides a complete system environment,support OS along with potential many user processes, providing guest OS withe access to h/w resources.
      - placed between underlying h/w and conventional s/w, allowing execution of system software developed for different h/w.
            
## Types of VMs

- Full Instruction Set Architecture(ISA) virtual machine.
  - provides a full computer system ISA emulation and virtualization.
  - ISA marks division between h/w and s/w
    - User ISA
      - parts of the ISA visible to an application program.
    - System ISA
      - parts of the ISA visible to supervisor s/w.
  - OS and applications can run as on an actual machine.
  - Most important feature is that they provide a secure way of partitioning major s/w systems that run concurrently on the same h/w platform.
  - Also the ability to support different operating systems.
  - Major feature provided by the VMM is platform replication, dividing a set of h/w resources among multiple guest OS environments, interecepting and implementing all guest OS actions that interact with h/w resources. 
  - VMM is placed on bare h/w and virtual machines fit on top of it and runs in the most priviliged mode with guests running with lesser.
  - Alternnatives include the hosted VM which is installed like regular application software, relying on OS to provide device drivers and other lower level services.
  - Inefficient as it introduces other layers leading to loss of efficiency.
  - VirtualBox and Qemu, Xen.

- Application Binary Interface(ABI) virtual machine.
  - ABI, provides a program with access to the hardware resources and services available in a system.
  - Has two components
    - Set of all user instructions
    - System call interface.
      - provide a specific set of operations that an operating system may perform on behalf of a user program(after checking to make sure user program has rights) 
      - implemented via an instruction that transfers control to the OS in a manner similar to a procedure or sub-routine call, except the call target address is restricted
        to a specific address in the OS.
      - Arguments for the system call are typically passed via registers and/or stack held in memory, following specific conventions that are part of the system call interface.
  - A program binary compiled to a specific ABI can run unchanged only on a system with the same ISA and OS.
  - provides a guest process ABI emulation.
  - apps against that ABI can run in the process side by side with other processes of native ABI apps
  - Most straightforward method of emulation is interpretation.
  - Interpreter program executing target ISA fetches, decoded and emulates execution of individual source instructions, can be relatively slow.
  - Binary translation is preferred where performance is key, blocks of source instructions are converted to target instructions that perform equivalent functions.
  - Hence some emulators called dynamic binary trnaslators. 
  - Interpretation and binary translation have different performance characteristics.
    - low startup overhead vs high startup overhead.
    - consumes significant time during emulation vs fast for each repeated instruction due to cache.
  - Some VMs use a staged emulation strategy combined with profiling, collection of statistics regarding program's behaviour.
  - Exist cases of VMs where instruction sets used by host and guest are the same and optimization of program binary is the primary purpose of the virtual machine, same ISA dynamic binary optimizers
  - Apple Rosetta translation layer for PowerPC emulation, Transmeta Code morphing for x86 emulation.
  
- Virtual ISA virtual machine.
  - provides a runtime engine so that applications coded in the virtual ISA can execute on it.
  - defines a high level and limited scope of ISA semantics, so it does not need the vm to emulate a full computer system.
  - VM contains an interpreter that takes each instruction, decodes it and then performs the required state transformations(memory and stack).
  - I/O functions are performed via a set of standard library calls that are defined as part of the VM.
  - May also be compiled to host machine code for direct execution.
  - Sun Microsystem JVM, Microsoft CLR.
  - Based on bytecodes, instructions encoded as a sequence of bytes where each byte is an opcode, a single-byte operandor part of a multibyte operand.
  - They are stack-based(to eliminate register requirements) and have an abstract data specification and memory model.

- Language virtual machine.   
  - A simulated computer that runs a simple instruction set.
  - provides a runtime engine that executes programs expressed in a guest language.
  - VM environment does not directly correspond to any real platform, rather it is designed for ease of portability and to match the features of a HLL used for application development.
  - Similar to process VMs, however focused on minimizing h/w-specific and OS-specific features because these would compromise platfrom independence.
  - can be categorized by the implementation of its execution engine: component that expresses the application operational semantics.
  - Interpretation and Compilation.
  - presented to the vm in the guest language, engine then interprets/translates program and also fulfill certain functionalities abstracted like memory management.
  - Advantage is that s/w is easily portable, once the VM is implemented on a target platform.
  - Runtime engines for Python, Ruby, Tcl.
  - Javascript Engines: Chrome(V8), Mozilla(SpiderMonkey), Safari(JavascriptCore), Microsoft(Chakra).
  - Android Java Vm: Dalvik(interpreter and just-in-time compiler), Android RunTime(ART)(Ahead-of-Time).
  - Apache Harmony

- Codesigned VMs
  - H/w optimization.
  - No native ISA applications, it is as if VM s/w is in fact part of the h/w implementation.
  - Very similar to purely h/w virtualization approach used in many high performance superscalar microprocessors
  - S/w portion of the vm uses region of memory not visible to other application or system s/w, carved out at boot time, occupied by the VMM.
  - Transmeta Crusoe.
  
  
## Core components

- Loader and Dynamic Linker
  - load application package into memor, parse package into data structures and load additional resources needed by the application.
  - data structures in memory have semantic meaning such as code and data.
  - reflection data or metadata is produced at load time that help vm understand application.
  - dynamic linker resolves all referenced symbols into accessible memory addresses, may trigger loader to load more data and code.
  - linker is a compile-time component while dynamic linker is a runtime component.

- Execution engine
  - performs the operations specified by the code and is the core component of the virtual machine.
  - can be implemented in interpreter or compiler or flexible hybrid.

- Memory manager
  - manage its data and the memory containing the data.
  - can be categorised by visibility to the application:
    - Virtual machine data: 
      - Vm needs memory to load application code and hold supporting data.
      - Data here is invisible to the application and necessary for the application execution.
    - Application data: 
      - Application needs storage for its static and dynamic data.
      - Visible to the application.
      - Dynamic data stored in the application heap.
  - Memory manager usually manages only the application data leaving the virtual machine data to internal or underlying system.
  - Memory manager component is always necessary and desirable for a virtual machine.

- Thread Scheduler
  - allows system to have multiple control flows.
  - straightforward way to provide multitasking, parallelization, and event co-ordination.
  - garbage collection helps execution engine use RAM resource whereas thread scheduler helps use the processor resource.

- Language Extension
  - Safe or High-level language depend on the vm to access low-level resources due to safety requirements.
  - Provided through:
    - Runtime services: 
      - profiling, debugging, exception/signal handling and interoperability.
      - can be provided via a client/server arch.
      - APIs, runtime objects, environment variables.
    - Language extension: 
      - runtime services may not be flexible enough and usually limited to specific features defined by the language spec and its execution model.
      - Foreign Function Interface can extend capabilities beyond current language spec and execution model.
      - Code can be inlined or embedded in the host language or invoked via a well wrapped function interface, object, module or class.
      - C the most popular foreign language due to its low-level nature.

### Traditional vs Virtual Machine model

- Traditional execution model
  - Need a compiler to translate source code into x86 machine code.
  - Linker to package the result into an executable.
  - When its executed, loader is needed to load files into memory and then a dynamic linker resolves all referenced symbols to memory addresses.
  - Finally, runtime services prepare runtime stack and execution context and then transfer program control to main() function as entry point to application.
  - This whole process decouples a language support into two stages: compile-time stage centered on compiler and runtime stage around an operating system.
  - In the case of an interpreter, such decoupling does not exist.
- Virtual Machine
  - Does everything at runtime.
- Hybrid systems bridge those two divides by compiling some code before-hand.


## Virtual ISA

- A language vm can implement an actual language or a virtual language.
- Virtual language is used as the compilation target of other language.
- Mostly used for intermediate representation purpose, hence not exactly readable.
- i.e Java bytecode, LLVM bitcode, ParrotVM bytecode.
- Assembly language may also be counted here.
- Virtual ISA is a kind of virtual language that defines the instruction set and execution model of a virtual machine.

### JVM

- JVM spec is not only a set of virtual instructions, but also the architectural models of an abstract computing machine, including execution, memory, threading and security model.
- JVm instruction opcodes are encoded in one byte, thus bytecode
- Opcode is the data that specifies the operation to perform by the instruction.
- A byte can encode 254 numbers, 198 are currently used. 51 unused and 3 reserved for JVM implementation's runtime services and should never appear in app code.
- Many other languages can be compiled into Java bytecode, thus run in JVM.
- Another way of running other languages in JVM is to develop their virtual machine in Java.

## Data Structures in VMs

- Core data structures: Object, Class and Virtual Function Table.
- It has two kinds of data types
  - Primitive types - hold a direct value, number, boolean, return address.
  - Reference types - hold a pointer to an object, which is a instance of reference type such as class or an array. 
- A class defines two parts of data:
  - Instance data - owned by every object individually, including object fields and virtual methods
  - Class data - shared by all instances of same class, static fields and static methods.
- Sample method description

```c

````

## Design of the Execution Engine

- Core component of the virtual machine and rest of components are supportive to the execution engine.
- Design of the execution engine largely dictates the design of a VM.
- Basic execution mechanisms are interpretation and compilation.

```bash

  Assuming a program P written in language L is compiled to machine code C,
  compile-time refers to the time when program P is compiled from L to C,
  and runtime refers to the time progam P is executed in the form of C

```

## Emulation: Interpretation and Binary Translation

- Emulation
  - process of implementing the interface and functionality of one system or subsystem on another one having a different interface and functionality.
- IS emulation is a key aspect of many virtual machine implementations because the virtual machine must support a program binary compiled for an instruction set that is
  different from the one implemented by the host processor.
- Source IS --- Target IS
- Complete ISA consists of many parts, register set, memory architecture, instructions and trap & interrupt architecture.
- IS emulation can be carried out using a variety of methods that require different amounts of computing resources and offer different performance and portability characteristics.
- I.e Interpretation and Binary translation.
- Threaded Interpretation
- Predecoding and Direct threaded interpretation
  - predecoding involves parsing an instruction and putting it in a form that simplifies interpretation.
  - extracts pieces of information and places them into easily accessible fields.
- RISC(regular instruction formats) vs CISC(wide variety of formats)
