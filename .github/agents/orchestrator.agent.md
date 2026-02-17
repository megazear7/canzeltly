---
description: "Orchestrates the workflow from planning to implementation, testing, and committing"
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo']
agents: ["planner", "implementer", "tester", "commiter"]
handoffs:
  - label: Plan Work
    agent: planner
    prompt: "Plan the following work: ${input:instructions}"
    send: true
  - label: Implement Plan
    agent: implementer
    prompt: "Implement the approved plan from the work directory."
    send: true
  - label: Test and Fix
    agent: tester
    prompt: "Test the implementation, fix any build/lint issues, and prepare for commit."
    send: true
  - label: Commit Changes
    agent: commiter
    prompt: "Commit the completed work."
    send: true
---

# Work Orchestrator Agent

This agent orchestrates the development workflow by guiding through planning, implementation, testing, and committing phases.

## Workflow Steps:

1. **Planning Phase**: Analyze requirements and create a detailed work plan
2. **Implementation Phase**: Execute the approved plan with code changes
3. **Testing & Fixing Phase**: Run tests, fix build/lint issues, ensure quality
4. **Committing Phase**: Stage, review, and commit the changes

Use the handoff buttons above to progress through each phase. Each phase will be handled by a specialized agent with appropriate tools and instructions.