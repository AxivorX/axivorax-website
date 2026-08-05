# AX-01 Phases 5–8 QA Record

## Phase 5 — Professional presentation
- Conversation entries have separate user/assistant presentation.
- Timestamps are generated locally.
- Long responses wrap safely.
- Mobile response widths are constrained.
- Keyboard focus states are present.

## Phase 6 — Smart interaction
- Quick prompts are generated dynamically.
- Enter submits.
- Shift+Enter remains available for multiline input.
- Duplicate requests are blocked while AX-01 is busy.
- Clear resets the conversation.

## Phase 7 — Intelligence UX
- AX-01 responses are parsed into readable sections.
- Section labels are rendered as DOM text.
- Response content uses `textContent`; server content is never inserted as HTML.
- Existing `/demo/analyze` contract remains unchanged.

## Phase 8 — Hardening
- 30-second request timeout.
- Network failures receive a controlled message.
- Invalid JSON responses are rejected.
- Empty/invalid analysis responses are rejected.
- No credentials or tokens are stored.
- No trading execution logic is introduced.
- Changes are confined to `Development/`.

## Local test checklist

1. Load the development site.
2. Verify AX-01 shows READY/ONLINE.
3. Click each quick prompt.
4. Submit a prompt.
5. Verify user and AX-01 messages remain visible.
6. Submit multiple prompts.
7. Verify duplicate submission is blocked while loading.
8. Press Enter to submit.
9. Use Shift+Enter for multiline input.
10. Click Clear.
11. Test an empty submission.
12. Test the API while the service is unavailable.
13. Test on a narrow/mobile viewport.
14. Verify no browser console errors.

## Approval boundary

This is a development build only.

Do not merge, copy, or update production/main until local testing is complete and explicitly approved.
