# Travelord Development Guide

## Project Goals

- Maintain a clean architecture.
- Keep the domain model as the single source of truth.
- Preserve the existing coding style.
- Prefer small incremental changes.
- Never refactor unrelated code.

## Rules

- Use TypeScript strict mode.
- Use named exports.
- Reuse existing UI components whenever possible.
- Do not introduce new dependencies unless requested.
- Ensure npm run build succeeds.
- Preserve Tailwind design tokens.
- Keep components small and composable.

## Workflow

Before coding:
1. Analyze affected files.
2. Produce a short implementation plan.

After coding:
1. Run the build.
2. Fix TypeScript errors.
3. Summarize all modified files.