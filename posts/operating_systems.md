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
`Notes from Modern operating systems by Tanenbaum`, 
`Windows Fundamentals Notes from Reversing - Secrets of Reverse Engineering`, 
`CS162 Youtube - John Kubiatowicz`, 
`Operating Systems: Three Easy Pieces`, 
`Linux system programming`, 
`Linux Kernel Development`, 
`OS Dev Wiki`, 
`Operating Systems From 0 to 1`, 
`Practical File System Design`

*the concepts and design patterns appear at many levels*
*the better you understand their design and implementation, the better use you'll make of them*
*Information hiding is a useful productivity enhancement technique after one understands what is going on, but until then, it gets in the way of understanding*

## Preliminaries

- A problem domain is the part of the world where the computer is to produce effects, together with the means available to produce them, directly or indirectly.
- Requirements are the effects that the machine is to exert in the problem domain by virtue of its programming.
- Software engineer must select the right programming techniques that apply to the problem domain he is trying to solve because many techniques that are effective in one
  domain might not be in another, i.e application nature vs user/company constraints.
- At a minimum, a software engineer should be knowledgable enough to understand the documents prepared by hardware engineers for using their devices.
- Documents are essential for learning a problem domain since information can be passed down in a reliable way.

- Most important for software engineers
  - Software requirement document
    - Includes list of requirements(i.e from customer) and a description of the problem domain.
    - It should not be a high level description of the implementation, rather of the problem domain.
    - A good way to test it's quality is to provide it to a domain expert for proofreading.
  - Software specification
    - It states rules relating desired behaviour of the output devices to all possible behaviour of input devices, as well as any rules that other parts of the problem domain must obey.
    - Interface design with constraints for the problem domain to follow.
    - Careful to ensure implementation details do not leak in.
``
- Abstraction is a technique for hiding complexity that is irrelevant to the problem in context.
  - A lower layer has a recurring pattern, this pattern is taken out and built a language on top of it.
  - A higher layer strips away layer-specific(non-recurring) details to focus on the recurring details.
  - The recurring details are given a new and simpler language than the languages of the lower layers.
  - Every layer is just a more convenient language to describe the lower layer.

## Computational Structures

- see reference computational structures.md
- High-level programming languages help focus on problem domains that are not related to hardware at all ans where programmer performance is more important than computer performance while
  low-level languages helps to focus on the inner workings of a machine thus best suited for problem domains that are related to control hardware.

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
- Posix 
  - standard of Unix that defines a minimum system call interface that conformant Unix systems must support.


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
  - This is a subsytem that transfers data between computer components or betweeen computers.
  - Physically, just electrical wires that connect all components together and each wire transfer a single big chunk of data.
  - Total number of wires is called the **bus width**, and is dependent on the number of wires a CPU can support, i.e 16-bit equals 16 wires.
  - As processors and memories got faster, ability of one bus became strained and thus more were added.
  - i.e : cache, local, memory, PCI, USB, IDE, SCSI and ISA.
  - Bask Input Output System (BIOS)
  - contains low-level i/o software i.e read keyboard, write to screen, disk i/o.
        
### x86 Architecture

- A chipset is a chip with multiple functions.
- In some computers, various h/w devices are connected to each other via a PCB called a motherboard.
- Each CPU needs a compatible motherboard that can host it.
- Each motherboard is defined by its chipset model that determines the environment a CPU can control.
- Environment consists of 
  - A slot or more for CPU.
  - Slots for memory sticks.
  - A slot or more for graphic cards.
  - Generic slots for other devices, network card, sound card.
  - A chipset of two chips which are Northbridge and Southbridge chips
    - Northbridge ->high-performance communication between CPU, main memory and graphic cards.
    - Southbridge ->communication with I/O devices and other devices that are not perfomance sensitive.
  - Ports for I/O devices.
- Execution environment, is an environment that provides the facility to make code executable.
  - What are the supported operations, data transfer, arithmetic, control, floating-point.
  - Where are operands stored? registers, memory, stack, accumulator.
  - How many explicit operands are there for each instruction? 1, 2, 3, 4, 5
  - How is the operand location specified? register, immediate, indirect
  - What type and size of operands are supported? byte, int, float, double, string, vector,

- Objdump
  - Programs that displays information about object files
  - -d option only displays assembled contents of executable sections.
  - section is a block of memory that either contains program code or data.
  - -D displays assembly contents of all sections.
  - default syntax is the AT&T, can change it to Intel.
  - format
    - instruction address:: assembly instruction in raw hex:: assembly instruction:: comment(appears when there is a reference to an address)

- Linux file structure
  - /home -> user home directories
  - /root -> root user's home directory.
  - /boot -> boot loader, kernel files.
  - /etc -> text config files.
  - /opt -> add-on software packages, third party
  - /media -> removable media mount location.
  - /mnt -> temp mounted filesystems
  - /tmp -> temp files, usually deleted on reboot.
  - /var -> files that r/w a lot, logs, emails
  - /var/tmp -> temp files not deleted during reboot.
  - /sbin -> essential system binaries,avalaible in single user mode.
  - /bin -> essential binaries
  - /lib -> libraries for /bin and /sbin.
  - /dev -> hardware represented as files.
  - /proc - generated on the fly, process and kernel info
  - /sys -> info about devices, drivers, kernel
  - /usr -> things not needed for single user mode.
  - /usr/bin -> most command binaries
  - /usr/lib -> libraries for most commands
  - /usr/local -> stuff specific to this computer.
  - /usr/local/bin -> binaries for this comp
  
  
### Booting up computer

- A bootloader is a small program responsible for loading the kernel of an OS.
- BIOS started.
- Legacy(BIOS) mode vs EFI(Extensible Firmware Interface) mode.
- BIOS contains routines to assist our bootloader in booting our kernel, they are generic and standard
- BIOS is 16bit code meaning only 16 bit code can execute in it properly.
- Determines boot device by checking list of devices stored on CMOS.
- User can change this list by entering new device into list.
- First sector from boot device is read into memory and executed.
- BIOS looks for a bootloader to boot by searching all storage mediums for the boot signature "0x55AA".
- If the signature exists then the device is a bootable medium.
- BIOS loads bootloader into RAM at absolute address 0x7c00.
- BIOS generally loads itself into RAM then continues execution from RAM.
- When computer first boots, it is in a compatibility mode called **real mode**, which only gives us 1MB ram and only runs 16-bit code, this is based on the original x86 design.
- In this mode memory access is done through the segmentation model.(use of segments and offsets).
- Use of code, stack, data and extra segment registers.
- Address gotten from taking segment register multiplying it by 16 and adding offset.
- Different instructions use different segment registers.
- Programs can then be loaded into different areas of memory and run without problems
- When in real mode we have the same limitations as the older processors from many years ago.
- Real mode provides no memory security, no hardware security making OS highly vulnerable.
- When in real mode, only access the 8 bit and 16 bit registers directly.
- We also can only request memory address offsets of upto 65535 for our given segments.
- Bootloader then switches it to 32-bit protected mode.
- Protected mode is a processor state in x86 architectures which gives access to memory and hardware protection, different memory schemes, 4GB address space and much more.
- Ring 0 - kernel, Ring 1, Ring 2 - not used, Ring 3 - applications.
- Segment memory becomes selector memory scheme, pointing to data structures that describe memory ranges and permissions required to access them.
- Paging, memory is virtual, memory protection is easier to control.
- Checks to see how much RAM is installed and whether basic devices are installed and responding correctly.
- Starts by scanning ISA and PCI buses to detect devices attached to them.
- If new devices from last boot, new devices are configured.
- Examines partition table at the end of boot sector to determine which partition is active.
- Secondary boot loader is read in from that partition.
- Reads in the OS from active partition and start it.
- OS queries the BIOS for configuration info.
- For each device it checks to see if it has the device driver.
- Loads them into kernel once it has all of them.
- Initializes the tables, creates necessary background processes and starts login program.


### GRUB

- One of the boot sources.

### Storage concepts

- File
- Block
  - Big chunks of data.
  - Fast
  - No metadata.
  - Filesystems built on top of it.
- Object
  - Entire object has UUID.
  - Slower but cheap.

### Partition types

- GPT, GUID PARTITION TABLE.
- MBR, MASTER BOOT RECORD

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

- A program in execution, object code in execution
- Associated with each process is its address space, a list of memory locations  from 0 to some maximum which can read and write to.
- Address space contains executable program, program's data, and its stack.
- Also with each process is some resources, registers(program counter and stack pointer), open files, outstanding alarms, related processes and any other info needed to run program
- Encapsulate one or more threads sharing resources.
- Fundamental tradeoff between protection and efficiency
  - communication easier within a process.
  - communication harder between processes.
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
- The set of accessible addresses + state asscoiated with them.
     - For a 32-bit processor: 2^32 = 4 billion(10^9) addresses.
     - For a 64-bit processor: 2^64 = 18 quadrillion(10^18) addresses.
- What happens when you read or write to an address??
- Simple multiplexing has no protection, so OS must protect itself from user programs.
  - Reliability
  - Security
  - Privacy
  - Fairness
- Simple protection
  - Base and bound: user registers to constrict operating area of a program, isolating program.
  - Simple address transaltion with base and bound, use of a base address for on-the-fly translation.
  - Segments and stacks.
   - Address space translation
     - program operates in an address space that is distinct from the physical memory space of the machine.
   - Paged virtual address.
     - instructions operate on virtual addresses
     - translated to a ohysical address via a page table by the hardware.
     - any page of address space can be in any page sized frame in memory.
- Virtual memory augments processes where their address space is larger than what is available.

### Files

- Most basic and fundamental abstraction in Linux.
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

### Dual Mode Operation
        
- Hardware providea at least two modes
  - Kernel Mode
  - User Mode
- Certain Ops are prohibited when running in user mode.
- Careful controlled transitions between user mode and kernel mode.
  - syscalls
    - process requests a system service, e.g exit
    - like a function call but outside the process
    - does not have the address of the system function to call.
    - marshall the syscall id and args in registers and exec syscall.
  - interrupts
    - external asynch event triggers content switch.
    - They are like subroutines, but you don't need to know memory address to invoke them.
    - (16 bit)Interrupt Vector Table is a table describing where in memory the interrupts are, each entry is 4 bytes(offset:segment).
    - 256 interrupt handlers.
    - independent of user process.
    - e.g timer, i/o device
  - exceptions
    - internal synch event in process triggers context switch.
    - protection violation(seg fault). divide by zero

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
- Kernel is the part of the OS that is always resident in memory.
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
    - GDT contains entries telling the CPU about memory segments.
    - G/L selects between GDT and LDT tables(global vs local descriptor tables)
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

- The main purpose of computers is to create, manipulate, store and retrieve data, a file system provides the machinery to support these tasks.
- At the highest level, a file system is a way to organize, store, retrieve and manage information on a permanent storage medium such as a disk.
- The problem of storing, retrieving and manipulating information on a computer is of a general enough nature that there are many solutions to the problems.
- Variable-size buffer(Memory Address) -> Block(Logical Index, typically 4KB) -> Sector(512B or 4KB)
- A Layer of OS that transforms block interface of disks(or other block devices) into files, directories, etc.
- Take unlimited h/w interface(array of blocks) and provide a more convenient/useful interface with:
  - Naming - file files by name not block numbers.
  - Organization - map files to blocks
  - Protection - enforce access restrictions
  - Reliability - keep files intact despite crashes
- User's view vs System view vs  Os view.
- User -> File(bytes) -> File system ->Disk

- Disk management
  - Linear array of sectors
  - Entities on a disk
    - File: user-visible group of blcoks arranged sequentially in logical spacce
    - Directory: user-visisble mapping names to files.
  - Identify sectors
    - Physical position
    - Logical Block Address(LBA)
      - Rather than specify head track and sector we just specify a number that starts from zero. 
      - It allows us to read from the disk as if we are reading blocks from a very large file.
  - File system tasks
    - Track free disk blocks
    - Track which blocks contain data for which files
    - Track files in a directory
    - Track metadata on filesystem.

- Data structures on disk
  - Different thatn data structures in memory.
  - Access a block at a time.
  - Durability

- File system design
  - Hard disks performance
    - Maximize sequential access, minimize seeks.
  - Open before read/write.
    - can perform protection checks and look up where actual file resource are.
  - Size is determined as they are used
    - start samll and grow.
  - Organized into directories
    - What data structure on disk for that?
  - Need to carefully allocate/free blocks
    - Access remains efficient

- Components of a file system
  - File path
  - Directory structure
  - File number(inumber)
  - inode(file header structure)
  - Data blocks
  - Sectors per block
- Open performs name resolution, translating path name into a file number.
- Read and Write operate on the file number. use file number as an index to locate the blocks.

- A directory is a file containing file_name: file_number mappings, each mapping is called a directory entry, dentry.
- A process isn't allowed to read the raw bytes of a directory, see `readdir`
- System calls to access directories. 
- How many disk accesses to resolve a directory?

- Open syscall
  - find inode on disk from pathname
  - create "in-memory inode" in system-wide open file table
  - one entry in this table no matter how many instances of the file are open.
- read/write syscalls look up in-memory indoe using the file handle.
- ref: A five-year study of file system metadata.


### FAT(file allocation table)

- why so prevelant?


### Berkeley Fast File System


### Fast File System

- a fast file system for Unix, update of the preceding one.


### Ext 2/3 Linux

- disk divided into block groups.

- Hard links
  - mapping from name to file number in the directory structure
  - first hard link to a file is made when file created
  - create extra hard links to a file with the link() system call
  - remove links with unlink() system call
- When can file contents be delted
  - When there are no more hard links to the file
  - Inode maintains reference count for this purpose.
  
- Soft links
  - symbolic links
  - directory entry contains the path and name of the file
  - map one name to another name.
  - OS looks up destination file name each time program accesses source file name.
  - <file name, dest. file name>
  
### Windows New Technology File System(NTFS)

- Default on modern windows systems.
- Use Master File Table instead of FAT or inode array.
- Variable length extents
- Each entry in MFT contains metadata, files data directly(small), list of extents for file's data, pointers to other MFT entries with more extent lists(big).

- Memory mapped files.
  - This is where we map the file directly into an empty region of our address space.
  - mmap() map a specific region or let the system find one for you, used for both manipulating files and sharing between processes.
  - `write a sample mmap()`

- Buffer Cache
  - Kernel must copy disk blocks to main memory to access their contents and write them back if modified. data blocks, inodes, directory contents. freemap.
  - IDEA: Exploit locality by caching disk data in memory. name translations, disk blocks.
  - Memory used to cache kernel resources including disk blocks and name translations. 
  - Implemented entirely in OS software.
  - Blocks go through transitional states between free and in-use.
  - Blocks are used for a variety of purposes.
  - Replacement policy
  - How to determine cache size?
  - Prefetching, fetch blocks early.
  - Writeback cache to avoid loss of information, linux does it every 10secs.
  - Compare it against Demand paging.

- Availability - probability that the system can accept and process requests.
- Durability - ability of a system to recover data despite faults.
- Reliability - ability of a sytem or component to perform its required functions under stated conditions for a specified period of time.

- Replicate, different failure mode prefferably.

- RAID 1: disk mirroring/shadowing
  - each disk is fully duplicated onto its shadow.
  - most expensive as its 100% capacity overhead.
  - bandwidth sacrificed on write.
  - reads may be optimized.
  - use hot spare for recovery.

- RAID 5: High I/O Rate parity.
  - data stripped across multiple disks.
  - parity block constructed by XORing data blocks in stripe.
  - Incase of failure, reconstruction by XOR

- Erasure codes, must have ability to know which disks are bad.
  - Reed-Solomon error correcting codes.
  - Used also for geographic replication.
  
### Transactions

- Use it for atomic operations.
- They extend concept of atomic update from memory to stable storage, automatically update multiple persistent data structures.
- Ad-hoc approaches to transactions i.e in FFS, use of sequence of updates, temporary files and rename.
- A transaction is an atomic sequence of reads and writes that takes the system from one consistent state to another.
- They extend the concept of atomic updates from memory to persistent storage.

- Transactional File Systems
  - Better reliability through use of log.
  - Log structured vs Journaled.

- Journaling File Systems
  - Don't modify data structures on disk directly.
  - Write each update as tranasction recorded in a log.
  - Once changes are in the log, they can be safely applied to file system.
  - One a change is applied, remove its entry from the log, garbage collection.
  - Difference between ext2 and ext3 is that journal was added.
  - Users: NTFS, Apple HFS+, Linux XFS, JFS, ext4.

- Creating a File
  - Find free data blocks
  - Find free inode entry.
  - Find dentry insertion point.
  // log starts here. 
  - Write map(i.e mark used)
  - Write inode entry to point to block(s)
  - Write dentry to point to inode.
  // after commit, discard.

- Log Structured File System
  - Log is the storage.
  - One continuous sequence of blocks that wrap around whole disk, inodes put into log when changed and point to new data in the log.
  - `ref: Sprite LFS`
  - File system operations logically replay log to get result.
  - Create data structures to make this fast.
  - On recovery, replay the log.
  - Index(inodes) and directories are written into the log too.
  - Large, important portion of the log is cached in memory, relies on buffer cache to make reading fast.
  - Do everything in bulk, log is collection of large segments.
  - Each segment contains a summary of all the operations within the segment, fast to determine if segment is relevant or not.
  - Free space is approached as continual cleaning process of segments.

- Flash filesystems
  - trap electrons in floating gate.
  - program/erase wear, as wordline is raised over time.
  - higher energy state stored hence a bit heavier -10 power 8.
  - flash translation layer 
    - translate between logical block addresses(OS level) and physical flash page addresses.
    - manages wear and erasure state of blocks and pages.
    - tracks which blocks are garbage but not erased.
  - Firmware 
    - keep freelist full, manage mapping
    - track wear state of pages.
    - copy good pages out of mostly empty blocks before erasure.
  - Ex. F2FS: A FLASH FILE SYSTEM
    - used on many mobile devices.
    - latest version supports block-encryption for security.
    - has been mainstream in linux for several years.
    - assumes standard SSD interface, built-in flash translation layer, random reads as fast as sequential reads, random writes bad for flash storage.
    - minimize writes/updates and otherwise keep writes sequential, start with log-structured file system/copy-on-write file systems
    - `ref: F2FS: A New File System for Flash Storage`
    
## Distributed Systems

- Centralized vs distributed systems.
- Why do we need them?
  - cheaper and easier to build lots of simple computers.
  - easier to add power incrementally.
  - user can have complete control over some components.
  - collaboration
  - To solve bigger problems, more data than can fit on one machine.
  - To increase reliability.
  - For better performance.
- Promise
  - Higher availability
  - Better durability
  - More security
- Realist is often disappointing.
- Coordination is more difficult.
- Transparency is the ability of the system to mask its complexity behind a simple interface.
  - Location, cant tell where resources are located.
  - Migration, resources may move without user knowing.
  - Replication, can't tell how many copies of resource exist.
  - Concurrency, can't tell how many users there are.
  - Parallelism, system may speed up large jobs by splitting them into smaller pieces.
  - Fault tolerance, system hides various things that go wrong.
- Transparency and collaboration require some way for processors to communicate with one another.

- Protocols
  - A protocol is an agreement on how to communicate, syntax, semantics
  - Describes formally by a state machine, often represented as a message transaction diagram.

- Reliable communication channels on which to build distributed applications, introduce intermediate layers that provide set of abstractions for various network functionality
  and technologies.

- Drawbacks of layering
  - Layer N may duplicate layer N-1 functionality
  - Layers may need same information.
  - Layering can hurt performance.
  - Some layers are not always cleanly separated.
  - Headers start to get really big.

- `ref: End-to-End arguments in system design`
  - Alot of interpretations

- Messaging
  - no receiver gets portion of a message and two receivers cannot get same message.
  - mailbox, temporary holding area for messages
  - send(message, mbox), send messages to remote mailbox identified by mbox.
  - receive(buffer,mbox), wait until mbox has message, copy into buffer and return.
  - send/receive behaviour??
  
- Messaging for producer/consumer style.
- Messaging for request/response communication.

- Distributed consensus making
  - all nodes propose a value.
  - some nodes might crash and stop responding.
  - eventually all remianing nodes decide on the same value from a set of proposed values.
  - make decisions durable, not forgotten.
  - general's paradox.
  - Two-phase commit

- Two-Phase Commit Protocol.
  - Persistent stable log on each machine, keep track of whether commit has happened.
    - on crash recovery, check its log to recover state of world at time of crash.
  - Prepare Phase
    - global coordinator requests that all participants will promise to commit or rollback the transaction.
    - record promise in log, the ACK.
    - If anyone votes to abort, coordinator writes it and tells everyone to abort.
  - Commit Phase
    - After all participants respons that they are prepared, coordinator writes commit to its log.
    - Then asks all nodes to commit, they respond with ACK.
    - Logs commit after.
  - Failure mode, failstop.
  - Fault tolerance.
  - Undesirable feature is blocking.

- Three-phase commit.

- PAXOS
  - does not have 2PC blocking problem

- RAFT
  - Paxos alternative.
  - Simpler to describe complete protocol.

- Byzantine General Problem.
  - unsolvable for n=3.
  - for f faults, n > 3f to solve problem.
  - BFT algorithm?


## Network Protocols

- Broadcast Network Details
  - Media Access Control(MAC) Address
    - 48-bit physical address for h/w interface.
  - Delivery
    - All receive packets, ignore.
- Point-to-point networks
  - a network where every physical wire is connected to only two computers.
  - switch transforms a shared-bus config into a point-to-point network.
  - router is a device that acts as a junction between physical networks to transfer data packets among them.
- InterneT Protocol
  - best-effort packet delivery.
  - IP address, 32-bit integer.
  - NAT gateway
  - Subnet, connect host with related IP addresses, 32-bit, mask.
  - IPv4 packet format.
  - Domain Name Services
- Network Layering
  - building complex services from simpler ones.
  - each layer provides services needed by higher layers by utilizing services provided by lower layers.
  - Physical/Link layer is pretty limited, packets are of limited size(Maximum Transfer Unit), 200-1500 bytes in size.
  - Packets in envelops.
- UDP - IP protocol 17
- TCP - IP protocol 6
- DCCP - IP 33
- RDP - IP 26
- SCTP - IP 132

## Virtualization

- Type 1 hypervisor: runs directly on hardware, no need for host OS.
- Type 2 hypervisor: runs as an application on top of host OS.
- How to trick the guest OS into relinquishing hardware control?
- Design virtual machine monitors.
  - Hardware assisted virtualization (KVM/QEMU): modern CPUs have support for virtualization and VMMs are built over this support.
  - Full virtualization (VMWare): Original technique to run unmodified OS over original hardware with no virtualization support.
  - Paravirtualization (Xen): Modify OS source code to be compatible with virtualization.
- Understand how CPU, Memory, I/O devices are virtualized with each of the above techniques.
- VM live migration.
- Containers

- Process execution
  - The set of values of all CPU registers pertaining to a process execution is called its CPU context.
  - To run a process, OS allocates memory, loads CPU context.
  - OS runs multiple process concurrently by multiplexing on the same CPU.
  - Context switch, OS switches from one process to another.
  - OS has a PCB(process control block) for each process, temporarily stores context of a process when its not running.

- Virtual memory
  - Allocated at granularity of pages(4KB).
  - A piece of hardware called MMU(memory management unit) translates virtual addresses to physical addresses.
  - A page table of a process stores the mapping of logical page number ->physical frame number, built up by OS when allocating memory, used by MMU to translate addresses.
  - MMU looks up CR3 register of CPU(x86) which stores location of page table of current process, looks up page number on page table.
  - CR3 reset on every context switch.
  - Recent address translations cached on TLB(Translation Lookaside Buffer) located within MMU.
  - Hierarchial page tables, cant store a large page table contiguously in memory, so page table of a process is stored in memory in page sized chunks, i.e 32-bit has 2 levels.
  - Walking the page table.
  - Demand paging, page fault.
  - OS is part of high virtual address space of every process, some addresses are reserved for OS code.
  - Page table of process maps these kernel addresses to location of kernel code in memory.
  - Only one copy of OS code in memory, but mapped into virtual address space/page table of every process.
  - Process jumps to high virtual addresses to run OS code.

- User mode and kernel mode.
  - Unpriviliged and Unprivileged instructions.
  - Privilege levels, 0 = kernel mode, 3 = user mode.
  - Privilege level checked by CPU and MMU, every page has privilege bit.
  - When user process needs to perform privileged action, must jump to privileged OS code, set CPU to high privilege and then perform the action.
  - Kernel mode
    - A process go from user mode to kernel mode via traps, i.e system call, program fault, interrupt.
    - How is trap handled?
      - It changes CPU privilege level to high privilege/kernel mode, begins by running a CPU instruction(int n in x86).
      - It jump to OS code that handles trap and run it, lookup IDT to get address of kernel code that handles this trap, set EIP to this value, user kernel stack of process as the main stack, set ESP to this value.
      - It then returns to user code after handling trap, kernel invokes iret(x86) instruction.
      - It can choose to return to user code of another process too.

- Segmentation, alternative to paging.
  - Base and Limit addresses.
  - Virtual addresses made up of segment base and offset in segment.
  - Mostly used to check permissions.

- I/O subsystem.
  - Processes use system calls to access I/O devices.
  - DMA, Direct Memory Access to store I/O data in memory, when initiating I/O request, device driver provides (physical) address of memory buffer in which to store I/O data.(disk block)
  - Device first stores data in DMA buffer before raising interrupt, interrupt handler need not copy data from device memory to RAM.

### VMM  

- Multiple VMs running on a physical machine, multiplex the underlying machine, similar to hos OS multiplexes processes on CPU.
- VMM performs machine switch, run a VM a bit, save context and switch to another VM.
- Problem? Guest OS expects to have unrestricted access to hardware, runs privileged instructions unlike user processes.

- VMM Techniques
  - Trap and emulate VMM,
    - Guest OS runs at lower privilege level that VMM, traps to VMM for privileged operation.
    - Guest app has to handle syscall/interrupt, special trap instr traps to VMM, VMM doesnt know how to handle trap, VMM jumps to guest OS trap handler, Trap handled by guest OS normally.
    - Any privileged action by guest OS traps to VMM, emulated by VMM, sensitive data structures like IDT must be managed by VMM not guest OS.
    - One problem with this is that some x86 instructions which change hardware state run in both privileged and unprivileged modes, behave differently when is in ring 0 vs ring 1.
    - This is because instruction set architecture of x86 is not easily virtualizable, not designed with virtualization in mind.
    - Popek Goldberg theorem, in order to build a VMM efficiently via trap-and-emulate method, sensitive instructions(changes hardware state) should be a subset of privileged instructions(runs only in privileged mode).
    
- Memory virtualization
  - Shadow paging, VMM creates a combined mapping GVA ->HPA and MMU is given a pointer to this page table.
  - Extended page tables, MMU hardware is aware of virtualization, takes pointers to two separate page tables.
  - Memory reclamation techniques
    - Uncooperative swapping, VMM reclaims some guest RAM pages and swaps them to disk.
    - Ballooning, VMM opens dummy device, requests pages from VM, then swaps these pages out.
    - Memory sharing, memory pages with identical content across VMs shared between VMs.

- I/O virtualization
  - Communication between OS and device happens via device memory exposed as registers(command, status, data), I/O happens by reading/writing this memory.
  - OS can read/write device registers in two ways;
    - Explicit I/O, in/out instructions in x86 can write to device memory.
    - Memory mapped I/O; some memory addresses are assigned to device memory not RAM, I/O happening by reading/writing this memory.
  - Accessing device memory can be configured to trap to VMM.
  - Device raises interrupt when I/O completes (alternate to polling), modern I/O devices perform DMA and copy data from device memory to RAM before raising interrupt.
  - Techniques
    - Emulation, guest OS I/O operations trap to VMM, emulated by doing I/O in VMM/host OS, i.e virtio
    - Direct I/O or device passthrough, assign a slice of a device directly to each VM, more efficient than emulation, i.e sr-iov.

### Hardware-assisted virtualization

- Modern technique after hardware support for virtualization introduced in CPUs, Intel VT-X or AMD-V support, VMX mode for running VMs.
- i.e 
  - QEMU(userspace process) - works with binary translation if no h/w support.
  - KVM(kernel module) - when invoked, KVM switches to VMX mode to run guest.
  - CPU with VMX mode - CPU switched between VMX and non-VMX root modes.
- libvirt also installed, a set of tools to manage hypervisors, a daemon runs on the system and communicates with hypervisors, exposing an API using which hypervisors can be managed.

- QEMU architecture
  - QEMU is a userspace process.
  - KVM exposes a dummy device, talking to QEMU via open/ioctl syscalls
  - Allocates memory via mmap for guest VM physcial memory.
  - Creates one thread fr each virtual CPU in guest.
  - Multiple file descriptors to dev/kvm(one for QEMU, one for VM, one for VCPU).
  - Host OS sees QEMU as a regular multi-threaded process.
  - VCPU thread has kvm_run structure to share info from QEMU to KVM, runtime information stored.

- QEMU/KVM operation
  - QEMU thread calls KVM_RUN.
  - KVM shifts CPU to VMX mode via VMRESUME/VMLAUNCH, host context saved in VMCS, guest context restored.
  - Guest OS and user applications run normally.
  - Guest OS exits back to KVM, via VMEXIT, guest context saved, host restored from VMCS.
  - KVM handles exit or returns to QEMU thread.

- VMX mode
  - special CPU isntructions to enter and exit VMX mode, VMLAUNCH, VMRESUME, VMEXIT.
  - On VMX entry/exit instructions, CPU switches context between host OS to guest OS, page tables(address space), CPU register values switched, Hardware manages this mode switch.
  - VMCS, virtual memory control structure is a common memory area accessible in both modes as it cant be stored in host OS or guest OS data structures alone.
  - It is usually one VMCS per VM, KVM tells CPU which VMCS to use.
  - What is stored in VMCS?
    - Host CPU context, stored when launching VM, restored on VM exit.
    - Guest CPU context, stored on VM exit, restored when VM is run.
    - Guest entry/execution/exit control area, KVM can configure guest memory and CPU context, which instructions and events should cause VM to exit.
    - Exit information, exit reason and any other exit-related information, exchanged with QEMU via kvm_run structure.
  - Restrictions on guest OS execution, configurable exits to KVM, guest OS exits to KVM on certain instructions.
  - No hardware access to guest, emulated by KVM, i.e via virtual interrupts to guest OS during VMX mode entry.
  - Mimics the trap-and-emulate architecture with hardware support.

- Host view
  - Host sees QEMU as regular multithreaded process that has memory-mapped memory talking to KVM device via ioctl calls.
  - Multiple QEMU VCPU threads can be scheduled in parallel on multiple cores.
  - Host OS context is stored in VMCS when KVM launches a VM as its execution is suspended.
  - When guest OS exits, host OS context is restored from VMCS.
  - Host OS is not aware of guest OS execution.

### Full virtualization

- It came about since x86 and other h/w lacked virtulization support.
- The key idea is dynamic(on a need basis) binary translation of OS instructions.
- It has a higher overhead than hardware-assisted virtulization.
- Architecture
  - ioctl call to run VM
  - World switch to VMM context.
  - Guest OS and user applications run with less privilege.
  - Privileged actions trap to VMM.
  - VMM switched back to host on interrupt I/O requests etc.
  - VMM kernel driver or userspace process handle exits.
  - Common cross page mapped into host and guest address spaces.
  - VMM is located in top 4mb of guest address space, guest OS traps to VMM for privileged ops. World switch to host if VMM cannot handle trap in guest context. 

- Binary translation
  - Guest OS binary is translated instruction-by-instruction and stored in translation cache.
  - Guest OS code executes from TC in ring 1.
  - Privileged OS code traps to VMM.
  - Dynamic binary translation in that VMM translator logic translates guest code one basic block(sequence of instructions until a jump/return) at a time to produce a compiled code fragment(CCF).
  - Once CCF is created, move to ring 1 to run translated guest code.
  - An optimization called chaining can be used where if the next CCF is present in TC, jump directly to it without invoking VMM translator logic.
  - Segmentation is used to protect VMM from guest.
  
### Paravirtualization

- Modify guest OS to be amenable to virtualization without application interface changing.
- It has better performance than binary translation even though it requires code changes to OS.
- Xen architecture
  - It runs directly over hardware.
  - Trap-and-emulate architecture, Xen runs in ring 0, guest OS in ring 1 with Xen sitting in the top 64mb of address space of guests.
  - A guest VM is called a domain, a special domain called dom0 runs control/management software.
  - Guest OS code modified to not invoke any privileged instruction.
  - Hypercalls, guest OS voluntarily invokes Xen to perform privileged ops, guest pauses while Xen services the hypercall.
  - Asynchronous event mechanism, communication from Xen to domain, much like interrupts from hardware to kernel, used to deliver h/w interrupts and other notifications to domain.
  - When trap/interrupt occurs, Xen copies the trap frame onto the guest OS kernel stack, invokes guest interrupt handler.
  - Guest registers an IDT with Xen to handle traps with the guest trap handlers working off information on kernel stack, no modifications needed to guest OS code.
  - For memory virtualization, Xen uses shadow page tables but in guest memory not in VMM.
  - Guest page table is in guest memory, but validated by Xen.
  - Segment descriptor tables are also maintained similarly, as read-only copy in guest memory with updates validated and applied by Xen.
  - I/O virtualization in Xen happens via shared memory rings between geust domain and Xen/domain0.

### Live Migration

- This is the process of migrating an entire VM from one physical host to another, including all user processes and kernel state without having to shut down the machine.
- This can be due to system maintenance, distribute VM load efficiently across servers in a cloud.
- It is easier than migrating processes as VM have a much narrower interface than a process.
- Techniques;
  - Pure stop-and-copy, VM stopped, all state transferred to target, VM restarts. Too much downtime.
  - Pre-copy, Most state is transferred in the push phase, followed by a brief stop-and-copy phase.
  - Post-copy, VM stopped, bare minimum state is required to run the VM is transferred to the target host, remaining state is pulled on demand while the VM is running at the new location.
  - Hybrid, mix of pre-copy and post-copy, some pushing of state followed by stop-and-copy, followed by pulling of state on demand.
- ref paper: `Live Migration of VM`, `Post-copy based live virtual machine migration using adaptive pre-paging and dynamic self-ballooning`
- CPU context of VM and Contents of main memory are the main things migrated.
- For disk, assume NAS that is accessible from both hosts or local disk is mirrored.
- For network assume both hosts on same LAN, so migrate IP address, MAC address.
- Virtual I/O devices easier to migrate, direct device assignment of physical devices to VMs makes migration harder.
- Steps to migrate a VM
  - Setup target host B, reserve resources for the VM
  - Push phase, push some memory of VM from A to B.
  - Stop-and-copy, stop VM at A, copy CPU context and some memory.
  - Pull phase, Start VM at B, pull any further memory required from A.
  - Clean up state from host A, migration complete.
- Metrics to consider
  - Total migration time.
  - Service downtime
  - Impact on application performance.
  - Network bandwidth consumed.
  - Total pages transferred.
- Failures
  - Pre-copy can simply abort the migration, restart with another target.
  - Post-copy, source has stale memory, target has updated memory, cannot recover application data unless replication was performed.
  

### VM checkpointing and cloning

- VM checkpointing is necessary for high availability(backup) while VM cloning is needed for parallel execution of tasks.
- ref paper:`Remus: High availability via Async VM replication`, `Snowflock: Rapid VM cloning for cloud computing`
- Reliability techniques
  - Application-based replication.
    - Application communicates with other replicas and replicates state.
    - Consensus protocols like Raft or Paxos used to maintain consistency of replicated state.
    - Application decides what state to replicate.
    - Reliability via changes to application code.
  - VM-based replication or whole system replication.
    - Entire VM state(memory,CPU, disk of apps, kernel) is replicated.
    - Higher overhead than application-based.
    - Does not require application code changes.
    - VM provides easy way to capture whole system state.
- What to replicate
  - Replicate state.
  - Replay inputs, may lead to non-determinism.
- Uses of VM fork
  - Sandboxing, run untrusted code.
  - Parallel computation.
  - Load handling.
  - Opportunistic job.
  
## Containers

- They share base OS, have different set of libraries, utilities, root filesystem, view of process tree, networking, IPC endpoints, users.
- Containers offer lightweight virtualization with less overhead that VMs but also lesser isolation.
- Containers are built on
  - Namespace
    - A way to provide isolated view of a certain global resource to a set of processes, processes within a namespace see only their slice of the global resource.
    - Default namespace for all processes in Linux, system calls to create new namespaces and place processes in them.
      - Mount namespace, isolates the filesystem mountpoints seen by a group of processes.
      - PID namespace, isolates PID numberspace seen by processes, A process can see all other processes in its own or nested namespaces but not in its parent namespace.
      - Network namespace, isolates network resources like IP addresses, routing tables, port numbers, create a virtual ethernet linkto connect parent namespace to new child namespace.
      - UTS namespace, isolates the hostname seen by processes.
      - User namespace, isolates UID/GID numberspace.
      - IPC namespace, isolates IPC endpoints like POSIX message queues.
    - Namespaces API
      - clone(), used to create a new process and place it into a new namespace, general version of fork().
      - setns(), lets a process join an existing namespace,args specify which namespace and which type.
      - unshare(), creates a new namespace and places calling process into it, flags indicate which namespace to create.
  - Cgroups
    - A way to set resource limits on a group of processes.
    - Create separate hierarchies for each resource, or a combined hierarchy for multiple resources together.
    - No new sysstem calls, a special cgroup filesystem is mounted at sys/fs/cgroup.
    - Create directories and sub-directories for different resources and different user classes.
- Implementations include LXC, Docker leverage these mechanisms to build the container abstractions.
- Kubernetes and Swarm are used to manage multiple containers across hosts, along with autoscaling, lifecycle management and so on.
- Kubernetes
  - Runs over multiple physical machines(nodes) each with multiple pods.
  - A pod contains one or more containers within the same network namespace with the same IP address.
  - Pod is a tier of a multi-tier application.(frontend, backend, database, webserver)
  - K8s manages multiple nodes and their pods, instantiating pods on free nodes, auto-scaling pods when load increases, restarting pods when they crash.

