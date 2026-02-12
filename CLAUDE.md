# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JavaScript/TypeScript learning roadmap for OpenCoach development. Progressive 11-module curriculum taking learners from fundamentals to production-ready TypeScript. Each module (00-10) has `practice/` files with examples and `exercises/` files with TODO tasks.

## Development Commands

```bash
# Run any TypeScript file
npx tsx <path-to-file>

# Run with auto-watch
npx tsx watch <path-to-file>

# Type-check without running
npm run check <path-to-file>
```

## Project Structure

```
00-fundamentals/         # JavaScript basics (variables, functions, loops, arrays)
01-typescript-basics/    # Types, interfaces, generics
02-async-programming/    # Promises, async/await
03-node-and-modules/     # ES modules, npm, env vars
04-database-basics/      # Drizzle ORM, SQL (TODO)
05-web-server/           # Hono framework
06-websocket-realtime/   # WebSocket server (TODO)
07-react-basics/         # Components, hooks (TODO)
08-nextjs-fullstack/     # App router, server components (TODO)
09-agent-systems/        # Mastra, AI integration (TODO)
10-production-patterns/  # Error handling, testing (TODO)
```

Each directory contains:
- `practice/` - Learning files with LEVEL 1/2/3 progression and extensive comments
- `exercises/` - Template exercises with `// TODO` markers and matching `*-solution.ts` files

## TypeScript Config

- Strict mode enabled
- ES modules (`"type": "module"` in package.json)
- ES2022 target
- Excludes `*-solution.ts` files from compilation

## When Adding Content

1. Practice files follow LEVEL 1/2/3 structure: basics → practical patterns → production complexity
2. Add best practices summary at end of practice files
3. Exercises use `// TODO: Your code here` markers
4. Create matching `*-solution.ts` files with explanatory comments
5. Update README.md with new topics/interview questions
6. Update PROJECT-STRUCTURE.md completion status
