# STATIC — minimal content and configuration contract

Status: proposed for Issue #5; independent audit and CTO integration required. Consumer: official CIDZO Astro reference (#6). This document defines behavior, not installed types, a validator, or a running site. See [architecture](../../ARCHITECTURE.md), [profile decision](../decisions/0001-minimal-profiles.md) and [server boundaries](server-boundaries.md).

## Input model

TypeScript notation is conceptual. Required fields lack a question mark. Refinements below are part of the contract; TypeScript alone is insufficient to validate external inputs. A consumer must validate at build time before rendering and fail rather than silently repair invalid required data.

```ts
type LocaleTag = string;
type PlainText = string;
type Locale = {
  tag: LocaleTag;
  direction: "ltr" | "rtl";
};
type PublicConfig = {
  studioName: PlainText;
  locales: readonly Locale[];
  defaultLocale: LocaleTag;
  canonicalOrigin?: string;
};
type Contact = {
  label: PlainText;
  kind: "website" | "email";
  href: string;
};
type Service = {
  id: string;
  title: PlainText;
  summary: PlainText;
  priceLabel?: PlainText;
};
type LocaleContent = {
  locale: LocaleTag;
  title: PlainText;
  description: PlainText;
  heading: PlainText;
  introduction: PlainText;
  services: readonly Service[];
  contacts: readonly Contact[];
  legalNotice?: PlainText;
};
type StaticInput = {
  config: PublicConfig;
  content: readonly LocaleContent[];
};
```

- Accept only declared fields and correct primitive/array/object types. Reject unknown properties, null in place of omitted optional values, empty or whitespace-only required text, control characters, invalid identifiers, duplicate locale tags (including equivalent canonical tags), duplicate content locale records and duplicate service IDs within a locale. No implicit coercion. Trim-validation is not silent mutation: leading/trailing whitespace in identifiers is invalid. Text is escaped on output; no raw HTML, executable markup, inline event handlers or untrusted Markdown rendering. No arbitrary URL fields.
- Bound input size before parsing (proposed initial fixture ceilings: 256 KiB UTF-8 JSON, 16 locales, 32 services and 8 contacts per locale, 4096 Unicode code points per text field, 2048 characters per URL, 64 ASCII characters per service ID). These are engineering limits, not content requirements; change through contract review. Service IDs use lowercase ASCII alphanumeric segments separated by single hyphens, without leading/trailing hyphens. Stable ID denotes the same service across translations; no merging by translated title.
- Required arrays may be empty for a reference preview, but a public launch requires founder-reviewed, truthful service and contact content (at least one service and one valid contact), plus any applicable legal notices. Missing priceLabel or legalNotice means omit the corresponding section; never invent a price, a policy or an endorsement. If a legal notice is required, absence blocks publication. priceLabel is display-only approved text, not executable pricing, a numeric calculation or a checkout contract.
- Contacts must be explicitly approved public business contacts; no real private customer data. website href must parse as an absolute HTTPS URL with nonempty host, no credentials and no embedded control/whitespace; reject scheme-relative, javascript:, data:, and HTTP. Validate the exact approved destination rather than trusting URL text or suffix checks. email href is a single approved mailto address without query, fragment, header injection or percent-encoded controls; reject malformed/multiple recipients. No external form, tracking pixel, automatic message or click-side effects beyond ordinary user navigation. No user-supplied URLs rendered without validation.
- canonicalOrigin, if supplied, is an approved absolute HTTPS origin with host, no credentials, path except "/", query or fragment; normalize only the trailing slash for URL construction. Reject invalid supplied values even in preview. Required for production publication; absent in local preview is allowed. Do not generate canonical/hreflang/sitemap URLs with invented origins. A preview is non-indexable and must not be represented as a production release; deployment controls belong to #4/#6.

## Locale and routing

Use an explicit registry of enabled, unique canonical BCP 47 locale tags; validate syntax and canonicalize for comparison, require canonical input spelling. Accept only tags supported by the selected build toolchain and reviewed translations. A tag's explicit direction must agree with the reviewed locale/script; render html lang and dir from the resolved entry, not from inferred browser language. Frontend #6 proposed ru/kk/en and later ar/RTL: these are candidates, not approved translations or release requirements. No locale is silently enabled. Default locale must exist in the registry and have a complete validated content record. Every enabled locale must have exactly one complete record; content outside registry is invalid.

Use / for the default locale and /<canonical-tag>/ for each other enabled locale (URI path segment from validated tag only); default-locale-prefixed routes are not additional indexable pages. All core navigation works without JavaScript. Locale switcher links only to available routes. For internal content lookup, an absent/unsupported requested locale resolves to the default record as a whole; do not fill missing strings from other locales. This is not permission to serve unknown HTTP routes as successful localized pages: unknown public paths return 404 under the host policy. A missing or incomplete enabled translation fails the build; it is not published or silently substituted. Explicit user choice follows the link, not forced geolocation/browser-language redirect. No arbitrary redirect target from input. If canonical origin is approved, generate canonical per page and alternates only for complete published equivalents (including default); avoid duplicate routes and false hreflang. Locale-aware formatting and RTL layout tests belong to #6.

## Public/private boundary and publication

StaticInput is public build-time content. Everything sent to browser bundles, HTML, source maps and public build artifacts must be treated as public. Use an explicit allowlist of the fields above, never spread process.env or arbitrary config into public output. No private values are required by this reference; CI/deployment credentials, if later required and approved, stay outside public inputs and use Platform's secret mechanism, never client prefixes or logs. Do not introduce a secret store, database, runtime, auth, cookies, external form, analytics, payment or provider merely for the reference. No live data collection in this contract. If a user opts to follow an external contact link, the destination has its own privacy behavior; verify destination and disclosure before publication. All assets and text need provenance, rights and founder content-policy review; no music, images of living beings, false reviews, cases or metrics.

Invalid input: deterministic build failure, concise field path and error category without echoing potentially sensitive values; no partial successful publish. A failed release leaves previous verified artifact untouched. Preview vs production is an explicit trusted deployment choice, not a query parameter or browser value. Production release checks are separate from structural validation; a well-formed example is not proof of verified commercial content.

## Synthetic preview example

The following is a structural example only, not approved content, a release configuration, or a requirement to enable a language. No real contacts or prices.

```json
{
  "config": {
    "studioName": "CIDZO",
    "locales": [{"tag": "en", "direction": "ltr"}],
    "defaultLocale": "en"
  },
  "content": [{
    "locale": "en",
    "title": "CIDZO reference",
    "description": "Synthetic preview example",
    "heading": "Preview",
    "introduction": "Illustrative content only",
    "services": [],
    "contacts": []
  }]
}
```

Acceptance examples (future consumer checks, not executed runtime tests): this structure is valid for preview and rejected for production; duplicate locale, unknown key, missing default record, incomplete enabled translation, invalid supplied origin, injected contact scheme, over-limit arrays and unknown locale record must fail validation. A valid default lookup uses its whole record; unknown public route must not become an indexable duplicate. Price and legal omissions do not manufacture content. Add actual validator/build/browser tests under assigned #6 scope and review with Platform #4. No new dependency selected here.
