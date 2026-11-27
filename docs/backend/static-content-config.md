# STATIC — minimal content and configuration contract

Proposed contract for Issue #5 and the official CIDZO Astro reference (#6), pending independent audit and CTO review. See [architecture](../../ARCHITECTURE.md), [profile decision](../decisions/0001-minimal-profiles.md) and [server boundaries](server-boundaries.md).

## Input model

TypeScript notation is conceptual. Required fields lack a question mark. Validate the following refinements at build time before rendering. The deployment mode, content approvals and host route inventory come from trusted project owners outside this public input.

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

## Validation and release failure

Read at most 256 KiB (262144 bytes) of UTF-8 JSON. Reject invalid encoding, malformed JSON and duplicate object keys. Accept only the declared fields and types. Reject missing required fields, unknown properties, explicit nulls, implicit coercions and unpaired surrogates. Every supplied plain-text field, including optional fields, must contain a non-whitespace character and exclude control characters (U+0000–001F and U+007F–009F). Render it as escaped text in its output context. Content cannot supply markup, scripts or arbitrary URL fields to the renderer.

Limits are inclusive. Allow 1–16 locales, up to 32 services and 8 contacts per locale, 4096 Unicode code points per plain-text field and 2048 ASCII characters per URL input. A service ID is 1–64 ASCII characters matching `[a-z0-9]+(?:-[a-z0-9]+)*` in full. For example, `web-design` is valid and `web--design` fails. Compare identifiers exactly, without trimming. Apply the review and mode rules below after structural validation.

| Input or condition | Required outcome |
| --- | --- |
| Valid input exactly at a stated ceiling | Accept that limit, then apply all other checks. |
| 262145 input bytes, 4097 code points in a summary, 33 services or 9 contacts in one locale | Reject the whole build even if another locale is valid. |
| Missing heading, whitespace-only label, duplicate key, `priceLabel: null` or unknown config key (for example, `privateToken`) | Reject in either mode. An omitted optional field passes structural validation. |
| Failure during validation, rendering or release checks | Discard the candidate. Report a field path (or stage for a document-level error) and category, e.g. `content[1].contacts / required-for-publication`. Keep raw input, addresses and private values out of diagnostics. The last verified release stays in place. |

## Locale records and publication

The registry lists every enabled locale exactly once. Tags use the canonical BCP 47 spelling returned by the build toolchain's `Intl.getCanonicalLocales` for a single tag. Noncanonical spellings and equivalent duplicate tags fail registration, e.g. `en-us` alongside `en-US`. Require an app locale resource for the canonical tag, including its reviewed direction. A resource for a base language alone cannot enable a regional or script variant. The default must be registered. Require exactly one complete record per tag, including the default, and reject extra records. Render each page's `lang` and `dir` from its own entry. Reject a direction that disagrees with its reviewed language/script, including an RTL resource declared as LTR. An internal request for an absent or unsupported locale selects the entire default record. An incomplete registered record fails the build. Never fill individual strings from another language.

For each locale require its own title, description, heading, introduction, service titles/summaries and contact labels. Frontend owns reviewed, locale-specific interface strings (including the preview notice, skip link, section labels and 404 recovery). Keep them in the app's locale resources. Review copy, direction and interface resources for every published locale. Candidate languages in #17 do not enable routes.

| Content | Preview | Production |
| --- | --- | --- |
| Services | Every locale has the same ordered sequence of unique IDs as the default. All may be empty. | Same rule, with 1–32 reviewed services **in each locale**. The ID identifies the same offering. Reordering, extra IDs and intentional omissions in one translation all fail. Change the reviewed catalog across all locales together. |
| Contacts | Each locale supplies 0–8 validated, approved contacts. | Each locale supplies 1–8 validated, reviewed public business contacts. Destinations, labels and order may differ by locale. |
| Price | Omit an absent label for that service only. Use reviewed fixture text for any sample price. | Presence is independent per service and locale. Show only approved localized display text. Absence needs no substitute, calculation or checkout. |
| Legal notice | Omit the block if absent. Use reviewed fixture text for any sample notice. | The owner records whether a notice is required for each locale. Unknown applicability, missing required notice or any unreviewed supplied notice blocks publication. When optional and absent, omit the block. |

Preview may use reviewed synthetic fixtures for internal evaluation. For production, the founder must approve the actual content, translations, destinations and origin. Publish every registered locale together or reject the release. A build cannot quietly disable a failing locale. In an empty preview omit each empty section, its navigation target and any unavailable contact CTA. Show a localized preview notice on every preview page.

## Two-locale acceptance fixture

Both tags, the reserved test domains and the copy below are synthetic. For the accepted production **contract example only**, assume the reviewer approved these exact values, both interface dictionaries, LTR and omission of both legal notices. This fixture confers no publication approval.

```json
{
  "config": {
    "studioName": "Example",
    "locales": [{"tag": "en", "direction": "ltr"}, {"tag": "fr", "direction": "ltr"}],
    "defaultLocale": "en",
    "canonicalOrigin": "https://site.invalid"
  },
  "content": [
    {
      "locale": "en", "title": "Example", "description": "Sample catalog",
      "heading": "Services", "introduction": "Preview the sample catalog.",
      "services": [{"id": "web", "title": "Website", "summary": "Example site."}],
      "contacts": [{"kind": "website", "label": "Contact", "href": "https://example.invalid/contact"}]
    },
    {
      "locale": "fr", "title": "Exemple", "description": "Catalogue fictif",
      "heading": "Services", "introduction": "Découvrez le catalogue fictif.",
      "services": [{"id": "web", "title": "Site web", "summary": "Site fictif."}],
      "contacts": [{"kind": "email", "label": "Écrire", "href": "mailto:Equipe+demo@example.invalid"}]
    }
  ]
}
```

Apply each row independently to the fixture.

| Change | Expected outcome |
| --- | --- |
| As written | Both locales pass the production data gate at its minimum. Internal lookup for an unsupported tag returns the entire English record. The HTTP path for that tag returns 404. |
| Empty only the French services and contacts | Reject production. The English minima cannot satisfy the French record. Emptying only French contacts also rejects production and passes preview. |
| Change only the French ID to `design`, or add it only in French | Reject in either mode. Adding a translated `design` after `web` in both passes. Reversing those two in French then fails. |
| Omit the French record, duplicate it or add a record for a disabled tag | Reject in either mode. |
| Add a reviewed price label only in French | Show it only for that French service. Declaring a French legal notice required with the notice absent rejects production. Supplying the reviewed French notice satisfies that gate. |
| Empty all service and contact arrays and omit the origin | Accept preview, show the notice and omit the empty sections and links. Reject production. An invalid supplied origin fails even in preview. |

## HTTP routing at the host

Serve the default page only at `/`. Each other registered page has exactly one path, `/<canonical-tag>/`, matched case-sensitively. Compare the original request pathname before host case folding, slash repair or decoding aliases. Query parameters do not change the page, locale or mode. Generated URLs use the clean pathname. Fragments are client-side. Link the switcher to the exact enabled paths and keep core navigation usable without JavaScript or a language-detection redirect.

Reserve the first path segments `api`, `assets`, `_astro`, `.well-known`, `robots.txt`, `sitemap.xml`, `favicon.ico` and `404.html`, including their descendants, plus any first segment claimed by another emitted file, page or host rule. Compare *every* registry tag (including default) with those names using ASCII case folding. Before rendering, reject a registry or output plan with a collision, including one on a case-insensitive host. Reserved paths belong to their explicitly configured file/handler. An unclaimed reserved path returns 404. #4/#6 must verify the deployed host preserves these status and path rules, including file aliases.

| Request or build input (fixture above) | Outcome |
| --- | --- |
| `/`, `/fr/`, `/fr/?preview=1` | 200 for English, French and French respectively. Mode comes from the build. |
| `/en`, `/en/`, `/fr`, `/FR/` | 404 with a recovery link to `/`. No redirects or duplicate pages for these variants. |
| `/de/`, `/fr//`, `/%66r/`, `/fr/index.html` | 404. An unknown path never serves the default or a successful fallback page. |
| Add the syntactically valid tag `api`, or give a host asset directory the name `FR` | Reject the build for collision before emitting either locale. |

## Origin, indexing and discovery

Select preview or production only through trusted build/deployment configuration. A missing or unknown mode fails closed. If supplied, `canonicalOrigin` must equal a reviewed WHATWG HTTPS origin serialization, optionally followed by one slash. Apply the website URL lexical exclusions below. Require a hostname and reject credentials, paths other than root, queries and fragments. Use the serialization without a trailing slash when joining to a route. For example, `https://site.invalid/` maps to `https://site.invalid` when approved. `http://site.invalid`, `https://site.invalid/path` and `https://site.invalid/?` fail in either mode.

| Context | Indexing and emitted metadata |
| --- | --- |
| Missing mode, unknown mode or a public input property claiming a mode | Reject the build. A preview host must serve a preview artifact. |
| Production with an approved origin and complete, approved records | Use localized title/description and one self-canonical per 200 locale page. On each page emit the same reciprocal hreflang set, one absolute URL per published tag including self and default. Sitemap contains exactly those page URLs once each. For the fixture each page links `en` to `https://site.invalid/` and `fr` to `https://site.invalid/fr/`. Open Graph data, if used, must describe approved content on that page. |
| Production with one enabled locale | Self-canonical, one self hreflang and one sitemap URL. Omit unpublished languages and aliases from every output. Missing origin blocks the whole production release. |
| Preview, with or without an approved origin | Put `<meta name="robots" content="noindex">` in the initial HTML of every preview page, including the HTML recovery page. Emit zero canonicals, hreflang links, sitemap files/advertisements or public page identity URLs such as `og:url`. Ordinary navigation and localized titles still work. |
| Unknown path, alias or otherwise unpublished equivalent | Return 404 for an unmatched page. Emit no canonical, hreflang or production page identity for its error response. It has no sitemap entry and no alternate pointing to it from a published page. |

Before exposing a preview, #4/#6 verify its access policy and inspect the served HTML with JavaScript disabled for the actual `noindex` directive. A robots.txt disallow rule alone cannot satisfy the gate. Check preview outputs even when the production origin is supplied. For deployment acceptance, request representative 200 and 404 paths and compare the generated production head tags and sitemap with the same published route set.

## Contact destinations

The owner reviews public business destinations outside `StaticInput`. Compare the pair `(kind, canonical href)` with that exact reviewed set in both modes. Validate the set entries by the same rules as the content. Render the validated canonical href as an ordinary escaped link. A host, prefix or shared business name is insufficient to approve a different destination.

- **Website.** Accept an absolute HTTPS URL parsed without a base by the WHATWG URL parser. Before parsing, reject non-printable or non-ASCII input, any whitespace, backslash and any percent sign. This contract admits only unescaped ASCII contact URLs. Require a nonempty hostname and no userinfo (including an empty userinfo marker). Require the original string to equal the parser's complete serialized `href` byte for byte. This rejects dot-segment removal, case folding of scheme/host, an explicit default port and the insertion of a missing root slash. Preserve path case, trailing slash, non-default port, query order and fragment in the exact comparison. A changed component needs its own approval.
- **Email.** Require literal lowercase `mailto:` followed by one ASCII mailbox and nothing else. Split at exactly one literal `@`. The local part is 1–64 characters and matches `[A-Za-z0-9_+-]+(?:\.[A-Za-z0-9_+-]+)*` in full. Preserve case and literal plus. The domain is a lowercase ASCII DNS name with at least two dot-separated labels, each 1–63 letters/digits/hyphens with alphanumeric ends. Maximum 253 characters for the domain and 254 for the mailbox. The canonical href is `mailto:` plus those exact parts. Reject whitespace, controls, display names, lists, query/header or fragment delimiters (even empty) and **all** percent escapes before any decoding. Do not decode or form-encode the recipient.
- **Destination review.** Manually verify the intended website before publication. A redirect target needs separate review. Use the verified final URL as the approved href and recheck if it changes. The build performs no lookup, redirect-following, automatic sending or tracking. An ordinary link requires an explicit user action.

Each row is a separate check. Assume only the two contact pairs in the fixture are approved unless the row explicitly grants another approval.

| Candidate | Expected outcome |
| --- | --- |
| The fixture's website and email | Accept both. Preserve the capital E and literal plus in the email local part. |
| `https://example.invalid/a/../contact` or `https://example.invalid:443/contact` | Reject despite the parser serializing each to the approved URL. |
| `https://example.invalid/contact/`, `https://example.invalid/contact?src=a` or `https://example.invalid/contact#team` | Reject each as a different destination. A separate exact review of the fragment URL permits that URL alone. |
| `//example.invalid/contact`, `http://example.invalid/contact`, `https://user@example.invalid/contact` or an unapproved host | Reject. If an approved address begins redirecting, review and approve the final destination before publication. |
| `mailto:equipe+demo@example.invalid`, `mailto:Equipe+demo@EXAMPLE.invalid` | Reject the first as unapproved and the second as noncanonical. |
| `mailto:a,b@example.invalid`, `mailto:a%2Cb@example.invalid`, `mailto:a%252Cb@example.invalid` or `mailto:a%0Db@example.invalid` | Reject before comparison. No recipient list, encoded separator, nested escape or encoded control is valid. |
| An otherwise approved mailbox with `?`, `?subject=Hello` or `#` appended | Reject even an empty query or fragment. A separately reviewed mailbox with a 64-character allowed local part can pass. At 65 characters it fails. |

## Public and private data

Treat HTML, browser bundles, source maps and all public build artifacts as public. Allowlist only the declared fields. Never spread environment variables or arbitrary config into output. Deployment credentials belong to Platform's private mechanism outside this input. The STATIC reference requires no runtime server, database, identity, cookies, analytics, payment or external form. Verify provenance, rights and founder approval for published text and assets. No real private data, music, images of living beings, fabricated reviews, cases or metrics. A contact destination has its own privacy behavior and requires appropriate disclosure.
