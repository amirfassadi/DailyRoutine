# Roadmap

## 1. Complete the private pilot

- Reconcile the exercise template with actual completed workouts and per-move difficulty.
- Verify timer/background pause, camera, guidance, food/photo save and deletion on Android.
- Add symptom-aware onboarding, goals, history and editable time zone.
- Verify two independent signed-in accounts cannot read, modify or delete each other's records/photos, including MCP.

## 2. Personal ChatGPT coaching

- Verify installation/connection from an independent account and supported app distribution.
- Show connection status and explain the difference between website sign-in and ChatGPT tool consent.
- Add reviewed draft plans and authorized log-writing tools with input validation, idempotency and rollback/version history.
- Nutrition estimates must retain quantities, assumptions, source and uncertainty; images do not measure exact grams.

## 3. Installable mobile experience

- Add PWA manifest/icons and test installation on Android.
- Decide between web packaging and native Android based on camera, notifications and background requirements.
- Build a signed downloadable artifact and test upgrades before describing the app as downloadable.

## 4. Public release

- Exercise content review and clearly bounded camera feedback.
- Rate limits, storage quotas, abuse controls, backup/restore and privacy policy.
- Complete account-data erasure and photo-inclusive export.
- Independent-account acceptance tests and production deployment documentation.
- Select project license, app name/domain availability, distribution and cost model.

Public repository access is separate from public app access. There is currently no automatic GitHub-to-Sites deployment pipeline.
