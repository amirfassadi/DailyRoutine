# Security and privacy

This is an experimental fitness application, not a medical device. Do not publish production credentials, personal health details, meal photos or exports in GitHub issues or commits.

## Implemented controls

- User identity supplied by the trusted Sites authentication boundary.
- Owner checks for record and photo operations, including MCP tools.
- Same-origin checks for browser mutation endpoints.
- Limited JPEG payloads and metadata removal during browser resize.
- Camera processing on device; video frames are not saved or uploaded.
- Meal images stored only following explicit save and retrieved via authorized routes.

These controls have source-level/mocked verification. Live cross-account tests, storage quotas, rate limits, full account erasure and broader production security review remain pending. Mock authentication is development-only. On other hosting, replace the trusted dispatch boundary before accepting identity headers.

Report a security concern privately to the repository owner through an established private channel. Do not include credentials, patient data or exploit details in a public issue.
