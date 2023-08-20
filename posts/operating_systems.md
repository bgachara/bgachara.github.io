---
title: Operating Systems
description: Reference notes on Operating system
date: 2023-06-01
tags:
  - operating system
  - linux
ref:
  - Modern Operating Tanenbaum
---

ref:
`Notes from Modern operating systems by Tanenbaum`
//`Windows Fundamentals Notes from Reversing - Secrets of Reverse Engineering`
//`CS162 Youtube - John Kubiatowicz`
//`Operating Systems: Three Easy Pieces`
//`Linux system programming`
//`Linux Kernel Development`

*the concepts and design patterns appear at many levels*
*the better you understand their design and implementation, the better use you'll make of them*

## Introduction

- Primary job is provide user programs with a better, simpler, cleaner model of the computer and handle all the resources.
- Resources include: processors, main memory, disks, printers, display, network interfaces and other i/o devices.
- Most computers have two modes of operation: Kernel mode and User mode.
- OS runs in kernel mode(supervisor mode): has access to all h/w and can execute any instruction.
- Abstraction is the key to managing complexity.
- Good abstraction turn nearly impossible tasks into two manageable ones
    - First one is defining and implementing the abstractions.
    - Second one is using abstractions to solve the problem at hand.
- One abstraction every computer user understands is the file.
- The job of the OS is to create good abstractions and then implement and manage the abstract objects thus created.
- The trick in resolving tension between simple and complex interfaces is rely on mechanisms that can be combined to provide generality.
- Abstraction provider definition the OS can be thought of as the top-down view and alternative bottom-up view would be of resource manager.
- Resource management includes multiplexing(sharing) resources in two different ways: in time and in space.
- Spooling(Simultaneous Peripheral Operation On Line)
- Multics(Multiplexed Information and Computing Service)
- Unix
- Posix - standard of Unix that defines a minimum system call interface that conformant Unix systems must support.


## Computer Hardware

- Processor 
  - fetch, decode, execute cycle.
  - introduction of pipelines for more work.
  - superscalar CPU.
  - Different register types.
  - Moore's Law - transistor doubling every 18 months.
  - Multithreading/ Hyperthreading - each thread appears to the CPU as a separate CPU.
  - Multicore chips.

- Memory 
  - Design constraints on computer memory can be summed up by 3 questions
    - How much? 
    - How fast?
    - How expensive?
  - To achieve great performance, the memory must be able to keep up with the processor.
  - There is a trade-off among the 3 key characteristics of memory namely: capacity, access time, cost.
  - constructed as a hierarchy of layers, to overcome design dilemna across the characteristics.
  - register -> cache -> main memory -> magnetic disk
  - locality of reference
  - questions to every cache situation:
    - when to put new item in cache.
    - which cache line to put new item in.
    - which item to remove from cache
    - where to put newly evicted item in main memory

- I/O Devices 
  - consist of the controller and the device itself.
  - controller is a chip or set of chips that physically controls the device...accepts commands from the OS.
  - Many different types of I/O
    - Process management - concurrency, multitasking - Architecture dependent Code
    - Memory management - virtual memory - Memory manager
    - Filesystems - files and dirs, vfs - File system types / Block Devices
    - Device control - tty and device access - Device control
    - Networking - connectivity - Network subsystem / IF drivers
  - Internal OS file description
    - Internal Data structure describing everything about the file.
      - Where it resides
      - Its status
      - How to access it.
  - Pointer strcut file *file
    - everything accessed with file descriptor has one of these
  - Struct file_operations *f_op
    - describes how this particular device implements its operations
      - for disks: points to file operations
      - for pipes: points to pipe operations
      - for sockets: points to socker operations
    - associated with partocular h/w device or environment
    - registers/ unregisters itself with the kernel
    - handler functions for each of the file operations    
  - Device driver is s/w that talks to a controller, giving commands and accepting responses.
  - To be used, device driver has to be put into OS so as to run in kernel mode.
  - Speial device-specific configuration supported with the ioctl() system call.
  - Can run in user mode but rarely is this as its a feature where access in a controlled way is required.
  - device registers form the I/O port space.
  - Device drivers typically divided into two pieces
    - Top half: accessed in call path from system calls
      - implements a set of standard, cross-device calls like open(), close(), read(), write(), ioctl(), strategy()
      - This is the kernel's interface to the device driver.
      - Top half will start i/o to device, may put thread to sleep until finished
    - Bottom half: run as interrupt routine
      - Gets input or transfers next block of output.
      - May wake sleeping threads if I/O now complete
  - I/O implemented in three ways
      - Busy waiting.
      - Interrupts.
      - Direct Memory Access.

- Buses 
  - As processors and memories got faster, ability of one bus became strained and thus more were added.
  - i.e : cache, local, memory, PCI, USB, IDE, SCSI and ISA.
  - Bask Input Output System (BIOS)
  - contains low-level i/o software i.e read keyboard, write to screen, disk i/o.
        

### Booting up computer

- A bootloader is a small program responsible for loading the kernel of an OS.
- BIOS started.
- Legacy mode vs EFI mode.
- BIOS contains routines to assist our bootloader in booting our kernel.
- BIOS is 16bit code meaning only 16 bit code can execute in it properly.
- Checks to see how much RAM is installed and whether basic devices are installed and responding correctly.
- Starts by scanning ISA and PCI buses to detect devices attached to them.
- If new devices from last boot, new devices are configured.
- Determines boot device by checking list of devices stored on CMOS.
- User can change this list by entering new device into list.
- First secto from boot device is read into memory and executed.
- Examines partition table at the end of boot sector to determine which partition is active.
- Secondary boot loader is read in from that partition.
- Reads in the OS from active partition and start it.
- OS queries the BIOS for configuration info.
- For each device it checks to see if it has the device driver.
- Loads them into kernel once it has all of them.
- Initializes the tables, creates necessary background processes and starts login program.


## Operating system ZOO

- Mainframe OS
- Server OS
- Multiprocessor OS.
- Personal computer OS.
- Handheld compuer OS
- Embedded OS. .QNX,VxWorks
- Sensor Node OS. .TinyOS
- Real-time OS. .e-Cos
- Smart card OS.


- System software lives at the lowe level interfacing directly with the kernel and system libraries.
- System programmer must have acute awareness of the hardware and operating system in which they work.
- High-level libraries abstract away the details of the hardware and operating systems

## Operating system concepts

### Process

- a program in execution, object code in execution
- associated with each process is its address space, a list of memory locations  from 0 to some maximum which can read and write to.
- Address space contains executable program, program's data, and its stack.
- also with each process is some resources, registers(program counter and stack pointer), open files, outstanding alarms, related processes and any other info needed to run program
- A process is thus a container with all information needed to run a program.
- Process starts life as an executable object code, which is a machine-runnable code in executable format that the kernel understands(ELF)
  - most important sections are the text section, bss section and data section.
- In many OS, all info on any process, other than content of its own address space is stored in a process table, which is an array of structures, one for each process in existence.
- A suspended process consists of its address space and its process table entry.
- Each person on a system has a UID which is attached to every process they start.
- They request and manipulate resources only via system calls.
- A process resources, along with the data and statistics related to it are stored in the kernel inside the process pd.
- Kernel seamlessly and transparently preempts and reschedules processes, sharing system processors among all processes.
- All processes in the system are created by other processes.
- Process management API
  - exit
  - fork
    - copy the current process.
    - new process has different pid
    - new process contains a single thread.
  - exec
    - change the program being run by the current process
  - wait
    - wait for a process to finish
  - kill
    - send a signal to another process
  - sigactions
    - set handlers for signals.

- Threads
  - unit of activity within a process
  - A single unique execution context.
  - It provides the abstraction of: A single execution sequence that represents a separately schedulable task.
  - abstraction responsible for executing code and maintaining the process running state.
  - a process can be single threaded or multi-threaded.
  - consists of a stack(stores local variables), processor state and a current location in the object code(stored in processor instruction pointer)
  - majority of other parts of a process are shared among threads, most notable process address space.
  - threads share virtual memory abstraction hwile maintaining the virtualized processor abstraction.
  - Threads are a mechanism for concurrency(overlapping execution), however they can also run in parallel(simultaneous execution).
  - Motivation
    - OS has to handle multiple things at once.
      - Networked servers
      - Parallel programs.
      - User Interface.
  - Concurrently
    - Scheduler is free to run threads in any order and interleaving.
    - May run to completion or time-slice in big chunks or small chunks.
    - `Have to think about correctness`
  - Parallelism
    - Doing multiple things simultaneosly.
  - Thread mask i/o latency
  - It can be in one of 3 states
    - Running
    - Ready 
    - Blocked - ineligible to run, waiting on i/o to finish.
  - OS library API for threads: pthreads
    - man pthread.
  - Fork-Join pattern
  - Thread State
  - Correctness with concurrent threads
    - Non-determinism
    - Independent threads
    - Cooperating threads.
    - Goal: correct by design.
  - Rcae conditions
  - Synchronization
    - coordination among threads, usually regarding shared data.
  - Mutual exclusion
    - ensuring only one thread does a particular thing at a time.
    - type of synchronization
  - Critical section
    - code exactly one thread can execute at once.
    - result of mutual exclusion
  - Lock
    - an object only one thread can hold at a time.
    - provides mutual exclusion
    - two atomic operations
      - Lock.acquire
      - Lock.release
    - pthreads have locks i.e mutex.
  
- Process hierarchy
  - each process has a unique PID, starting from 1 and all others following from that.
  - in linux they form a strict hierarchy, known as a process tree, rooted at the init process.
  - new processes are created via the fork() system call, which creates a duplicate of the calling process.
  - when a process is terminated it is not immediately removed from the system, kernel keeps parts of the process resident in memory to allow process parent to inquire about its status upon terminating, waiting on the process.
  - non-waited on processes are called zombie processes.

### Address spaces

- Holds executing program.
- On many computers addresses are 32 or 64 bits, giving address space of 2^64 bytes.
- Virtual memory augments processes where their address space is larger than what is available.

### Files

- most basic and fundamental abstraction in Linux.
- System calls needed to create files, remove files, read files and write files.
- Directory used to group files together.
- Before file manipulation, it must be opened, at which time permissions are checked, if permitted, file descriptor returned else error code.
- An ope file is referenced via a unique descriptor, a mapping from the metadata associated with the open file back to the specific file itself, fd.
- Large part of linux system programming consists of opening, manipulating, closing and otherwise using file descriptors.

- Regular file
  - contains byes of data organized into a linear array called a byte stream.
  - any of the bytes can read from or written to.
  - operations start at a specific byte, which is one's conceptual location in the file, file position or file offset.
  - file position is an essential piece of metadata that kernel associates with each open file
  - writing a byte to the middle of a file overwrites the byte previously located at that offset, thus not possible to expand a file by writing in the middle of it.
  - size of a file measured in bytes is called its length.
  - file's length can be changed via operation called truncation.
  - a single file can be opened more than once, by a different or even the same process, which receives a unique file descriptor
  - processes can share their fd
  - kernel does not impose any restrictions on concurrent file access.
  - user space programs mustcoordinate among themselvesto ensure proper synchronization
  - A file is referenced by an inode, uniwue to the filesystem
  - inode stores metadata associated with a file, modification timestamp, owner, type, length and location of the file's data but no filename.
  - inode is both a physical object located on disk in Unix style fs and also a conceptual entity represented by a data structure in the kernel.
  - accessing a file through its inode is cumbersome and potential security hole so files are always opened form userspace by a filename.
  - Directories are used to provide names with which to access the files.
  - A directory acts as a mapping of human-readbale names to inodes.
  - name and inode pair is called a link, physical on-disk mapping of this is implemented and managed by the kernel.
  - Directories are much like other files and even have associated inodes.
  - dentry - directory entry inside the kernel. dentry cache for fast lookups.
  - Hard links
    - when multiple links map different names to the same inode, hard links.
    - deleting a file involves unlinking it from the directory structure, remove name and inode pair
    - each inode contains link count to keep track of how many links refer to it.
  - Symbolic links
    - allow links to span filesystems as hard links are meaningless outside its inode's own filesystem
    - incur more overhead than hard links because resolving a symbolic link effectively involves resolving two files: symbolic link and the linked-to-file.

- FUSE
  - Filesystems in Userspace
  - S/w layer in userspace.
  - Allows the creation of custom filesystems
  - Kernel code stays untouched.
  - FUSE kernel module
  - libfuse module in userspace.
  - Why?
    - shorter development cycle
    - easier development, OS-agnostic
    - Does not affect other parts/services
    - Safer usage of untrusted filesystems
  - Real world use cases
    - On-disk filesystems: NTFS, retro-fuse
    - Network-based filesystems: MinFS, SSHFS.
    - Layering filesystems: EncFS, FuseCompress
    - Archive, backup filesystems: Atlas, Borg
  - How to use FUSE
    - A FUSE application is a typical user-space program
      - applications define how to handle filesystem operations
      - interactions with libfuse to register the operations
      - Libfuse invokes the application defined operation upon request.
    - API from libfuse
      - Callback mechanism for binding user-defined functions with operations
      - High-level API -- path level, synchronous
      - Low-level API -- inode level, asynchronous 
  - FUSE application workflow
    - Parse arguments
    - Mount filesystem
    - Setup callbacks
    - fuse_loop -> request -> Process request
    - fuse_loop -> exit -> Cleanup
  - FUSE API
    - allows the user to specify how a file operation will get handled.
      - user implements a set of functions to handle a file operation
      - user fills the struct fuse_oeperations or struct fuse_lowlevel_ops with the respective function implementations
      - user passes the struct to libfuse and upon a request libfuse calls the respective function
    - FUSE operations
      - lookup(only in the low-level API)
      - getaddr
      - read
      - write
      - readdir
      - mkdir
      - open
      - mknod
      - create
      - symlink
      - readlink
  - Error messages
    - in case a request fails appropriate errors should be returned.
- Streams
  - Unformatted sequences of bytes with a pointer.
  - open stream is represented by pointer to a file data structure.
  - positioning the pointer.

- POSIX design patterns
  - Everything is a file
  - open before use
  - byte-oriented
  - explicit close
  - Kernel buffered reads.

- High-level vs Low-level File API.

- Why buffer in Userspace? Overhead!
  - Syscalls are 25x more expensive than function calls.(100ns)
  - Simplifies operating system.

- Aliasing of file descriptors
  
- Special file
  - kernel objects that are represented as files
  - Include
    - block device files
      - accessed as an array of bytes, and can be accessed in any order
      - generally storage devices
    - character device files
      - accessed via a linear queue of bytes
      - i.e keyboard
    - named pipes
      - are an IPC mechanism that provides a communication channel over a fd.
    - unix domain sockets
      - advanced form of IPC that work even on two different machines.
  - special files are a way to let certain abstractions fit into the filesystem.

- Filesystems and namespaces
  - Linux provides a global and unified namespace of files and directories.
  - A filesystem is a collection of files and directories in a formal and valid hierarchy.
  - Mounting and unmounting refers to the adding and removing of filesystems from the global namespace
  - Linux also supports virtual and network filesystems.
  - The smallest addressable unit of a block device is a sector, physical attribute of the device.
  - sectors come in powers of 2, block device cannot transfer or access data smaller than a sector and all I/O must occur interms of one or two sectors.
  - Likewise the smallest addressable unit on a filesystem is the block, which is an abstraction of the filesystem.
    - A block is usually power-of-two multiple of sector size.
  - Blocks are larger than sector but they must be smaller than the page size.(smallest addressable unit by memory management unit)
    - common block sizes are 512 bytes, 1KB and 4KB.
  - Linux supports per-process namespace as opposed to the global unified namespace preffered by Unix, allowing each process to have a unique view of system file and directory hierarchy.
  - By default each process inherits namespace of its parent, but a process may elect to create its own namespace with its own set of mount points and a unique root directory

- Mounted file system concept.
- Special files are provided in order to make i/o devices look like files.
- Pipe is pseudofile used to connect two processes

### Input/Output

- Every OS has I/O subsystem for managing its i/o devices.

### Protection

- Auth in linux is provided by users and groups.
- Each user is associated with a positive integer called a user ID, which in turn means each process is associated with exactly one uid, called the process real uid.
- In kernel uid is the only concept of a user
- Usernames and their respective uids are stored in etc/passwd.
- In addition to real uid, each process also has an effective uid, saved uid and filesystem uid
- supplementary groups are listed in etc/group.
- owners and permissions are stored in the file's inode.
- Files in UNIX are protected by giving them a 9-bit binary protection code.
- consist of 3 3-bit field, owner, group members, everyone.
- every bit has a field for read, write and execute access.
- rwxrwxrwx

### Signals

- one way communication for asynchronous notifications
- can be sent from kernel to process, process to process or from process to itself.
- Number of signals??? each represented by numerical constant and a textual name
- Signals interrupt an executing process causing it to stop what its doing and perform a predetermined action.
- Processes may control what happens when they receive the signal with the exception of SIGKILL and SIGSTOP.
- Handled signals cause the execution of a user-supplied signal handler function

### IPC

- allowing processes toexchange information and notify each other of events is one of an operating systems most important jobs.
- Process abstraction is desgined to discourage IPC.
- Producer(writer) and consumer(reader) may be distinct process
  - potentially separated in time.
  - How to allow selective communication
- Variations
  - Use a file descriptor
  - in-memory queue, kernel.
    - UNIX pipe.
    - always wait.
- Pipes are an abstraction of a single queue
  - One end write-only, another read-only
  - communication between multiple processes on one machine
  - file descriptors obtained via inheritance
- IPC mechanisms suppported by Linux include
  - pipes
  - names pipes
  - semaphores
  - message queues
  - shared memory
  - futexes

- Protocols
  - This is an agreement on how to communicate
  - Syntax
    - How a communocation is specified and structured
    - Format, order messages are sent and received.
  - Semantics
    - What a communication means
    - Actions taken when transmitting, receiving or when a timer expires.
  - Described formally by a state machine
    - often represented as a message transaction diagram.

- Network Connection
  - Bidirectional stream of bytes between two processes on possibly different machines
  - Abstractly, a connection between two endpoints A and B consists of
    - a queue(bounded buffer) for data sent from A to B.
    - a queue(bounded buffer) for data sent from B to A.
  - Socket Abstraction
    - Endpoint for communication
    - Communication across the world looks like File I/O.
    - Queues to temporarily hold results.
    - Two sockets connected over the network, IPC over network.
    - Standardized by POSIX.
    - write adds to output queue(destined for other side)
    - read removes from input queue.
    - can read or write to either end.
    - fd obtained via socket/bind/connect/listen/accept.
    - Inheritance of fd on fork() facilitates handling each connection in a separate process.
  - Namespaces for communication over IP.
    - Hostname
    - IP address
    - Port Number
      - 0-1023: well knowm or system ports
        - superuser priviliges to bind to one.
      - 1024 - 49151 are registered ports
        - assigned by IANA for specific services.
      - 49152 - 65535(2^16 -1) are dynamic or private
        - allocated as ephemeral ports.
    - 5 tuple identifies each
      - Source IP address
      - Destination IP address
      - Source Port Number
      - Destination Port Number
      - Protocol
  - Steps
    - create server socket
    - bind it to an address
    - listen for connection
    - accept syscall
    - connection socket
    - read/write request.
    - write/read response.
    - close socket
   
### Error Handling

- An error is signified via a functions return value and described via a special variable, errno
- defined in errno.h
- errno variable may be read or written to directly, it is a modifiable lvalue
- list of errors and their description, lookup.
- C lib provides a number of functions for translating an errno value to the corresponding textual description.

### Shell

- Has the terminal standard input and standard output.


## System calls

- These are function invocations made from user space into kernel in order to request some service or resource from the operating system.
- applications are able trap into the kernel through this well defined mechanism and execute only code that the kernel allows it to execute.
- Mechanics of issuing them are highly machine dependent and are often expressed in assembly language
- Procedure library provided to aid in this regard.
- Programs always check results of a system call to see if an error occurred.
- System calls happen in a series of steps.
- POSIX system call standard.
- execve system call.
- Processes in Unix have memory divided in 3 segments: text, data, stack.
- Types: 
    - system calls for process management
    - system calls for file management.
    - system calls for directory management
- Windows 32 API 

## C library

- also known as libc
- provides wrappers for system calls, threading support and basic application facilities.
- gcc - GNU Compiler collection

## APIs and ABIs

- API
  - defines the interfaces by which one piece of software communicates with another at the source level.
- ABI 
  - defines the binary interface between two or more pieces of software on a particular architecture.
  - defines how application interacts with itself, the kernel and libraries.
  - ensures binary compatibility.
  - concerned with issues such as calling conventions, byte ordering, register use, system call invocation, linking, library behviour and binary object format.
  - enforced by the toolchain

## Operating system structure.

- Monolithic systems
  - Implemented entirely as single large processes running entirely in a single address space.
  - Communication in the kernel is trivial.
- Layered systems.
- Microkernels.
  - Functionality of the kernel is broken down into separate processes, called servers.
  - Communication is via message-passing, an IPC mechanism built into the system.
- Client-server systems.
- Virtual machines.
- Exokernels.

## Device drivers

- They are distinct black boxes that make a particular piece of hardware respond to a well-defined internal programming interface,
   hiding completely the details of how the device works
- User activities are performed by means of a set of standardized calls that are independent of the specific driver,
  mapping those calls to device-specific operations that act on real hardware is then the role of the device driver.
- 

## Process Deep Dive


## Windows Fundamentals

## Performance

- Metrics that quantify the effectiveness/efficiency of computer systems.
  - Processing time(s)
    - simulation, numerical computation
  - Throughput(Op/s, B/s, Tx/s)
    - HPC, database, network, storage
  - Latency(s. cycles)
    - Database, network, storage, HFT
  - Memory usage( Bytes, pages)
    - Embedded systems
  - Energy Usage(V,A,W,W/op)
    - Embedded systems, laptops, samrtphones, tablets
  - Binary size(bytes)
    - embedded systems, loading from remote.
  - Compiling time(s)
    - testing, development

- Many features affect the performance of modern computer systems.
- Developers need to carefully(explicitly) design their code to utilize the features
  - Hardware
    - Pipelining
    - CPU caches
      - cache size
      - caching protocol
      - false sharing
      - cache misses
      - prefetcher
        - fetch data into caches in advance according to recent memory access patterns.
      - page misses
    - SIMD instructions
    - Branch predictor
    - Interrupts
    - Simultaneous multithreading
    - Dynamic frequency scaling.
    - NUMA
  
  - Software
    - Multithreading
    - Software caches
      - page cache
    - Scheduler
      - energy wave scheduling
      - real time scheduling
      - overcommitment
      - process priority
    - Context switch
    - Swapping
    - Compiler/Linker optimizations
    - ASLR
    - CPU affinity
    - CPU governor
  
### Performance measurement 

- Hardware counter
  - performance monitoring counters(PMCs) in CPU cores
  - Monitor how many times a specific event occurred in a certain period of time
    - elapsed time(cycles), retired instructions, cache misses, CPU stalls
- Tools
  - Linux system calls(clock_gettime)
  - Linux perf
    - official linux profiler.
    - supports many profiling/tracing features
      - CPU performance monitoring counters(PMCs)
      - Statically defined tracepoints
      - User and kernel dynamic tracing
      - Kernel line and local varibale tracing
      - Stack tracing, libunwind
      - Code annotation
    - Perf basic workflow
      - list -> find events
      - stat -> count them
      - record -> write event data to file
      - report -> browse summary
      - script -> event dump for post processing
  - Intel VTune
- Syscall wrapper
  - Libraries intercepting syscalls
  - Counting events and collectinf stack traces
  - Mainly used for memory profiling
  - Eg: Gperftools, Heaptrack
- VM based
  - Puts application in a vm
  - Can collect very detailed information
  - Very slow
  - Eg: Valgrind
- Instrumentation
  - Inject code to function calls
  - Code takes necessary measurements
  - Either binary or source code changes
  - Eg: Orbit, gprof, google benchmark/quick bench.
- How to get consistent results
  - Disable turboboost
  - Disable SMT.
  - Set scaling_governor to performance
  - Set cpu affinity
  - Set process priority
  - Drop file system cache
  - Disable ASLR
  - Measure multiple runs  
- Common pitfalls
  - making wrong predictions/random changes
  - not knowing your data
    - AoS vs SoA
  - Overoptimizing/Premature optimization
  - Bad benchmarks
  
## xv6 

- Provides basic interfaces introduced by Ken Thompson and Ritchie Unix and well as mimicking Unix internal design.
- Unix provides a narrow interface whose mechanisms combine well, offering a surprising degree of generality.

### Processes and memory

- An xv6 process consists of user-space memory(instructions, data, stack) and per process state private to the kernel.
- xv6 can timeshare processes
- fork() creates new processes.

### I/O and File descriptors

- File descriptor is a small integer representing a kernel-managed object that a process can read from or write to.
- A process may obtain one by opening a file, directory, device, creating a pipe or by duplicating an existing descriptor.
- Fd abstracts away the differences between files, pipes and devices, making them all look like streams of bytes.
- xv6 kernel uses the fd as an index into the per-process table, so that every process has a private space of fd starting from zero.
- stdin(0), stdout(1), stderror(2)
- call(fd, buf, n), returns bytes read.
- write(fd, buf, n), returns bytes written.
- each fd has an offset associated with it.

### Pipes

- This is a small kernel buffer exposed to processes as a pair of file descriptors, one for reading and one for writing.
- Writing data on one end of the pipe makes that available for reading from the other side of the pipe.
- Pipes provide process a way to communicate.
- Pipes advantage over temporary files
  - Pipes automatically clean themselves up, unlike temp file.
  - Pipes can pass arbitrary long stream of data, files require enough space to store all data.
  - Pipes allow for parallel execution of pipeline stages, while file requires one to finish then the other.
  - In IPC, pipes blocking reads and writes are more efficient than the non-blocking semantics of files.
 
### File system

- xv6 file system provides data files,which are uninterrupted byte arrays and directories which contain named references to data files and other directories.
- Directories form a tree, starting at root.
- mkdir, mknod, 
- fstat, 
- file's name is distinct from the file itself: same underlying file, called an inode, can have multiple names called links.
- link system call creates another file system name referring to the same inode as the existing file.

## Synchronization

- Using atomic operations to ensure cooperation between threads.
- This is a way of coordinating multiple concurrent activities that are using shared state.

### Multiplexing processes: The process control block

- Kernel represents each process as a process control block
  - status(running. ready, blocked)
  - registers state(when not ready)
  - Process ID, User, Executable, Priority
  - Execution time
  - Memory space, translation

- For every thread in a process, kernel maintains
  - The thread's TCB
  - A kernel stack used for syscalls/interrupts/traps
    - This kernel-state is sometimes called the "kernel thread"
    - The kernel thread is suspended(but ready to go) when thread is running in user-space
- Additionally, some threads just do work in the kernel
  - Still has TCB
  - Still has kernel stack
  - But not part of any process and never executes in user mode.
  
- Kernel scheduler maintains a data structure containing the PCBs
  - Give out CPU to different processes
  - This is a policy decision.
- Give out non-CPU resources
  - Memory/IO
  - Another policy decision

- Context Switch
- Lifecycle of a process or thread
  - new: process/thread is being created.
  - ready: waiting to run.
  - running: instructions being executed.
  - waiting: process waiting for some event to occur.
  - terminated: process has finished execution.(parent has to get a result)

- Ready queue and various i/o device queue.
  - separate queue for each device/signal/condition.
  - each queue can have a different scheduler policy.

- Scheduling
  - mechanism for deciding which processes/threads receive the CPU.

- Core of concurrency
  - conceptually, shceduling loop of the OS looks as follows

```c
  
  loop {
    RunThread();
    ChooseNextThread();
    SvaeStateOfCPU(curTCB);
    LoadStateOfCPU(newTCB);
  }

```
  - This is an infinite loop.
    - One could argue that this is all that the OS does.
    
  - `Design document and intuitions behind your design, thought through the tradeoffs well enough`
  - Running a thread
    - Load its state(registers, PC, stack pointer) into CPU.
    - Load environment(virtual memory space)
    - Jump to the PC
  
  - How does the dispatcher get control back?
    - Internal events:
      - thread returns control voluntarily.
      - Blocking on I/O.
        - requesting I/O implicity yields the CPU.
      - Waiting on a signla from other thread
        - thread asks to wait and thus yields the CPU.
      - Thread executes a yield()
        - thread volunteers to yield cpu.
        
    - External events: thread gets preempted.
      - Interrupts
        - signals from h/w or s/w that stop the running code and jump to kernel.
        - Interrupt is a hardware-invoked context switch
          - no separate step to choose what to run next
          - always run the intrrrupt handler immediately
      - Timers
        - like an alaram clock that goes off every some milliseconds.
    
    - Interrupt Controller
      - Interrupt invoked with interrupt lines from devices.
      - Interrupt controller chooses interrupt request to honor.
        - Interrupt identity specified with ID line.
        - Mask enables/disables interrupts
        - Priority encoder picks highest enabled interrupt
        - Software interrupt set/cleared by s/w
      - CPU can disable all interrupts with internal flag
      - Non-maskable Interrupt line (NMI) cant be disabled.
  
  - How does dispatcher switch to a new thread?
    - Save anything next thread may thrash: PC, regs, stack pointer.
    - Maintain isolation for each thread.
    - TCB+stacks(user/kernel) contains complete restartable state of thread
      - can put it on queue for later revival
    - Cheaper than switching processes
      - no need to change address space.
    - Some number from Linux
      - Freq of context switch: 10-100ms.
      - Switching between processes: 3-4microsecs
      - Switching between threads: 100ns
    - Kernel thread / User thread(stacks available across the environments)
      - simple one-to-one threading model.
      - many-to-one.
      - many-to-many
  
  - Processes vs Threads
    - Switch overhead.
      - same: low
      - different: high
    - Protection
      - same: low
      - different: high
    - Sharing overhead
      - same: low
      - different proc, simultaneous core: medium
      - different proc, offloaded core: high
    - Parallelism:yes
  
  - Hyperthreading / Multithreading.
    - duplicates register state to make a second thread allowing more instructions to run.
    - Traditional implementation strategy
      - One PCB (process struct) per process
      - Each PCB constains (or stores pointers to) each thread's TCB.
  
  - What happends when thread blocks on I/O?
  - How do we initialize TCB and Stacks?
  
  - Threads yield overlapped I/O and computation without deconstructing code into non-blocking fragments.
    - One thread per request.

- Atomic Operations
  - To understand a concurrent program, we need to know what the underlying indivisible operations are
  - An operation that always runs to completion or not at all.
    - It is indivisible: It cannot be stopped in the middle and state cannot be modified by someone else in the middle.
    - Fundamental building block- if no atomic operations, then have no way for threads to work together.
  - Memory references and assignments of words are atomic.
  - Locks:
    - prevents someone from doing something
    - Lock before entering critical section and beore accessing shared data.
    - Unlock when leaving, after accessing shared data
    - All synchronization involves waiting.
    - Locks need to be allocated and initialized.
    - Acquire(), release().
    - Use locks to solve the aid on creating critical sections.

- Mutual Exclusion
  - Ensuring that only one thread does a particular thing at a time.
  - One thread excludes the other while doing its task.
  
- Producer-Consumer with a bounded buffer.
  - pipes, web services, routers.
  - circular buffer data structure
    - read and writer pointers, check their overlap.
    
- High-level primitives that Locks
  - what is the right abstraction for sychronizing threads that share memory.
  - Synchronization is a way of coordinating multiple concurrent activities that are using shared state.

- Semaphores.
  - Kind of generalized lock.
  - Has a non-negative integer calue and supports the following operations
    - Down() or P()
      - an atomic operations that waits for semaphores to become positive then decrements it by 1.
      - think of it as the wait() operation
    - Up() or V()
      - an atomic operation that increments thte semaphore by 1, waking up a waiting P, if any
      - think of this as the signal() operation
  - Semaphores are like integers, except.
    - No negative values
    - Only operations allowed are P and V, can't read or write value, except initially.
    - Operations must be atomic
      - Two Ps together can decrement value below zero
      - Thread going to sleep in P won't miss wakeup from V - even if both happen at same time.
    - POSIX adds ability to read value, but technically not part of proper interface.
    - Two uses of Semaphores
      - Mutual exclusion
        - binary semaphore or mutex.
        - can be used for mutual exclusion, just like a lock.
      - Scehduling constraints
        - Allow thread 1 to wait for a signal from thread 2.
  - Use a separate semaphore for each constraint.

`All synchronization problems are solved by waiting, trick is wait as little as possible, wait cleverly but don't busy wait`
`Think first, then code`
`Always write down behaviour first`

- Too much milk motivating synchronization problem, think like a computer.*relook at this in future*
- How to Implement locks
  - Separate lock variable, use hardware mechanisms to protect modifications of that variable.
  - Must be careful not to waste/tie up machine resources
  
- Hardware atomicity primitives
  - Disabling of Interrupts
    - Maintain a lock variable and impose mutual exclusion only during operations on that variable.
    - In-Kernel Lock
    - Cons
      - Can't give lock implementation to users as ops are in the kernel.
      - Doesnt work well on multiprocessor, as disabling interrupts on all processor requires messages and would be very time consuming
  - Read-Modify-Write
    - Test and set(most architectures)
    - Swap(x86)
    - Compare and Swap
      - use for queues
    - Load-locked and Store-conditional
      - use locks for mutual exclusion and condition varible for scheduling constraints
      - Monitor
        - a lock and zero or more condition variables for managing concurrent access to shared data.
          - always acquire lock before accessing shared data.
          - use condition variables to wait inside critical section
            - 3 ops: Wait(), Signal(), Broadcast()
        - represent the sychronization logic of the program
          - Wait if necessary
          - Signal when change something so any waiting threads can proceed.
          - Monitors supported natively in a number of languages
        - paradigm for concurent programming
        - Mesa and Hoare monitors
```c
//typical structure of monitor-based program

lock
  while (need to wait) {
    condvar.wait();        //check and/or update state variables, Wait if necessary
  }
  unlock
  
  do something so no need to wait
  
  lock
  
  condvar.signal();       //check and/or update state variables
  
  unlock
```
      - Basic Readers/Writers
        - Is using a single lock on the database sufficient. 
        - what are the correctness constraints??
        - Basic solution
          - Reader()
            - Wait until no writers
            - Access data base
            - Check out - wake up a waiting writer
          - Writer()
            - Wait until no active readers or writers
            - Access database
            - Check out - wake up waiting readers or writer
          - State variables
            - AR, active readers; =0
            - WR, waiting readers; = 0
            - AW, active writers, = 0
            - WW, waiting writers; = 0
            - condition okToRead = 0
            - condition okToWrite = 0
```c
 Reader() {
  //first check self into system
  acquire(&lock);
  while ((AR + WW) > 0) { //is it safe to read
    WR++                  //No. Writers exist
    cond_Wait(&okToRead, &lock); //Sleep on cond war
    WR--                  //No longer waiting
    }
    AR++                   //Now we are active
    release(&lock);
    //Perform actual read-only access 
    AccessDatabase(ReadOnly);
    //Now, check out of system
    acquire(&lock);
    AR--;                      //No longer active
    if (AR == 0 && WW > 0)   //No other active readers
      cond_signal(&okToWrite); //Wake up one writer
    release(&lock)
}

  Writer() {
    //First check self into system
    acquire(&lock);
    while ((AW + AR) > 0) { //iS IT SAFE TO WRITE
      WW++                    //No. Active users exist
      cond_Wait(&okToWrite, &lock); //Sleep on cond war
      WW--;                    //No longer waiting
    }
    AW++;                      //Now we are active
    release(&lock);
    //Perform actual read/write access
    AccessDatabase(ReadWrite);
    //Now, check out of system
    acquire(&lock);
    AW--                      //No longer active
    if (WW > 0) {            //Give priority to writers
        cond_signal(&okToWrite) //Wake up one writer
  } else if (WR > 0) {          //Otherwise, wake reader 
      cond_broadcast(&okToRead); //Wake all readers    
  }
    release(&lock);      
  }
  
//can change the okToRead and okToWrite to okToContinue, listen to one channel.

```
 - Can we construct monitors from semaphores.

## Scheduling

- How is the OS to decide which of several tasks to take off a queue?
- Process of deciding which threads are given access to resources from moment to moment.
  - Often, we think in terms of CPU time, but think also about resources.
- Many implicit assumptions for CPU scheduling, unrealistic but simplify the problem so it can be solved.
  - One program per user
  - One thread per program.
  - Programs are independent        
- Goal: Dole out CPU time to optimize some desired parameters of system.

- Scheduling policy goals/criteris
  - Minimize Response Time
    - minimize elapsed time to do an operation(or job)
    - response time is what the user sees i.e echo a keystroke, compile a program
  - Maximize Throughput
    - maximize operations or jobs per second.
    - throughput realted to response time, but not identical
      - minimizing response time will lead to more context switching that if you only maximized throughput
    - Two parts to maximizing throughput
      - Minimize overhead( i.e context switching)
      - Efficient use of resources(CPU, disk, memory)
  - Fairness
      - Share CPU among users in some equitable way.
      - What is equitable way??

- First-Come, First-Served.  
  - also known as FIFO or run until done.
  - convoy effect: short process stuck behind long process, convoy of small tasks tend to build up when a large one is running.
  - Calculate:
    - Waiting time
    - Average waiting time.
    - Average completion time.

- Round Robin scheduling
  - Preemption
  - Each process gets a small unit of CPU time, time quantum, usually 10-100 milliseconds
  - After quantum expires, process is preempted and added to end of the ready queue.
  - Calculate:
    - Min/Max waiting time.
    - Average waiting time/ completion time.
    - q must be large with respect to context switch, otherwise overhead is too high(all overhead)
  - How to implement RR in the kernel
    - FIFO queue but preempt job after quantum expires and send it back to the queue.
    - How? Timer interrupt and careful synchronization.
    - How do you choose time slice?
      - Need to balance short-job performance and long-job throughput.
  - Aweful for jobs of same length.
  - In RR cache state must be shared between all jobs but can be devoted to each job with FIFO.
  
- Handling Differences in importance
  - Strict priority scheduling.
    - Execution Plan
      - always execute highest priority runable jobs to completion.
      - each queue can be processed in RR with some time-quantum.
    - Problems
      - Starvation
        - lower priority jobs don't get run because of higher priority jobb
      - Deadlock: Priority Inversion
        - Happens when low-priority has lock needed by high-priority task.
        - Priority donation??
    - Dynamic priorities
      - adjust them based on heuristics.
  
  - Scheduling fairness
    - How to implement fairness
      - Could give each queue some fraction of the CPU
      - Could increase priority of jobs that don't get service.
  
  - Shortest Job First
    - Shortest Time to Completion First
  - Shortest Remaining Time First
    - Shortest Remaining Time to Completion First
  - Run whatever job has the least amount of computation to do/least remaining amount of computation to do.
  - These are the best you can do at minimizing average response time
    - Provably optimal
    - Since SRTF is always at least as good as SJF, focus on SRTF.
  
- Predicting lenght of next cpu burst
  - Changing policy based on past behaviour.
    - Works best because programs have predictable behaviour.
    
  - Lottery Scheduling
    - give each job some number of tickets and on each time slice, randomly pick a winning ticket.
    - assign tickets via approximate SRTF, shorter get more, long running get fewer.
    - to avoid starvation, every job gets at least one ticket.
    - Behaves gracefully as load changes compared to strict priority scheduling.
    
- How to evaluate a sheduling algorithm?
  - Deterministic modelling
    - Take predetermined workload and compute performance of each algorithm for that workload.
  - Queueing models
    - Mathematical approach fro handling stochastic workloads
  - Implementation/Simulation
    - Build systems which allow actual algorithms to be run against actual data.

  
### Handling Simultaneous Mix of Diff Types of Apps

- Consider mix of interactive and high throughput apps
  - How to best schedule them?
  - How to recognize one from the other?
  - Should you schedule the set of apps identically on servers, workstations, pads and cellphones.
- Assumptions encoded into many schedulers.
  - High compute equates to lower priority
  - High sleep apps and have short bursts must be interactive apps.
- Difficult to characterise apps.

- Multi-level feedback scheduling  
  - Exploit past behaviour
  - Multiple queues of each with different priorities and their own scheduling algorithms
  - Automatic promotion/demotion of process priority in order to approximate SJF/SRTF.

- Case study: Linux 0(1) Scheduler.
  - Notes go here.
  
- Multi-core scheduling
  - Algorithmically, not a huge difference from single-core scheduling
  - Implementation-wise, helpful to have per-core scheduling data structures
    - Cache coherence
  - Affinity scheduling, once a thread is scheduled on a CPU, OS tries to reschedule it on the same CPU.
    - Cache reuse.
    
- Gang scheduling and Parallel Application
  - When multiple threads work together on a multi-core system, try to schedule them together.
    - Makes spin-waiting more efficient(inefficient to spin-wait for a thread that's suspended)
  - Alternative: OS informs a parallel program how many processors its threads are scheduled on(scheduler activations)
    - Application adapats to number of cores that is has scheduled.
    - Space sharing with other parallel programs can be more efficient, because parallel speedup is often sublinear with number of cores.
    
- Real-Time Scheduling
  - Goal
    - Predictability of performance.
  - We need to predict with confidence worst case response times for systems
  - In contrast to conventional systems where performance is system/throughput oriented with post-processing, in RTS performance guarantees are task and or class centric.
  - Hard real-time: for time-critical safety-oriented systems
    - Meet all deadlines.
    - Determine in advance if this is possible
      - Earliest Deadline First 
        - preemptive priority-based dynamic scheduling.
        - Scheduler always schedules the active task with the closest absolute deadline.
      - Least Laxity First
      - Rate-Monotonic Scheduling, 
      - Deadline Monotonic Scheduling.
  - Soft real-time: for multimedia
    - Attempt to meet deadlines with high probability.
  - Workload characteristics
    - Tasks are preemptable, independent with arbitrary arrival(=release) times.
    - Tasks have deadlines and known computation times.

- Starvation
  - Thread fails to make progress for an indefinite period of time.
  - starvation ==! deadlock, this is because starvation could resolve under the right circumstances.
  - Causes
    - Scheduling policy never runs a particular thread on the CPU.
    - Threads wait for wach other or are spinning in a way that will never be resolved.
  - Work-conserving
    - A work-conserving scheduler is one that does not leave the cpu idle when there is work to do.
    - A non-work-scheduler could trivially lead to starvation.
  - Last-come, First-served
    - LIFO as a scheduling data structure.
    - Worst case leads to starvation.
    - Arrival rate exceeds service rate, queue build up faster than it drains.
  - How does starvation come about for various scheduling algorithms.
  
- Priority Inversion
  - Where high priority task is blocked waiting on low priority task
  - Low priority one must run for high priority to make progress.
  - Medium priority task can strave a high priority one.
  - Solutions
    - Priority donation/inheritance.
  - Case study
    - Martian pathfinder rover.

- Proportional-share scheduling
  - Share the CPU proportionally
    - Give each job a share of the CPU according to its priority.
    - Low-priority jobs get to run less often
    - All jobs can at least make progress.
    
- Stride scheduling
  - Achieve proportional share scheduling without resorting to randomness, and overcome the law of small numbers problem.
  - Stride of each job, take big number W / number of tickets.
  - Pick job with lowest pass, runs it, add its stride to its pass.
  - Low-stride jobs run more often.
  - Example:
    - Linux Completely Fair Scheduler
      - Track CPU time per thread and schedule threads to match up average rate of execution.
      - *More notes.
      - Proportional shares

- Choosing the Right Scheduler
  - CPU Throughput: FCFS
  - Avg. Response Time: SRTF Approx.
  - I/O Throughput: SRTF Approx.
  - Fairness (CPU Time): Linux CFS.
  - Fairness (Wait Time): Round Robin
  - Meeting Deadlines: EDF
  - Favoring Important Tasks: Priority.

- When do the details of the scheduling policy and fairness really matter
  - When there aren't enough resources to go around.
- When should you simply buy a faster computer/network link
  - Buy it when pays for itself in improved response time.
  - Sometimes you're paying for worse response time in reduced productivity, customer angst, etc.
  - Might think you should buy a faster X when X is utilized 100%, though response time goes to infinity as utilization goes to 100%, any new randomness sends it over the edge.
- Most scheduling algorithms work fine in the linear portion of the load curve, fail otherwise.

- Nice values for assigning priority in Unix.

### Deadlock

- A deadly type of starvation(threads wait indefinitely).
- Circular waiting for resources, can't end without external intervention.
- Deadlock with locks
  - Keep both the lucky and unlucky case in mind.
- Dimension ordering.
- Threads often block waiting for resources
  - Locks
  - Terminals
  - Printers
  - CD drives
  - Memory
- Threads often block waiting for other threads
  - Pipes
  - Sockets
- Dining lawyers problem

- Requirements for deadlock
  - Mutual exclusion
    - Only one thread at a time can use a resource
  - Hold and wait
    - Thread holding at least one resource is waiting to acquire additional resources held by other threads
  - No preemption
    - Resources are released only voluntarily by the thread holding the resource, after thread is finished with it.
  - Circular wait
    - There exists a set {T1...Tn} of waiting threads, each waiting for another thread.

- Deadlock detection
  - Resource allocation graph.
    - System Model 
      - Threads
      - Resource types - R1, R2, ..., Rm
        - e.g CPU, memory pages, I/O devices
      - Instances - each resource type R1 has W1 instances.
        - a computer has 2 CPUs.
      - Utilization
        - request() -> use() -> release()
  - *write a deadlock detection algorithm*
  - Solutions
    - Deadlock prevention - write code in a way the isn't prone to deadlock.
      - Infinite resources.
      - No sharing resources.
      - Don't allow waiting.
      - Make all threads request everything they'll need at the begininning
      - Force all threads to request resources in a particular order preventing cyclic resource usage.
    - Deadlock recovery - let it happen and figure out how to recover from it.
      - Terminate thread, force it to give up resources.
      - Preempt resources without killing off thread
      - Roll back actions of deadlocked threads
    - Deadlock avoidance - dynamically delay resource requests so deadlock doesn't happen.
      - Safe state: system can delay resource acquisition to prevent resources.
      - Unsafe state: Threads request resources in a pattern that unavoidably leasds to deadlock
      - Deadlocked state: There exists a deadlock in the system
      - Banker's algorithm for avoiding deadlock.
        - *implement one*
        - apply it to dining lawyers problem.
    - Deadlock denial

## Memory

- The complete working state of a process and/or kernel is defined by its data in memory and registers.
- Consequently, cannot just let different threads of control use the same memory.

- Address space
  - Set of accessible addresses and the state associated with them.
  - 2^32 = ~4 billion bytes on a 32-bit machine
  - How many 32-bit numbers fit in this address space?
  - 32-bits = 4 bytes, so 2^32/4 = 2^30 = 1 billion.
- What happens when processor reads or write to an address??
  - Regular memory
  - Causes i/o operation(memory-mapped i/o)
  - Causes program to abort(segfault)
  - IPC.
- Memory multiplexing
  - Protection
    - prevent access to private memory of other processes
  - Translation
    - Ability to trasnalte accesses from one address space to a different one
  - Controlled overlap
    - Separate state of threads should not collide in physical memory, unexpected overlap causes chaos.
- Interposing on process behaviour
- Where does address translation take place?
  - Compile time, Link/load time or Execution time.
  - Addresses can be bound to final values anywhere in that path and may depend on operating system.
- Dynamic libraries
  - Linking postponed until execution.
  - Small piece of code(Stub), locates appropriate memory-resident librabry routine.
  - Stub replaces itself with the address of the routine and executes routine.

- Program protection without translation
  - Base and Bound.
    - Fragmentation over time
    - Missing support for sparse address space
    - Hard to do inter-process sharing

- Memory management unit
  - segment map resides in processor.
  - as many chunks of physical memory as entries.
  - Observations
    - Translation on every instruction fetch, load or store.
    - Virtual address space has holes
      - segmentation efficient for sparse address spaces
    - When it is ok to address outside valid range
      - This is how the stack and heap allowed to grow.
      - For instance, stack takes fault, system automatically increases size of stack.
    - Need protection mode in segment table
    - What must be saved/restored on context switch
      - Segment table stored in CPU, not in memory.
      - Might store all of processes memory onto disk when switched(swapping).
      - Highly expensive, almost a million worth of instructions.
  - Problems
    - Must fit variable-sized chunks into physical memory
    - May move processes multiple time to fit everything
    - Limited options for swapping to disk.
    - Fragmentation: wasted space.
      - External: free gaps between allocated chunks
      - Internal: don't need all memory wihtin allocated chunks.
    
- Paging
  - physical memory in fixed size chunks(pages)
  - solution to fragmentation from segments.
  - How to implement simple paging?
    - Page Table
      - resides in physical memory
      - contains physical page and permission for each virtual page.
    - Virtual address mapping
      - Offset from virtual address copied to physical address.
      - Virtual page # is all remaining bits.
      - Check page table bounds and permissions

- Page Table
  - Memory divide into fixed-sized chunks of memory.
  - Page table is a map(function) from VPN to PPN
  - Simple page table corresponds to a very large lookup table
  - Offset of virtual address same as physical address.
  - Large page tables can be placed into virtual memory
  - Map structures?

- Page Table Entry
  - What is in a PTE?
    - Pointer to next-level page table or to actual page.
    - Permission bits: valid, read-only, read-write, write-only
  - I.e Intel x86 architecture PTE
    - Address(10, 10, 12-bit offset)
    - Intermediate page tables called 'Directories'
    - P | W | U | PWT | PCD | A | D | PS
  - How to use PTE
    - Invalid PTE can imply different things
    - Validity checked first
    - Demand paging
      - Keep only active pages in memory
      - Place others on disk and mark their PTEs invalid
    - Copy on Write
      - Unix fork gives copy of parent address space to child.
      - How to do it cheaply??
    - Zero Fill On Demand
      - Late address binding so to say

- Multi-level Translation
  - Segments + Pages
  - Virtual address mapped to series of tables.
  - Permit sparse population of address space.
  - Tree of tables.
    - could have any number of levels.
    - what must be stored/restored on context switch.
  - Sharing?
  - Easy memory allocation
  - Only need to allocate as many page table entries as we need for aplication.
  - Easy sharing

- x86 memory model with segmentation

- Segment Descriptors
  - What is a segment register
    - A pointer to the actual segment description
    - G/L selects between GDT andLDT tables(global vs local descriptor tables)
    - RPL: Requestor privilege level.
  - Two registers: GDTR/LDTR hold pointers to global/local descriptor tables in memory.
    - Descriptor format(64 bits)
- In legacy applications(16-bit mode)
  - Segments provide protection for different components of user programs
  - Separate segments for chunks of code, data, stacks
  - Limited to 64k segments
- In modern use(32-bit mode)
  - Large page size modes supported as well.

- Inverted Page Table
  - Use of hash table to hold transaltion entries.
  - Size of page table ~ size of physical memory rather than size of virtual memory
  
### Caches

- Principle of locality
  - Program likely to access a relatively small portion of the address space at any instant of time
    - Temporal Locality: locality in time.
    - Spatial Locality: locality in space.
- Major categories of cache misses
  - Compulsory Misses
    - first acces to a block.
  - Capacicty misses
    - cache cannot contain all blocks access by the program
  - Conflict misses
    - Multiple memory locations mapped to the same location.
  - Coherence misses
- Cache Organizations
  - Direct mapped
    - Uppermost bits are always cache tag, lowest M bits are byte select.
    - Faster
  - Set associative
    - N entries per cache index.
    - operates in parallel.
  - Fully associative
    - Every block can hold any line.
    - Slower but less misses

- Write through vs Write-back

- Physically-indexed cache vs Virtually-indexed cache
  - Address handed to cache after transaltion vs Address handed to cache before translation
  - PT holds physical addresses vs PT holds virtual addresses
  - TLB is in critical path of lookup vs TLB not in critical path of lookup
  - x86 processors vs high-end servers
  
- Translation Lookaside Buffer
  - CPU ->TLB -> Cache -> Memory
  - Needs to be really fast.
  - 128-512 entries
  - Organizex as fully-associative cache.
  - Reduce translation time for physically-indexed caches
  - What happens on context switch?

- Block is minimum quantum of caching
  - Data select field used to select data within block
  - Mnay caching applications don't have data select field
- Index used to lookup candidates in cache
  - Index identifies the set
- Tag used to identify actual copy
  - If no candiddate match then declare cache miss
  
- Page Fault
  - Virtual to Physical translation fails.
  - Fundamental inversion of the h/w / s/w boundary
  - Page fault handler.

- Demand paging
  - Average memory access time
    - Used to compute access time probabilistically
    - Hit Rate * Hit Time(time to get value from L1 cache) + Miss Rate * Miss Time(Hit Time + Miss Penalty(AVG Time to get value from lower level))
  - More levels of hierarchy
  - PTE makes demand paging implementable.
  - Suppose user references page with invalid PTE
    - Memory Management Unit traps to IS
      - Resulting trap is a "page fault"
    - What does OS do on a page fault?
      - Choose an old page to replace
      - If old page modified D=1, write contents abck to disk
      - Chnage its PTE and any cached TLB to be invalid
      - Load new page into memoryfrom disk
      - Update page table entry, invalid TLB for new entry.
      - Continue thread from original faulting location
    - TLB for new page will be loaded when thread continued
    - While pulling pages off disk for one process, OS runs another process from ready queue
      - Suspended process sits on wait queue.

- Working Set Model
  - As a program executes it transitions through a sequence of working sets consisiting of varying sized subsets of the address space.
  - Cache behavior under WS model (Hit rate vs Cache size)
  
- Demand Paging Cost Model
  - Since dp is like caching, can compute average access time(effective access time)
  - High slowdown factor.
  - Factors leading to misses in page cache
    - Compulsory misses
    - Capacity misses
    - Conflict misses
    - Policy misses
      - When pages were in memory, but kicked out prematurely because of the replacement policy.

- Page replacement policies
  - Why?
    - Replacement is an issue with any cache.
    - For pages, cost of being wrong is high, must important pages in memory, not toss them out.
  - FIFO(First In, First Out)
    - Throw out oldest page.
  - Random
    - Pick random page for every replacement.
  - Min
    - Replace page that wont be used for the longest time.
    - Porvably optimal.
  - LRU(Least Recently Used)
    - Replace page that hasnt been used for the longest time.
    - Implemented as a linked list.
      - Many instructions for each hardware access.
    - Approximating LRU: Clock algorithm.
      - Arrange physical pages in circle with single clock hand.
      - Advances only on page fault
      - Check for pages not used recently
      - Mark pages as not used recently.
    - Nth chance version of clock algorithm.
      - OS keeps counter per page: # sweeps
      - On page fault, OS checks use bit.
      - Means that clock hand has to sweep by N times without page being used before page is replaced.
      - How do we pick N?
        - Why pick large N? Better approximation to LRU
        - Why pick small N? More efficient
      - What about modified or dirty pages?
        - Takes extra overhead to replace a dirty page, so give dirty pages an extra chance before replacing?
        - Clean N=1, Dirty N=2.
    - Clock-Emulated-M
      - emulate hardware supported modified bit using read-only bit.
    - Clock-Emulated-Use-and-M
      - emulate h/w supported modified use bit.
    - Second-Chance List Algorithm(VAX/VMS)
      - split memory in two: Active list(RW), SC list(Invalid)
      - Access pages in active list at full speed.
    - Free List
      - Single clock hand, advances as needed to keep freelist full.
      - Keep set of free pages ready for use in demand paging.
      - Like VAX second list
      - Faster for page fault
    - Reverse Page Mapping(Coremap)
      - When evicting a page frame, how to know which PTEs to invalidate?
        - hard in presence of shared pages(forked processes, shared memory)
      - Reverse mapping mechanism must be very fast
        - Must hunt down all PTEs when seeinf of pages active.
  - Desired property of adding page frames leads to better hit rates.
  
- 90-10 code rule.

- Allocation of page frames
  - How do we allocate memory among different processes?
  - Each process needs minimum number of pages.
    - all processes that are loaded into memory can make forward progress.
  - Replacement scopes
    - Global replacement - process selects replacement frame from set of all frames, one process can take a frame from another.
    - Local replacement - each process selects from only its own set of allocated frames
  - Fixed/Priority Allocation
    - Equal allocation(fixed scheme)
      - every process gets same amount of memory
    - Proportional allocation(fixed)
      - allocate according to the size of the process
    - Priority allocation
      - Proportional scheme using priorities rather than size.
  - Adaptive schemes
  - Page-fault frequency allocation
    - can we reduce capacity misses by dynamically changing the number of pages/application.
    - establish acceptable page-fault rate.
  - Thrashing
    - Process is busy swapping pages in and out with little or no progress.
    - If a process does not have enough pages, the page-fault rate is very high leading to low CPU utilization and OS spending most of its time swapping to disk.
  - Locality in a memory-reference pattern.
    - program memory access patterns have temporal and spatial locality.
    - not enough memory for working set = thrashing.
    - working-set model?? (working-set window, working set of process Pi = total set of pages referenced in the most recent delta)

- Linux Memory details?
  - Memory management in Linux considerably more complex that the examples we have been discussing.
  - Memory zones: physical memory categories
  - Each zone has 1 freelist, 2 LRU lists
  - Many different types of allocation
  - Many different types of allocated memory
  - Allocation priorities.
  - Linux virtual memory map.

- *Read up on Meltdown flaw(2018)*
  - exploit speculative execution to observe contents of kernel memory.
  

## I/O    

- I/O devices you recognize are supported by I/O controllers.
- Processors accesses them by reading and writing IO registers as if they were memory
  - write commands and arguments, read status and results.

- What's a bus?
  - common set of wires for communication among hardware devices plus protocols for carrying out data transfer transactions.
    - operations: read, write
    - control lines, address lines, data lines
    - typically multiple devices
  - protocol: initiator requests access, arbitration to grant, identification of recipient, handshake to convey address, length, data.
  - Very high BW close to processor(wide, fast, inflexible), low BW with high flexibility out in I/O subsystem.
  - Buses let us connect n devices over a single set of wires, connections and protocols.
    - 0(n^2) r/ships with 1 set of wires
  - Downside: Only one transaction at a time.
    - Rest must wait.
    - Arbitration aspect of bus protocol ensures the rest wait.

- PCI Bus Evolution
  - PCI started life out as a bus
  - Parallel bus has many limitations
    - Multiplexing address/data for many requests
    - Slowest devices must be able to tell what's happening(arbitration)
    - Bus speed is set to that of the slowest device.
  - pci express bus
    - no longer a parallel bus
    - really a collection of fast serial channels or lanes
    - devices can use as many as they need to achieve a desired bandwidth
    - slow devices don;t have to share with fast ones.
  - Linux ability to migrate from PCI to PCI Express an abstraction success.
  - PCI Architecture.
    - RAM ---memory-bus--- CPU
    - CPU ---host-bridge---PCI #0
    - PCI #0 ---isa-bridge---ISA controller---legacy devices.
    - PCI #0 ---pci-bridge---PCI #1
    - PCI #1 --- USB controller --- root hub --- webcam,mouse,keyboard
    - PCI #1 --- SATA controller --- scanner, hard disk, dvd rom.
    - PCI #1 --- PCI slots  

- How processor talk to device?
  - CPU interacts with a controller
    - contains a set of registers that can be read and written
    - may contain memory for requests queues.
  - Processor accesses registers in two ways
    - Port-mapped I/O: in/out instructions
    - Memory-mapped I/O: load/store instructions
      - Hardware maps control registers and display memory into physical address space.
      - Simply writing to display memory(also called the frame buffer) changes image in screen.
      - Writing graphics description to cmd queue
      - Writing to the command register may cause on-board graphics h/w to do sth.
      - Flexible, bit faster that port mapped.
      - I/O accomplished with load and store instructions
  - Device drivers interface to I/ devices
    - Provide clean Read/Write interface to OS above
    - Manipulate devices through PIO,DMA and interrupt handling
  - DMA
    - Direct Memory Access
    - Permit devices to directly access memory
    - Free up processor from transferring every byte

- Operational parameters for I/O
  - Data granularity: Byte vs Block
    - Keyboard(byte) vs Disks, Networks(block)
  - Access pattern: Sequential vs Random
    - Tape(seq) vs Disk(random)
    - some require continual monitoring while others generate interrupts when they need service.
  - Transfer mechanism: Programmed IO and DMA

- Standard interfaces to devices
  - Block Devices
    - disk drives, tape drives, DVD-ROM.
    - Access blocks of data
    - Commands include open(), read(), write(), seek()
    - Raw I/O or file-system access
    - Memory-mapped file access possible
  - Character Devices: keyboards, mice, serial ports, USB devices
    - Single characters at a time
    - Commands include get(), put()
    - Libraries layered on top allow line editing
  - Network Devices: Ethernet, Wireless, Bluetooth
    - Different enough from block/character to have own interface
    - Unix and Windows include socket interface
      - Separates network protocol from network operation
      - Includes select() functionality
    - Usage: pipes, FIFOs, streams, queues, mailboxes

- Deal with Timing
  - Blocking Interface: Wait
    - When request data(read()), put process to sleep until data is ready.
    - When write data(write()), put process to sleep until device is ready for data.
  - Non-blocking Interface: Don't Wait
    - Returns quickly from read or write request with count of bytes successfully transferred.
    - Read may return nothing, write may write nothing.
  - Asynchronous Interface: Tell me later
    - When request data, take pointer to user's buffer, return immediately, later kernel fills buffer and notifies user.
    - When send data, take pointer to user's buffer, return immediately, later kernel takes data and notifies user.

### Storage Devices

- Magnetic disks
  - Large capacity at low cost
  - Slow performance for random access
  - Better for sequential
  - Shingled Magnetic Recording
  - 3 stage process
    - Seek time
    - Rotational latency
    - Transfer time
  - Controller intelligence
    - Sectors contain sophisticated error correcting codes
    - Sector sparing
    - Slip sparing
    - Track skewing
    
- Flash memory
  - capacity at intermediate cost.
  - Block level random access
  - Good performance for reads: worse for random writes.
  - Erasure requirement in large blocks
  - Wear patterns issue
  - SSD architecture.

- Nano-Tube Memory
  - carbon tubes
  

### Performance

- Latency
  - Time to complete a task
  - measured in units of time
- Response Time
  - Time to initiate an operation and get its response.
  - Able to issue one that depends on the result
- Throughput or Bandwidth
  - Rate at whcih tasks are performed
  - Measured in units of things per unit time(op/s, GLOP/s)
- Start-up or Overhead
  - Time to initiate an operation
- Most I/O operations are roughly linear in b bytes
  - Latency(b) = Overhead + b/TransferCapacity
- Peak bandwidth determinates?
  - Bus Speed
  - Device Transfer Bandwidth
- I/O path performance
  - User Thread ->Queue(OS paths) ->Controller ->I/O device
  - Response Time = Queue + I/O device service time
  - Queuing behaviour can lead to big increases in latecy as utilization increases.
- Little's Law
  - In any stable system, average arrival rate = average departure rate.
  - The number of things in a system is equal to the bandwidht time the latency(on average)
  - Can be applied to an entire system.
    - queues. processing stages, parallelism.
  - How does service rate vary with request rate?
- Bottleneck Analysis
  - Each stage has its own queue and maximum service rate.
  - The bottleneck stage dictates the maximum service rate.
  - Total latency = queuing time + service time(depends on the underlying operation).
- Determinisitic vs Bursty
  - Memoryless: likelihood of an event occuring is independent of how long we've been waiting.
- Distributions
  - Server spends variable time T with customers
    - Mean
    - Variance
    - Squared coefficient of variance
- Queuing Theory
  - Queuing theory applies to long term, steady state behavior
  - Arrivals and departures characterized by some probabilistic distribution.
  - Average length of queue = Average arrival rate * Average time waiting.
- Latency blows up as we approach 100% utilization dues to queue building up on each burst and very rarely getting a chance to drain.
- Half-Power Point: load at which system delivers half of peak performance.
  - Design and provision systems to operate roughly in this regime.
  - Latency low and predictable, utilization good: ~50%
- I/O Performance Optimization
  - Make evrything faster
  - More decoupled(parallelism)systems
    - independent buses or controllers
  - Optimize the bottlenect to increase service rate
    - Use queue to optimize the service
  - Do other useful work while waiting.
  - Queues absorb bursts and smooth the flow.
  - Admissions control(finite queues)
    - Limit delays, but may introduce unfairness and livelock.
- Disk performance highest
  - Big sequential reads.
  - When high workload that they can be piggy backed.
  - OK to be inefficient when things are mostly idle.
  - Bursts are both a threat and an opportunity.
- Disk Scheduling
  - Disk can do only one request at a time, what order do you choose to do queued requests?
  - FIFO order
    - Fair among requesters, but order of arrival may be to random spots on the disk ->very long seek
  - SSTF
    - Shortest seek time first.
    - Pick the request that's closest on the disk.
    - Include rotational delay in calculation, since rotation can be as long as seek.
    - Highly prone to starvation.
  - SCAN
    - Implements an elevator algorithm, take the closest request in the direction of travel.
    - No starvation but reatins flavor of SSTF.
  - C-SCAN
    - Circular-Scan
    - Only goes in one direction
    - Skips any requests on the way back.
    - Fairer than SCAN,not biased towards pages in middle
    
  
## Filesystem
