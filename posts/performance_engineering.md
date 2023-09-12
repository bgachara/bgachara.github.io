---
title: System Performance
description: Understanding system performance
date: 2023-08-01
tags:
  - performance
---

`Systems performance enterprise and the cloud`

Performance issues can originate from anywhere, including areas of the system that you know nothing about and are therefore not checking.

## System performance

- Studies the performance of an entire computer system, including major software and hardware systems, anything in the data path from storage devices to application s/w.
- For distributed systems this means multiple servers and applications.
- Have a diagram of your environment data path, helps understand relationships between components and ensure you don't overlook entire areas.

## Goals

Improve end user experience by reducing latency.
Reduce computing cost by eliminating inefficiencies, improving system throughput and general tuning.

## System s/w stack

- User level
  - Application
  - Database
  - System libraries
  - Compilers
- Kernel-level
  - System calls
  - Thread Scheduler
  - File systems
  - Network stack
  - Virtual memory
  - Device drivers
  - Devices

## Performance engineer

- They work with multiple teams to perform a holistic study of the environment, an approach vital in resolving complex performance issues.
- They also act as a central resource to find and develop better tooling for performance analysis and capacity planning across the whole environment.

## Activities

- Setting performance objectives and performance modeling for a future product.
- Performance characterization of prototype software and hardware.
- Performance analysis of in-development products in a a test environment.
- Non-regression testing for new product versions.
- Benchmark product releases.
- Proof-of-concept testing in the target production environment.
- Performance tuning in production.
- Monitoring of running production software.
- Performance analysis of production issues.
- Incident reviews of production issues.
- Performance tool development to enhance production analysis. 

- Canary testing - vary the production workload on an instance during testing.
- Blue-green deployment - move traffic gradually to new instances leaving old one online as backup.
- Capacity planning - studying resource footprint against the target needs.

## Perspectives

- Workload analysis
  - Application down.
- Resource analysis
  - H/w up.

## Latency

- This is a measure of time spent waiting and is an essential performance metric, broadly means time for any operation to complete.
- It allows maximum speedup to be estimated.

## Observability

- This refers to understanding the system through observation and classifies the tools that accomplish this.
- This include tools that use counters, profiling and tracing.
- Metric is a statistic that has been selected to evaluate or monitor a target.
- Monitoring s/w also support creating custom alerts from these metrics.
- Counters(applications/kernels - /proc) ->Statistics(Perf tools/agents - vmstat, collectd) ->Metrics(Perf monitoring - Grafana) ->Alerts(event processing - Prometheus)

## Profiling

- This refers to the use of tools to perform sampling, to paint a coarse picture of the target.
- CPUs are a common profiling target.
- Most common method is taking the timed-interval samples of the on-CPU code paths.
- CPU flame graphs
- They reveal not only CPU issues, but other types of issues as well, found by the CPU footprints they leave behind.

## Tracing

- This is event-based recording, where event data is captured and saved for later analysis or consumed on-the-fly for custom summaries and other actions.
- System calls - strace, network packets - tcpdump.
- General purpose tools - ftrace, bcc, bpftrace.
- They use a variety of event sources, static or dynamic instrumentation and BPF for programmability.
- Static instrumentation
  - Describes hard-coded instrumentation points added to the code.
  - There are hundreds of these points in the kernel that instrument disk I/O, scheduler events, system calls and more.
  - Tracepoints - static instrumentation for kernel-space.
  - User statically defined tracing - user-space static instrumentation, used to instrument library calls and service requests
- Dynamic instrumentation
  - It creates instrumentation points after software is running, by modifying in-memory instruction to insert instrumentation routines.
  - THis allows custome performance statistic to be created from any running s/w.
  - Dtrace, kprobes, BPF(generic in-kernel execution environment)

## Experimentation

- Most of this are benchmarking tools.
- They perform an experiment by applying a synthetic workload to the system and measuring its performance.
- This should be done carefully since experimentation tools can perturb the performance of systems under test.
- Macro and micro benchmark.

## Methodologies

- They are a way to document the recommended steps for performing various tasks in systems performance.
- Working without one can easily turn into a fishing expedition, time consuming and ineffective.
- `Linux perf analysis in 60 seconds`