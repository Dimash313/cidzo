import assert from "node:assert/strict";
import test from "node:test";
import { validateProjectSlug } from "../dist/slug.js";

test("returns the original canonical slug, including both length limits", () => {
  for (const value of ["a", "cidzo", "a0", "site-42", "a-0-b2", "a".repeat(63)]) {
    assert.equal(validateProjectSlug(value), value);
  }
});

test("requires 1–63 ASCII characters and a lowercase initial letter", () => {
  for (const value of ["", "a".repeat(64), "1site", "A", "aB", "а", "café", "a\u0301"]) {
    assert.throws(() => validateProjectSlug(value), TypeError, JSON.stringify(value));
  }
});

test("rejects whitespace and control characters throughout the slug", () => {
  for (const char of [" ", "\t", "\n", "\r", "\0", "\u007f", "\u00a0", "\u2028", "\u2029"]) {
    for (const value of [char + "a", "a" + char + "b", "a" + char]) {
      assert.throws(() => validateProjectSlug(value), TypeError, JSON.stringify(value));
    }
  }
});

test("rejects empty segments, other separators and path syntax", () => {
  for (const value of ["-a", "a-", "a--b", "a_b", "a.b", "a/b", "../site", "a\\b"]) {
    assert.throws(() => validateProjectSlug(value), TypeError, JSON.stringify(value));
  }
});

test("rejects non-strings without calling user conversion hooks", () => {
  let conversions = 0;
  const convertible = {
    [Symbol.toPrimitive]() {
      conversions++;
      return "cidzo";
    },
  };
  const values = [
    null, undefined, true, 42, 1n, Symbol("a"), {}, [], ["a"], new String("a"), convertible,
  ];
  for (const value of values) {
    assert.throws(() => validateProjectSlug(value), TypeError);
  }
  assert.equal(conversions, 0);
});
