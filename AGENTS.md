<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# YCPS Toolkit Lab — Agent Instructions

This project is a Next.js / TypeScript / Tailwind web app called YCPS Toolkit Lab.

## Product Purpose
The app is a prototype support tool for the Youth, Climate, Peace and Security Toolkit in Africa. It helps users translate policy frameworks into practical analysis, planning, training, and implementation outputs.

## Source of Truth
The app must be grounded in:
1. Final ToR_DEDI Youth, Climate, Peace and Security Consultant
2. DEDI Project Document 2024–2028
3. CCCPA / DEDI Workplan and Timeline
4. CCCPA CPS Manual and training materials
5. UNDP-SIPRI-FBA “Beyond Vulnerability”
6. CCCPA Guidebook on CPS Programming in UN Peace Operations in Africa

Do not create generic climate, youth, or peacebuilding content. Keep all placeholder content relevant to YCPS in Africa, CCCPA/DEDI/UNDP-style programming, national ownership, conflict sensitivity, and youth agency.

## Diplomatic Language Rules
Avoid:
- “Climate causes conflict.”
- “Youth are vulnerable.”
- “Failed governance.”
- “Security solution.”
- “International actors should impose solutions.”
- “AI-powered official advice.”

Prefer:
- “Climate-related risks may compound existing vulnerabilities and contribute to instability under specific conditions.”
- “Young people face differentiated risks while also contributing as agents of resilience, innovation, prevention and peacebuilding.”
- “Governance and institutional capacity constraints.”
- “Conflict-sensitive, rights-based and prevention-oriented response.”
- “Responses should be grounded in national ownership, local priorities and context-specific evidence.”
- “Draft support / prototype support tool.”

## Non-Negotiable Safeguards
- Do not remove the prototype disclaimer.
- Do not claim this is an official UN, CCCPA, DEDI, UNDP, AU, or government platform.
- Separate source-based guidance, user working notes, and suggested draft language.
- Mark incomplete or uncertain content as “to be validated.”
- Do not overstate climate-conflict causality.
- Do not frame youth mainly as risks or victims.
- Always keep youth agency visible.
- Include gender, protection, conflict sensitivity, evidence gaps, and national ownership where relevant.

## Development Rules
- Before changing code, inspect the relevant files.
- Do not rewrite large files unnecessarily.
- Do not install new dependencies unless explicitly requested.
- Keep components modular and typed.
- Run npm run lint and npm run build after meaningful changes.
- Update task.md when completing implementation steps.
- Preserve clean file organization.

## Git Workflow
- Work on one feature at a time.
- Do not edit the same files as another agent unless the latest changes have been committed.
- Commit stable changes before switching between Antigravity and Codex.
