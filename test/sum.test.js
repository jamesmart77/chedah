/**
 * @jest-environment node
 */

const sum = require("./sum");

test("adding sum function", () => {
  expect(sum(234, 4)).toBe(238);
});
