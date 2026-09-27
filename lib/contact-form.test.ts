import { describe, expect, it } from "vitest";
import {
  type ContactAction,
  type ContactState,
  type ContactStatus,
  contactReducer,
  initialContactState,
} from "./contact-form";

const valid = {
  name: "Ana Reyes",
  email: "ana@example.com",
  message: "I need help with my PPC.",
};

function at(status: ContactStatus, values = valid): ContactState {
  return { status, values, errors: {} };
}

describe("contactReducer", () => {
  it("starts idle with empty fields and no errors", () => {
    expect(initialContactState).toEqual({
      status: "idle",
      values: { name: "", email: "", message: "" },
      errors: {},
    });
  });

  // Handoff §4 item 10: idle → submitting → success | error; retry goes back.
  it.each<[ContactStatus, ContactAction, ContactStatus]>([
    ["idle", { type: "submit" }, "submitting"],
    ["invalid", { type: "submit" }, "submitting"],
    ["submitting", { type: "succeeded" }, "success"],
    ["submitting", { type: "failed" }, "error"],
    ["error", { type: "retry" }, "idle"],
    // Out-of-order events change nothing.
    ["submitting", { type: "submit" }, "submitting"],
    ["success", { type: "submit" }, "success"],
    ["idle", { type: "succeeded" }, "idle"],
    ["idle", { type: "failed" }, "idle"],
    ["success", { type: "retry" }, "success"],
    ["submitting", { type: "change", field: "name", value: "X" }, "submitting"],
  ])("from %s, %o goes to %s", (from, action, to) => {
    expect(contactReducer(at(from), action).status).toBe(to);
  });

  it("rejects a submit with per-field messages and keeps the values", () => {
    const values = { name: "  ", email: "ana@example", message: "Too short" };

    expect(contactReducer(at("idle", values), { type: "submit" })).toEqual({
      status: "invalid",
      values,
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email address, like name@example.com.",
        message: "Write a message of at least 10 characters.",
      },
    });
  });

  it.each([
    ["name", { name: "A" }],
    ["email", { email: "a@b.co" }],
    ["message", { message: "0123456789" }],
  ])("accepts the smallest valid %s", (field, value) => {
    const values = { ...valid, ...value };

    expect(
      contactReducer(at("idle", values), { type: "submit" }).errors,
    ).not.toHaveProperty(field);
  });

  it("clears only the changed field's error on change", () => {
    const invalid = contactReducer(
      at("idle", { name: "", email: "", message: "" }),
      { type: "submit" },
    );

    const next = contactReducer(invalid, {
      type: "change",
      field: "email",
      value: "ana@example.com",
    });

    expect(next.values.email).toBe("ana@example.com");
    expect(Object.keys(next.errors).sort()).toEqual(["message", "name"]);
  });

  it("keeps the typed values on retry after an error", () => {
    expect(contactReducer(at("error"), { type: "retry" }).values).toEqual(
      valid,
    );
  });
});
