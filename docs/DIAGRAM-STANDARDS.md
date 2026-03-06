# Diagram Standards

Use this guide when adding diagrams to docs in this repository.

## Purpose

- Improve scanability in raw markdown and rendered preview
- Keep architecture and workflow explanations consistent
- Prevent Mermaid syntax/rendering errors

## Diagram Types

### ASCII diagrams

Use for:
- File trees
- Deployment topologies
- Command/data pipelines where plain-text readability is primary

Rules:
- Monospace fenced blocks
- Fixed indentation
- Keep width readable in standard editor panes
- Prefer short labels and consistent arrows (`->`)

### Mermaid diagrams

Use for:
- Process flow
- State transitions
- Sync/ownership relationships
- Runtime data flow across systems

Rules:
- Node IDs use `camelCase`, `PascalCase`, or underscores
- Wrap labels with special characters in double quotes
- Avoid reserved node IDs like `end`, `graph`, `subgraph`
- No explicit colors/styles
- Keep one main message per diagram

## Section Template

For docs with major technical flows, use this pattern:

1. `## Context`
2. `## ASCII Map`
3. `## Mermaid Flow`
4. `## Operational Notes`

You can repeat this template per major step if needed.

## Quality Checklist

- Mermaid renders in preview without syntax errors
- ASCII remains readable in plain text
- Diagram matches nearby instructions exactly
- Labels are concise and unambiguous
- Relative links to related docs are valid
