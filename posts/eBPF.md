---
title: eBPF
description: understanding packet filtering with eBPF
date: 2023-05-01
tags:
  - eBPF
  - linux
  - kernel
---
ref: `Learning eBPF`

## What and Why

- This a kernel technology that allows developers to write custom code that can be loaded into the kernel dynamically, changing the way the kernel behaves.
- This enables a new generation of highly performant networking, observability and security tools. i.e
  - Performance tracing of pretty much any aspect of the system.
  - High-performance networking, with built0in visibility
  - Detecting and optionally preventing malicious activity.
- It came to stand for Berkeley Packet Filter, introduced in linux in 1997, where it was used in the `tcpdump` utility as an efficient way to capture packets to be traced out.
- ref paper: `The BSD packet filter:New Architecture for User-level packet capture`
- later evolved to extended BPF, eBPF

- kprobes
  - allows traps to be set on almost any instruction in the kernel code.
  - developers could write kernel modules that attached functions to kprobes for debugging or performance measurement purposes.
- Ability to attach eBPF programs to kprobes added and revolutionized tracing on Linux.
- LSM(Linux Security Module) BPF
- Use `strace` to see how system calls an application makes, i.e `strace -c echo "hello".`
- Because applications rely heavily on the kernel, we can learn more about how they behaves if we can observe its interactions with the kernel.
- eBPF allows us to add instrumentation into the kernel to get these insights.

- Kernel Modules
  - loaded and unloaded on demand
  - easy way to change how a kernel behaves.
  - can be distributed for use independent of official Linux release.
  - One downside is that if they crash, it takes down the machine and everything running in it.

- The system call for interacting with the eBPF is bpf(), helper functions start with bpf_ with the different types of eBPF programs starting with BPF_PROG_TYPE.
- eBPF comes with eBPF verifier which ensures programs are loaded only when it is safe to run, no data compromise, no hard loop, won't crash machine.
- eBPF programs can be dynamically loaded and unloaded form the kernel, once attached to an event they will be triggered by that event regardless of what caused the event.
- This leads to one of the great strengths of observability or security tooling that uses eBPF,
  it instantly gets visibility over everything happening on the machine.
- In environments running containers, this included visibility over all processes running inside those containers as well as on the host machine.
- eBPF programs are a very efficient way to add instrumentation, once loaded and JIT-compiled the program runs as native machine instructions on the CPU.
- Additionally, there is no need to incur the cost of transitioning between kernel and user space to handle every event.
- For performance tracing and security observability, relevant events can be filtered within the kernel before incurring the costs of sending them to user space.
- eBPF programs can collect information about all manner of events across a system and they can use complex, customized programmatic filters to send only the relevant
  subset of information to user space.
- eBPF in Cloud Native Environments, containers, k8s, ECS, Lambda, Cloud functions, Fargate, all use automation to determine which server to run.
- Each of those servers has a kernel, even in containers, they share a kernel, all containers in all pods on a given too share a kernel, so all workloads can be visible to eBPF instrumented tools.
- Contrast this with the `sidecar model`, used to add logging, tracing, security and service mesh functionality into K8s, here instrumentation is run as an 'injectable' container into each application pod.
- Downsides of the sidecar approach
  - Application pod has to be restarted.
  - Application YAML has to be modified.
  - Containers may reach readiness at different times.
  - Latency addition for network functionality. 
 