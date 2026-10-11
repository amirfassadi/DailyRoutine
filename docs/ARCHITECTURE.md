# Architecture

## Current boundaries

1. Browser: Persian RTL React interface, exercise/rest timer, local camera inference and meal photo resizing.
2. Sites dispatch: real ChatGPT sign-in and authenticated request identity. Authentication establishes identity; application ownership checks authorize access.
3. Worker API: `/api/records`, `/api/photo`, `/mcp` use `getChatGPTUser()` and server-side user ID filters.
4. D1 `coach_records`: typed record kind, local day, JSON payload, owner ID and optional photo key.
5. R2: meal JPEGs addressed by user ID and record UUID; access through authenticated photo API or the owned MCP image tool.

There are no conversation logs, uploaded user photos, medical reports, production secrets or user records in this repository. Profile defaults are blank. The exercise template retains the prototype's return-to-training assumptions and must not be treated as universal onboarding.

## ChatGPT integration

`get_fitness_log` returns up to 150 owned records. `get_meal_photo` returns one owned meal photo. Both require user identity. Discovery contains no private records. A service bypass token is not user identity.

A visitor signs in to the website, then separately connects the provisioned app/plugin in their ChatGPT environment. ChatGPT can review their records when invoked; the website does not embed their ChatGPT conversations, use their subscription as an API key or continuously stream camera video to ChatGPT.

Current MCP tools are read-only. Future proposed-plan writes need explicit user review, schema validation, versioning and idempotency before activation. A general public plugin distribution path has not been validated.

## Deployment

The GitHub source snapshot and Sites deployment repository are currently separate. GitHub changes do not automatically deploy. `.openai/hosting.json` contains binding names and MCP capability only; no personal Site ID. Provision a Site and use its official source/build/publish flow. Preserve the starter's Sites Vite integration. Portable development has mock identity; it must never be exposed as production authentication.

## Known limits

Default local day is Asia/Tehran. Profile, medical history, goals and exercise selection need general onboarding. JSON export includes records, not photo bytes. Pagination, quotas, backup/restore, complete account erasure and mobile packaging are still pending.
