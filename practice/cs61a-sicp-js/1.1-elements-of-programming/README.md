# CS61A SICP JavaScript - Practice Directory

## Overview

This directory contains hands-on practice exercises for CS61A's Structure and Interpretation of Computer Programs (JavaScript Edition).

## Philosophy

**Practice First, Theory Second**

As stated in the learning plan:
- **practice/** → Build muscle memory through hands-on coding
- **knowledge/** → Understand why things work
- **learning-summary/** → Document your insights and connections

## Directory Structure

```
practice/cs61a-sicp-js/
├── 1.1-elements-of-programming/
│   ├── 1.1.1-expressions/
│   │   ├── practice.js          # Practice exercises
│   │   ├── solutions.js         # Reference solutions
│   │   └── README.md            # Section notes
│   ├── 1.1.2-naming-and-environment/
│   ├── 1.1.3-evaluating-combinations/
│   ├── 1.1.4-compound-functions/
│   ├── 1.1.5-substitution-model/
│   ├── 1.1.6-conditionals/
│   ├── 1.1.7-newtons-method/
│   └── 1.1.8-black-box-abstractions/
└── README.md                    # This file
```

## How to Use This Directory

### For Each Section:

1. **Read the knowledge content first**
   - Go to `knowledge/cs61a-structure-and-interpretation-of-computer-programs-javascript-edition/`
   - Read the corresponding section
   - Focus on understanding the concepts

2. **Complete the practice exercises**
   - Open the practice.js file in your section
   - Follow the instructions in the comments
   - **Predict before you run** - this builds mental models
   - Run the code in a REPL (browser console or Node.js)
   - Check if your prediction was correct

3. **Check your understanding**
   - Compare with solutions.js (if available)
   - Answer the reflection questions
   - Move to the next section only when comfortable

### Running the Code

**Option 1: Browser Console**
```javascript
// Copy and paste into browser DevTools console
// Works great for quick experiments
```

**Option 2: Node.js REPL**
```bash
# Navigate to the practice directory
cd practice/cs61a-sicp-js/1.1-elements-of-programming/1.1.1-expressions

# Start Node REPL
node

# Load and run the practice file
.load practice.js
```

**Option 3: Node.js Direct**
```bash
# Run the practice file directly
node practice.js
```

## Key Learning Objectives

### Chapter 1.1: The Elements of Programming

By the end of this chapter, you should be able to:

1. **Evaluate expressions** - Understand how JavaScript executes code
2. **Use naming** - Leverage the environment for abstraction
3. **Build functions** - Create compound operations
4. **Trace execution** - Use the substitution model mentally
5. **Write conditionals** - Implement decision logic
6. **Understand abstraction** - Use black-box thinking

## Progress Tracking

Track your completion of each section:

- [ ] 1.1.1 - Expressions
- [ ] 1.1.2 - Naming and the Environment
- [ ] 1.1.3 - Evaluating Operator Combinations
- [ ] 1.1.4 - Compound Functions
- [ ] 1.1.5 - The Substitution Model ⭐ CRITICAL
- [ ] 1.1.6 - Conditional Expressions
- [ ] 1.1.7 - Newton's Method (Example)
- [ ] 1.1.8 - Black-Box Abstractions

## Common Pitfalls

### Don't Rush

The substitution model (1.1.5) is **the most important section**. If you rush through it:
- You'll struggle with recursion later
- Debugging will be harder
- Reading code will be confusing

**Take your time.** Practice tracing until it's second nature.

### Predict Before Running

Always try to predict the result before running code. This:
- Builds your mental model of execution
- Reveals misconceptions immediately
- Makes learning active, not passive

### Use Source Academy

[Source Academy](https://sourceacademy.org/) has:
- Interactive exercises
- Visualizations
- Built-in interpreter
- Progress tracking

Use it alongside these practice files.

## Resources

- **Textbook**: [SICP JavaScript](https://sourceacademy.org/sicpjs/)
- **Source Academy**: [sourceacademy.org](https://sourceacademy.org/)
- **Knowledge files**: `../knowledge/cs61a-structure-and-interpretation-of-computer-programs-javascript-edition/`

## Support

If you're stuck:
1. Re-read the corresponding knowledge section
2. Try a simpler example
3. Use Source Academy's interactive environment
4. Take a break and come back later

---

**Remember**: *"A computer is like a violin...it sounds terrible until you learn how to use it."* - Marvin Minsky

Practice is the only way to make music. 🎵
