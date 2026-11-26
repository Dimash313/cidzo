import assert from "node:assert/strict";
import test from "node:test";
import { validateProjectSlug } from "../dist/slug.js";

test("accepts canonical lowercase slugs and length boundaries", () => {
  for (const value of ["a", "cidzo", "site-42", "a".repeat(63)]) {
    assert.equal(validateProjectSlug(value), value);
  }
});

test("rejects malformed values without coercion", () => {
  for (const value of [
    null, undefined, 42, {}, [], "", "A", "1site", "a--b", "a-",
    "-a", "a/b", "../site", "a\\b", "a_b", " a", "a\n", "а",
    "a".repeat(64),
  ]) {
    assert.throws(() => validateProjectSlug(value), TypeError);
  }
});
