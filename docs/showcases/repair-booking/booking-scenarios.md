# Booking scenarios — consumer requirements, not approved API

All dates/actions synthetic. Clearly label simulation before action. Illustrative virtual date 2030-02-04, UTC (not approved service zone); one synthetic capacity unit, half-open intervals, no overlap. Fixture keys are not real resource IDs or secrets.

| Key | Start UTC | End UTC | Initial state |
| --- | --- | --- | --- |
| demo-a | 09:00 | 10:00 | AVAILABLE |
| demo-b | 10:00 | 11:00 | UNAVAILABLE |
| demo-c | 11:00 | 12:00 | AVAILABLE |

AVAILABLE is snapshot not a hold; UNAVAILABLE not selectable; LOADING, EMPTY, TEMPORARY_FAILURE distinct view states; CONFLICT is rejected mutation, CONFIRMED_DEMO only after authoritative acknowledgement. Change appliance/date invalidates selection. Display full date and zone; runtime duration, range, capacity and zone await contract. No real booking number or cross-user history.

Step 1: required appliance and predefined symptom, visible labels, no silently selected default. Step 2: load synthetic slots, date/zone, native radio or approved equivalent; unavailable entries readable but not selectable. Step 3: summary, edit/back, “Confirm demo appointment”; review not success. Pending disables repeat activation but is not concurrency guarantee. Server independently validates fixture values and current availability. Result “Demo appointment confirmed — no service visit has been scheduled” only after acknowledgement. No real booking. Reset only within authorized isolated fixture lifecycle, not while another in-scope scenario active.

| Scenario | Expected behavior |
| --- | --- |
| Available | washer / not draining / demo-a; review and confirmed simulation; subsequent availability within same fixture shows consumed slot |
| Unavailable | demo-b disabled; all unavailable or empty offers change date/back, never fake open times |
| Validation error | missing symptom, malformed/unknown IDs, incompatible slot or date rejected; no state change; preserve valid inputs, associated errors |
| Slot conflict | demo-c initially available, controlled competing actor consumes before confirmation; authoritative rejection, “This demo time is no longer available”, refresh and clear stale time, preserve appliance/symptom, focus status/selection; no success |
| Double activation / retry | duplicate intent cannot create another reservation; ambiguous timeout no success or blind resubmission; approved reconciliation or safe retry |
| Failure | timeout, invalid fixture, rate limit or dependency failure distinct from empty; safe retry/back, no phantom availability |
| Back/edit/reset/refresh | invalidate incompatible time; no sensitive URL state; documented refresh; reset isolated namespace only, no global public reset or arbitrary lookup |
| Accessibility | deliberate step navigation focuses heading; associated errors and summary, polite status, urgent conflict announcement without duplicate chatter; no auto-advance |
| No JS | information/navigation usable; approved booking fallback or explicit unavailable notice and return, not fake working form |

## Contract questions
CHAT 04 via CTO: approve bounded read/mutation DTOs, allowlisted values, public error codes, snapshot freshness, authoritative validation, atomic capacity, retry/idempotency and lifecycle. At most one distinct operation per capacity/interval commits; same key same semantic intent may return same result, different intent conflict under approved policy. Fixture isolation: two controlled actors in one namespace contend, independent sessions cannot read/mutate/reset it; trusted namespace binding, bounded expiry/reset, rate limits, safe logging, minimal storage, recovery, time-zone and DST gap/fold semantics. No custom auth, arbitrary client namespace, public reset or lookup, real identifiers, notifications or external requests. DYNAMIC may communicate only with own isolated demo backend after authorization; unlike #11 not a no-network simulation. If isolation cannot be proved, block runtime. CHAT 03: selection/steps/loading/empty/error/status/summary/focus patterns; CHAT 05: preview isolation, cache freshness, resource and request bounds, CI concurrency evidence, browser matrix. No endpoint names, payload schema, concrete storage or shared code selected. See [concept](concept.md) and [quality](quality-and-integration.md).
