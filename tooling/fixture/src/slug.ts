// A build/test fixture only; not a Forge filesystem safety boundary.
export function validateProjectSlug(input: unknown): string {
  if (
    typeof input !== "string" ||
    input.length < 1 ||
    input.length > 63 ||
    input.trim() !== input ||
    !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(input)
  ) {
    throw new TypeError("Invalid project slug");
  }
  return input;
}
