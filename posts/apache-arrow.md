---
title: Apache Arrow
description: Apache arrow and its ecosystem
date: 2024-02-18
tags: 
  - Apache Arrow
  - Flight SQL
  - Apache Parquet
  - Datafusion
  - Ballista 
  - Arrow Flight
---

## In-Memory Analytics

- AA is a development platform for in-memory analytics, it contains a set of technologies that enable big data systems to process and move data fast. It specifies a standardized
  language-independent columnar memory format for flat and hierarchical data, organized for efficient analytic operations on modern hardware.
- Arrow is a collection of libraries and specifications that make it easy to build high-performance software utilities for processing and transporting large datasets, it consists
  of a collection of libraries relating to in-memory data processing, including specifications for memory layouts and protocols for sharing and efficiently transporting data between
  systems and processes.
- When data is stored on disk, the biggest concerns are the size of data and I/O cost to read it into the main memory before you can operate on it and as such on-disk formats tend
  to be focused much more on increasing I/O throughput such as compressing the data to make it smaller and faster to read it in memory. i.e Parquet.
- The format of the raw Arrow data is the same over the wire as it is in memory, you can directly reference the memory buffers used for the network protocols without having to 
  deserialize that data before you can use it or reference the memory buffers you were operating on to send it across the network.
- Operations such as grouping, filtering or aggregations based on column values are more efficient since column is already contiguous in memory, which further enables vectorization of
  computations by taking advantage of SIMD instructions.

- Arrow columnar format specification includes definitions of the in-memory data structures, metadata serialization and protocols for data transportation. Among its key promises include;
  - Data adjacency for sequential access.
  - Constant time random access.
  - SIMD and vectorization friendly.
  - Relocatable, allowing for zero-copy access in shared-memory.
  
- Arrow Terms
  - Array, Slot, Buffer/contiguous memory region, Physical layout, Parent/Child arrays, Primitive type, Nested type, Logical type.
  - Logical types have a well-defined physical layout in the specification, with the physical layout for the most part only affecting the sequence of buffers that make up the raw data.
  - Apart from union data type, all the arrays have a validity bitmap as one of their buffers.
  
- Array layout in memory
  - A logical data type (identified by an enum value and metadata)
  - A group of buffers.
  - Length as a 64-bit signed integer.
  - Null count as a 64-bit signed integer.
  - Optionally, a dictionary for dictionary-encoded arrays.

- In a nested array, there would be child arrays with such additional sets of information.
- A record batch is a common concept when interacting with Arrow that refers to a group of equal length arrays and a schema, often they are subset of rows of a larger dataset with the 
  same schema. Record batches are a useful unit of parallelization for operating on data.
- Support for working on slices available too.

*Take a row-wise list of objects and convert them to a column oriented record batch*  

### Working with Key Arrow Specifications. 

- Arrow libraries provide functionalities for reading data from and interacting with multiple data formats in different locations.


