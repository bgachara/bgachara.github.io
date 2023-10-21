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
- Performance is a field where the more you learn about systems, the more unknown-unknowns you become aware of, which are then known-unknowns that you can check on.

## Goals

- Improve end user experience by reducing latency.
- Reduce computing cost by eliminating inefficiencies, improving system throughput and general tuning.

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
- Since it can be measured from different locations, it is often expressed with the target of the measurement, i.e for a website it may composed of
  DNS latency, TCP connection latency and TCP data transfer time.
- It is an ambiguous term, it is best to include qualifying terms to explain what it measures: request latency, connection latency.
- It is a time based metric hence perf issues can be quantified using it then ranked.
- Predicted speedup can also be calculated, by considering when latency can be reduced or removed.
- When posssible, converting other metrics types to latency or time allows them to be compared.

## Observability

- This refers to understanding the system through observation and classifies the tools that accomplish this.
- This include tools that use counters, profiling and tracing.
- Metric is a statistic that has been selected to evaluate or monitor a target.
- Monitoring s/w also support creating custom alerts from these metrics.
- Counters(applications/kernels - /proc) ->Statistics(Perf tools/agents - vmstat, collectd) ->Metrics(Perf monitoring - Grafana) ->Alerts(event processing - Prometheus)

## Profiling

- This refers to the use of tools to perform sampling, to paint a coarse picture of the target, coarseness depending on the rate of sampling.
- It is typically performed by sampling the state of the system at timed intervals and then studying set of samples.
- example: CPU usage can be profiled by sampling the instruction pointer or stack trace at frequent intervals to gather statistics on code paths consuming CPU resources.
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
  - This allows custome performance statistic to be created from any running s/w.
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
- Given an issue X, procedures on how to move quickly through tools and metrics to find the root cause, knowing which ones are important and when they point to an issue,
  and also how to use them to narrow down an investigation.

## Terminologies

- IOPS
  - Input/Output operations per second is a measure of the rate of data transfer operations, i.e for disk I/O this is reads and writes per second.
- Throughput
  - The rate of work performed or the operations per second, operation rate.
- Response time
  - The time for an operation to complete, waiting time + service time and result transfer time.
- Latency
  - A measure of time an operation spends waiting to be serviced.
- Utilization
  - This is the measure of how busy a resource is, based on how much time in a given interval it was actively performing work.
  - Typically used for device usage and can be time-based(avg time a resource was busy) or capacity-based(based on throughput and proportion of its capacity).
  - Time: U=B/T
- Saturation
  - The degree to which a resource has queued work it cannot service.
  - It begins to occur at 100% utilization.
- Bottleneck
  - This is a resource that limits the performance of the system, identifying and removing them is a key activity of P.E.
- Workload
  - The input to the system or the load applied is the workload, i.e for a database this is queries and commands sent by the clients.
- Cache
  - A fast storage area that can duplicate or buffer a limited amount of data, to avoid communication directed with a lower slower tier of storage.
  - One metric for understanding cache performance is each cache's hit ratio, equal to hits/(hits+misses)
  - Cache miss rate is also a metric used, proportional to performance penalty of each miss and easy to interpret.
  - Runtime = (hit rate * hit latency) + (miss rate * miss latency)
  - Cache management algo's and policies determine what to store in the limited space available for a cache.
  
## Models

- System Under Test
  - Input(Workloads) -> SUT(perturbations) ->Resulting Performance
  - Pertubations can affect results.
  - Input workloads may serviced by several networked components, load balancers, proxies, web, caching, application servers and storage systems.
  - The mere act of mapping the environment may help reveal previously overlooked sources of pertubations.

- Queueing system
  - The environment,some components and resources may be modelled as a network of queueing systems for prediction under that model.
  - Disks are commonly modelled as queueing system, which can predict how response time can degrade under load. 

## Time scales

- While times can be compared numerically, it also helps to have an instinct about time and reasonable expectations for latency from different sources.
- System components operate over vastly different time scales to the extent that it can be difficult to grasp just how big the differences are, i.e 
  1 CPU cycle(0.3ns) vs H/W virtualization system boot(40s).

## Trade-offs

- Common performance trade-offs, good(high-performance)/fast(on-time)/cheap(inexpensive) "pick-two" tradeoff.
- Another common perfromance tuning trade-off is between CPU and memory.
- Tunable parameters also come with trade-offs:
  - File system record size(block size)
    - small record sizes, close to the application I/O will perform better for random I/O workloads and make more efficient use of file system cache
      while application is running. Large record sizes will improve streaming workloads, including file system backups.
  - Network buffer size
    - small buffer sizes will reduce the memory overhead per connection, helping the system scale, large sizes will improve network throughput.

## Tuning efforts

- This is most effective when done closest to where is performed, for workloads driven by application this means in the application itself.
- By tuning at the application level, you may be able to eliminate or reduce database queries and improve performance by a large factor, i.e 20x.
- Tuning at the storage level may eliminate or improve storage I/O but a tax has already been paid for executing higher-level OS code so minimal improevements.
- Many of today's environments target rapid deployment for features and functionality, pushing software changes into production weekly or daily, 
  application development and testing focusing on correctness leaving no time for performance measurement or optimization before deployment.
- While application level can be the most effective level at which to tune, it isn't necessarily the most effective level from which to base observations.
- Slow queries may be best understood from their time spent on CPU or from the file system and disk I/O they perform, these are obserble from OS tools.
- Operating system perfromance analysis can also identify application-level issues.

### Sample tuning targets

- Application
  - application logic, request queue size, database queries performed.
- Database
  - database table layout, indexes, buffering
- System calls
  - memory-mapped or read/write, sync or async I/O flags
- File system
  - record size, cache size, file system tunables, journaling
- Storage
  - RAID level, number and type of disks, storage tunables.
  
## Level of appropriateness

- System performance is not just about cost, it is also about end-user experience.
- When to stop:
  - When you've explained the bulk of the performance problem.
  - When the potential ROI is less than analysis cost.
  - When there are bigger ROIs elsewhere.

## Point-in-Time recommendations

- The perfromance characteristics of environments change over time, due to addition of more users, newer hardware and updated software or hardware.
- Performance recommendations, especially the values of tunable parameters are valid only at a specific point in time, quickly invalidating the earlier advice.
- Important to check appropriatness of general recommendations to your workload and system.
- When chaning tunable parameters, it can be helpful to store them in a version control system with a detailed history, or with configuration tool (Puppet, Salt, Chef)

## Load vs Architecture

- An app can perform badly due to an issue with the software configuration and hardware on which its running, architecture and implementation.
- It can also perform badly due to the load applied resulting in queueing and long latencies.
- Application ->Web server ->Database ->Operaing system.
- If analysis ofarchitecture shows queueing of work but no problem with how work is performed then the issue may be too much load is applied, requiring more servers.
- Architecture Issue
  - A single-threaded application that is busy on-CPU with requests queueing while other CPUs are available and idle.
  - In this case, performance is limited by the application's single-threaded architecture.
  - Another one is a multi-threaded application contending on a single lock.
- Load Issue
  - A multithreaded application that is busy on all CPUs, with requests still queueing.

## Scalability

- The performance of the system under increasing load its scalability.
- Knee point - a point is on a linear scale where contention for a resource begins to degrade throughput, it is the boundary between two functions.
- Overheads for increased contention and coherency cause less work to be completed and throughput to decrease.
- The point occurs when component reaches 100% utilization, plus when utilization and queueing begins to be frequent and significant, saturation point.
- Example system
  - An application that performs heavy computation with more load added with additional thread.
- Fast degradation profile may occur for memory load while slow degradation occurs for CPU load.
- Linear scalability of response time could occur if the application begins to return errors when resources are unavailable, instead of queueing work.

## Metrics

- Performance metrics are selected statistics generated by the system, applications or additional tools that measure activity of interest,
  they are studied for performance analysis and monitoring, either via command line or using visualizations.
- Types
  - IOPS
  - Throughput
  - Utilization
  - Latency
- Overhead
  - perf metrics are not free, at some point, CPU cycles must be spent to gather and store them, causing overhead.

## Perspectives

### Workload analysis, top-down.

- This examines the performance of applications, workload applied and how the application is responding.
- It is commonly used by application developers and support staff, responsible for application software and configuration.
- Targets for workload analysis
  - Requests, workload applied
  - Latency, response time of the application
  - Completion, looking for errors.
- Studying workload requests typically involves checking and summarizing their attributes, workload characterization.
- For databases, these attributes include client host, dbname, tables and query string.
- Examination of these attributes even on a good system may identify ways to reduce or eliminate the work applied.
- Latency is most important metric for expressing application performance.
- The tasks of workload analysis include identifying and confirming issues, i.e latency beyond a certain threshold.
- Starting at the application, investigating latency involves drilling deeper into the application, libraries and OS(kernel).
- System issues may be identified by studying characteristics related to the completion of an event, error status causing retry accumulating latency.
- Latency and throughput are best suited for workload analysis, measuring rate of requests and resulting performance.

### Resource analysis, bottom-up.

- It begins with analysis of system resources: CPUs, memory, disks, network interfaces, buses and interconnects
- Activities include
  - Performance issue investigation, see if a particular resource is available.
  - Capacity planning, size new systems and see when system resources may be exhausted.
- This perspective focuses on utilization, identify when resources are at their limit.
- Some resource types have readily available utilization metrics while others can be estimated based on available metrics.
- Metrics best suited for resource analysis include: Throughput, IOPS, Utilization, Saturation.
- These measure what resource is being asked to do and how utilized or saturated it is for a given load.  

## Methodologies

- They help you approach these complex systems by showing where to start your analysis and suggesting an effective procedure to follow.

### Generic Methodologies

#### Observational analysis

- Streetlight anti-method
  - This is the absence of deliberate methodology.
  
- Ad hoc checklist method
  - Step through a canned checklist, lists are ad-hoc and built from recent experience and issues for that system type.
  - They focus on issues for which there are known fixes that can be easily documented, i.e tunable parameters.
  - They are point-in-time recommendations and need to be refreshed frequently to stay current.
  
- Scientific method
  - It studies the unknown by making hypothesis and then testing them.
  - Steps: Question(perf problem statement) ->Hypothesis ->Prediction ->Test ->Analysis.

- Diagnosis cycle
  - Similar to the scientific method, Hypothesis ->Instrumentation ->Data ->Hypothesis
  - Try to move from hypothesis to data quickly so that bad theories can be identified early and discarded and better ones developed.
  
- Tools method
  - Approach
    - List available performance tools.
    - For each tool, list useful metrics it provides.
    - For each metric, list possible ways to interpret it.
  - The result is a prescriptive checklist showing which tool to run, which metrics to read and how to interpret them.
  - Likely to miss issues that may be identified via dynamic tracing, custom tooling.
  - It can also be time consuming to iterate via all the tools, with some having cross-functionality.
  
- USE method
  - For every resource(physical server functional components), check utilization, saturation and errors.
  - Iterate over system resources instead of tools, helping you create a list of questions to ask and only then do you search for tools to answer them.
  - Even when there are no tools, the fact that there are unanswered questions can be useful for performance analyst.
  - Resource list: Sockets, cores, h/w threads, DRAM, ethernet ports, disks, storage adapters, GPUs, TPUs, FPGAs, Storage, Network, CPU, memory, I/O.
  - Metrics: consider metric types appropriate to each, averages, per interval or counts.
  - It is most effective for resources that suffer perfromance degradation under high utilization or saturation.
  - Functional block diagram.
  - Sofware resources: Mutex locks, Thread pools, Process/thread capacity, File descriptor capacity.
  - Resource controls partocularly in cloud environs can also be examined via USE method.
  - Microservices too can utilize the USE method.
  
- RED method
  - Focus of this method is microservices, for every service, check request rate, errors and duration.
  - Complementary to USE method in that USE monitors machine health while RED monitors user health.
  
- Workload characterization
  - Focuses on the input of the system.
  - Answer questions
    - Who is causing the load? process id, user id, remote IP address?
    - Why is the load being called? code path? stack trace?
    - What are the load characteristics? IOPS, throughput, read/write type?
    - How is the load changing over time?
  - WC can also be used in design of simulation benchmarks.
  - Tools and metrics to be used depend on the target.
  
- Drill-down analysis
  - Starts with examining an issue at a high-level then narrowing focus based on findings, discarding some and digging deeper into interesting ones.
  - Three stage process
    - Monitoring; used to continually record hig-level statistics over time and identifying or alerting if a problem is present.
    - Identification; given a suspected problem, identify possible bottlenecks.
    - Analysis; further examination of particular system areas is done to attempt to root-cause and quantify the issue via tracing and profiling.
  - One can also employ the 5 Whys.
  
- Latency analysis
  - Latency analysis examines the time taken to complete an operation and then breaks it into smaller components, continuing to subsidivide the components with 
    the highest latency so that the root cause can be identified and quantified.
    
- Method R
  - Performance analysis methodology developed for Oracle databases that focuses on finding the origin of latency.
  
- Event tracing
  - Systems operate by processing discrete events, perf analysis studies summaries of these events, details can be lost in the summary and some of these events
    can be best understood when inspected individually.
  - When performing event tracing, look for Input(all attributes of an event request), Times(start time, end time, latency) and Result(error status, result of event).

- Baseline statistics
  - This involves collecting all the system metrics when the system is under normal load and recording them for later reference.
  
- Static performance tuning
  - Focuses on issues of the configured architecture, when system is at rest and without any load.
  - Step through components of the system and check, configuration, required, makes sense, any errors.
  
- Performance monitoring
- Linux perf analysis in 60s
- CPU profiling
- Off-CPU analysis
- Cycle analysis
- Leak detections
- Disk analysis
- Packet Sniffing
- TCP analysis
- Active benchmarking
- Sanity check

#### Experimental analysis

- Random change anti-method
  - Experimental anti-methodology where the user guesses what it might be and then changes things until it goes away, aided by a given metric.
  
- Micro-benchmarking
  - This tests the performance of simple and artificial workloads.
  - i.e Linux iperf(), TCP throughput test.
  - Common targets; syscall time, file system reads, network throughput.
  
- Memory shrinking
- Passive bechmarking
- Ramping load
- Queueing theory
- Quantifying performance gains

#### Tuning

- Cache tuning
  - Applications and operating systems may employ multiple caches to improve I/O performance from application down to disk.
  - Aim to cache as high as possible closer to where the work is performed, reducing operational overheads of cache hits.
  - Consider overall performance gain of each level of cache tuning.
  
- Performance mantras
  - This is a tuning methodology that shows how best to improve performance, listing actionable items in order from most to least effective.
  
- Priority tuning
- Resource controls
- CPU binding
- Workload separation
- Scaling

#### Software development

- Custom benchmarks

#### Problem Statement

- Define the problem statement via asking a given number of questions, i.e
  - What has changed recently? S/w, H/w
  - What makes you think this is a performance problem?
  - Can the problem be expressed in terms of latency or runtime?
  - What is the environment? Config? S/w or H/w??
- Ideally should be the first approach when tackling a new issue.


## Modelling

- Analytical mdoelling of a system can be used for scalability analysis.
- It is considered the third type of performance evaluation after measurement and simulation.
- Analytical modelling can be used to predict performance and can be based on the results of meaurements and simulation.
- Cloud environments allow us to test and model any environment types.
- Can be complemented by use of visual identifications.

- Amdahl law of scalability
  - It models system scalability, accounting for serial components of workloads that do not scale in parallel.

- Universal scalability law

- Queueing Theory
  - This is the mathematical study of systems with queues, providing ways to analyze their queue length, wait time(latency) and utilization(time-based).
  - Little Law, L(average number of requests in a system) = average arrival rate * average request time in the system.
  - Queueing systems
    - Arrival process
    - Service time distribution
    - Number of service centers
  - Questions that can be answered using queueing systems
    - What will the mean response time be if the load doubles?
    - What will be the effect on the mean response time after adding an additional process?

## Capacity Planning

- Capacity planning examines how well a system will handle load and how it will scale as load scales, studying resource limits and factor analysis.
- For capacity planning of a particular application, it helps to have a quantified performance objective to plan for.
- Resource Limits
  - This method is a search for the resource that will become a bottleneck under load.
- Factor analysis
  - When purchasing and deploying new systems, there are often many factors that can be changed to achieve the desired performance.
- Scaling solutions
  - Vertical scaling vs horizontal scaling.
  
## Statistics

- It is important to have a good understanding of how to use statistics and what their limitations are.
- Quantifying performance issues and their potential improvement for fixing them allows them to be compared and prioritized.
- This may be observation-based or experimental-based.
- Averages, Standard deviations, Percentiles, Median

## Monitoring

- System performance monitoring records performance statistics over time so that the past can be compared to the present and time-base usage patterns can be identified.
- This is useful for capacity planning, quantifying growth and showing peak usage.
- Time-based patterns
  - Hourly, Daily, Weekly, Quarterly and Yearly.
- Monitoring products
  - Most operate by running agents on the system to gather statistics.
  - Invoke OS observability tools or read directly from OS libraries and kernel.
- Summary-since-boot

## Visualizations

- They enable pattern matching and pattern recognition as more data is easily examined and understood.
- This can be an easy way to identify correlations between different metric sources, which may be difficult to accomplish programmatically.
- i.e Line charts, Scatter plots, Heat Maps(column quantization), Timeline charts, Surface plots 
  