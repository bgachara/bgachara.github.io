---
layout: layouts/post.njk
title: Projects
templateClass: tmpl-post
menu: 
  visible: true
  order: 4
---

## Projects

- This is a list of personal projects implemented in the pursuit of better conceptual understanding or language exploration or both, the format includes the goal of the project, lessons learned, language implemented in, possible improvements, side notes and and a Github link to it.
- Thank you!

### Arithmetic Expression Evaluator
- **Goal**: Understanding how one would implement one.
- **Lessons**: It is very tricky to implement one.
- **Language**: Rust
- **Side Note**: This parsing thing, it be no easy ooh!!
- **Status**: Arithmetic under BODMAS works well, next up might be build it out into a parser combinator type library.
- **Github Link**: [Arithmetic](https://github.com/bgachara/prac_sys_prog/tree/main/cli_app)  

### Templating engine
- **Goal**: Understanding how a templating engine like the one in Django or Handlebars works.
- **Lessons**: Foundational knowledge in concepts like parsing helps a whole lot.
- **Language**: Rust
- **Side Note**: I might just decide to build it out fully.
- **Status**: Cli parsing done for now.
- **Github Link**: [Template](https://github.com/bgachara/prac_sys_prog/tree/main/cli_app)  

### Stock Trading Engine
- **Goal**: Understanding how different oder types are handled and how interfaces to such a system plus the preferred data structures.
- **Lessons**: A trading engine is a complex and huge system to handle every aspect through and through alone.
- **Language**: Rust
- **Side Note**: Hats off to the engineers at various trading firms, this is cool.
- **Status**: Implemented Limit orders, next up market order and stop loss orders.
- **Github Link**: [Mvml](https://github.com/bgachara/mvml)  

### GameBoy Emulator
- **Goal**: Understanding how different CPU types work, in this case the one in the gameboy.
- **Lessons**: Not all that computes is a CPU.
- **Language**: Rust
- **Side Note**: I might need to do another CPU just to get this emulation thing understood well.
- **Status**: Done implementing the CPU and memory components, might include the screen next.
- **Github Link**: [GameBoy](https://github.com/bgachara/gameboy_emulator)
  
### Virtual Machine
- **Goal**: Peer into the working of a language virtual machine.
- **Lessons**: Virtual machine are not easy, scope of this is immense.
- **Language**: Javascript.
- **Side Note**: I might have to port this to Rust so that I can suffer even more and also include binary translation for more tears.
- **Status**: I have to do more CPU instructions, expand the number of instructions allowed then start on the IR.
- **Github Link**: [LLJSVM](https://github.com/bgachara/lljsvm)

### Very Lite Database
- **Goal**: Dive into the world that is data storage, access, transform and analysis.
- **Lessons**: If you play with a system enough times, you can understand any part of it.
- **Language**: Rust.
- **Side Note**: I might make this my ideal labour of love, port all of Postgres to Rust through this.
- **Status**: Right now it is acting as a Key value store, next step is to incorporate data fusion and see what next from there.
- **Github Link**: [Postgres Lite](https://github.com/bgachara/kvstore)

  
