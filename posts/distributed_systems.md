---
title: Distributed Systems
description: 
date: 2023-07-01
tags:
  - distributed
  - MIT
---
`MIT 6.824: Distributed Systems`, `Introduction to Reliable and Secure Distributed Systems`


## Introduction

- Distributed computing addresses algorithms for a set of processes that seek to achieve some form of cooperation.
- The cooperation must be robust to tolerate partial failures and sometimes also adversarial attacks which also accurately detecting process failures.
- Ensure consistent cooperation.
- The challenge in distributed computing is precisely to devise algorithms that provide the processes with enough consistent information so that they can cooperate correctly
  and solve common tasks. 
- Many distributed applications have parts following a client-server interaction pattern and other parts following a multiparty interaction pattern.
- Try everything else before building distributed systems, if you can build on one node build it.
- Why build?
  - Parallelism
  - Fault torelance.
    - Availability
    - Recoverability
      - non-volatile storage
    - Replication
      - as far away as possible.
  - Physical adherance
  - Security / Isolated.

- Challenges
  - Concurrency
  - Partial Failures
  - Performance.

### Distributed Programming Abstractions

- Abstractions helps distinguish the fundamental from the accessory, preventing reinvention of solutions for same problems variants.
- Start by abstracting the underlying physical system.
  - describe the relevant elements in an abstract way.
  - identify their intrinsic properties.
  - Characterize their interactions.
- System model: Processes and Links(physical and logical network that supports communication).
- Abstractions that capture recurring interaction patterns in distributed applications.
- Cooperation among processes can be modelled as a distributed agreement problem.
  - Whether an event did or did not occur.
  - Common sequence of actions to be performed.
  - Agree on order by which a set of inputs need to be processed.
- It is desirable to establish more sophisticated forms of agreement from solutions to simpler agreement problems in an incremental manner.

### Inherent Distribution

- Information dissemination engines.
  - Publishers and subscribers, match information being published with subscribers interest.
  - Channel-based, subject-based, content-based, or type-based subscriptions.
  - One or more for each category and for each same information should be received.
  - Best-effort broadcast, Reliable broadcast.
  - May incorporate internediate cooperative brokers.
- Process control
  - Several processes have to control execution of a physical activity i.e aeroplane, nuclear station.
  - Every process is connected to some sensor, needing to exchange values output by their assigned sensors.
  - It should cooperate even when some sensors crash or do not observe anything, consensus algorithms.
- Cooperative work
  - Users on different nodes of a network may cooperate in building a common software.
  - Shared memeory abstraction is typically accessed through read and write operations by the users to store and exchange information.
  - It can be viewed as one virtual unstructured storage object, but may add a structure to create separate locations for its users.
  - To maintain a consistent view of the shared space, the processes need to agree on the relative order among write and read operations on the space.
- Distributed databases
  - All transaction managers obtain a consistent view of the running transactions and can make consistent decisions on how these transactions are serialized.
  - Abstractions can be used to coordinate transactions managers when deciding the outcome of the transactions.
  - Atomic commit.
- Distributed storage
  - A large capacity storage system distributes data over many storage nodes each one providing a small portion of the overall storage space, this may be to ensure
    falut torelance or even reduce load on a single node.
  - A data item may include error-detection codes, error-correction codes to prevent against loss or corruption of some nodes.
  
- Replication consists of making a centralized service highly available by executing several copies of it on different machines that are assumed to fail independently to ensure
  continuity even on failure.
- It can be used to improve the read performance by placing in close to processes from which it is likely to be queried.
- For effective replication, artifacts have to be maintained in a consistent state.
- This may be achieved by ensuring that all of them receive the same number of requests in the same order, total order broadcast, processes agree on the sequences of messages they deliver.
- There is usually no single solution for a given distributed computing problem, because of the variety of distributed system models, each may have different performance 
  characteristics depending on different conditions(network, load, latency, traffic)
- Enapsulating distributed systems ideosynchroncies by interfaces with well-defined interfaces significantly helps us reason about the correctness of the application and port it
  from one system to another.
- Build prototypes of the distributed application using several abstraction layers.

### Software components

- Distributed programming abstractions are typically made of a collection of components, at least one for every process, that are intended to satisfy some common properties.
- Each is identified by a name and characterized by a set of properties, providing an interface in from of events that it accepts and produces in return.
- Composition Model
  - One of the difficulties of describing distributed algorithms is to find an adequate way to represent them.
  - Use a reactive computing model where algorithms are event handlers that react to incoming events and possibly trigger new events.
- Software stacks
  - Components can be composed to build software stacks, at each process, a component represents a specific layer in the stack.
  - The application layer is at the top of the stack, whereas the networking layer is usually at the bottom.
  - Components in the same stack communicate via exchange of events.
  - Each component is constructed as a state-machine whose transitions are triggered by the reception of events.
  - Events may carry information in one or more attributes.
  - Each event is processed via a dedicated handler by the process, handler is formulated in terms of a sequence of instructions, processing of an event may result in new events being created and triggered the same or different components.
  - Events from the same component are processed in order in which they were triggered.
  - Once the event handling is terminated, the process keeps on checking if any other event is triggered.
  - A process should be able to handle membership changes and reception of messages at any time.
  - An algorithm that uses conditional event handlers relies on the run-time system to buffer external events until the condition on internal variables becomes satisfied.


- Implement
  - MapReduce
  - Raft for fault torelance
  - Use raft to build k/v server
  - Shard k/v server.

- Infrastructure for Applications
  - Storage
  - Communication
  - Computation.

- Implementations for distributes systems abstaractions
  - Remote Procedure Calls
  - Threads
  - Concurrency control

- Performance
  - Scalability speedup.

- Consistency
  - Strong consistent scheme
  - Weak consistent scheme
  
## Map Reduce

  - ref paper:`MapReduce paper`
  - takes in a Map function returns intermediate output
  - later takes in intermediate results and reduces them to single result.
  - map tasks and reduce tasks.
  - map functions should be pure.
  - Most constraining part was the network throughput.
