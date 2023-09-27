---
title: Efficient ML
description: TinyML and Efficient Deep Learning Computing
date: 2023-09-27
tags:
  - TinyML
  - Deep Learning
---

- Problem: Deep learning models outgrow hardware. 4x vs 2x every 2 years.
- Solution: Model compression to bridge the gap.

## Introductions

- Synapses/ Weights / Parameters
- Neurons / Features / Activations
- The dimensionality of these hidden layers determines the width of the model..
- Kernel calls???

- Popular Neural Network Layers
  - Fully-connected layer(Linear Layer)
    - The output neuron is connected to all input neurons.
    - Output = Weights * Input + Bias.
    - Batch size for more than one input.(Weights and Bias are input agnostic).
  
  - Convolution Layer
    - The output neuron is connected to input neurons in the receptive field.(subset of the input)
    - 1D conv, 2D conv.
    - Padding can be used to keep the output feature map size is the same as input feature map size.
    - Zero padding, Reflection padding, Replication padding, Constant padding.
    - Receptive field, each output element depends on kh*kw receptive field in the input, with L layers, receptive field size is L.(k-1)+1
    - Each successive convolution adds k-1 to the receptive field size.
    - Strided convolution layer.
  
  - Grouped convolution layers
    - A group of narrower convolutions.
  
  - Depthwise convolution layer
    - Independent filter for each channel g = c1 = c0 in grouped convolution.
  
  - Pooling layer
    - Downsample the feature map to a smaller size.
    - The output neuron pools the features in the receptive field, similar to convuolution.
    - Pooling operates over each channel independently, no learnable parameters.
  
  - Normalization layer
    - Normalizing the features makes optimization faster.
    
  - Activation Function
    - Activation functions are typically non-linear functions.

### Efficiency Metrics

- Latency
  - Measures the delay for a specific task.
  - One way to reduce is to overlap data movement and computation.
  - Computation is defined as number of operations in NN model / number of operations that processor can process per second.
  - Memory = data movt of activations / data movt of weights
  - Data movt of weights = NN model size / Memory bandwidth of processor.
  - Data movt of activations = Input + Output activation size / memory bandwidth of processor.
  
- Throughput
  - Measures the rate at which data is processed.
- Energy consumption
  - Data movt ->more memory reference -> more energy.
- Number of parameters
  - How to calculate?
- Model size
  - Model size measures the storage for the weights of the given neural network.
  - In general, if the whole neural network uses the same data type
    - Model size = #parameters * bit width(work on reducing this)
- Number of activations
  - #Activation is the memory bottleneck in inference on IoT not #parameters
- Number of Multiply-Accumulate operations
  - MAC
  - Matrix vector multiplication = m.n
  - Matrix-matrix multiplication = m.n.k
- Floating Point operations(FLOP)
  - multiply and add are flop
  - One MAC = two FLOP
  - FLOPs = per second
- Operations(OP)
  - Activations/weights in neural network computing are not always floating point.
  - Number of operations is used to measure the computation amount.
  - OPs.
