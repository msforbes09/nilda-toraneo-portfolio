/**
 * The contact form's state machine, free of React so it can be unit tested.
 * Values are visitor input (untrusted): they are only ever held here and sent
 * as a fetch body; nothing renders them back as HTML.
 */

export type ContactField = "name" | "email" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactStatus =
  "idle" | "invalid" | "submitting" | "success" | "error";

export type ContactState = {
  status: ContactStatus;
  values: ContactValues;
  errors: ContactErrors;
};

export type ContactAction =
  | { type: "change"; field: ContactField; value: string }
  | { type: "submit" }
  | { type: "succeeded" }
  | { type: "failed" }
  | { type: "retry" };

export const initialContactState: ContactState = {
  status: "idle",
  values: { name: "", email: "", message: "" },
  errors: {},
};

const MIN_MESSAGE_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, like name@example.com.";
  }
  if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Write a message of at least ${MIN_MESSAGE_LENGTH} characters.`;
  }
  return errors;
}

/** Statuses in which the visitor may edit and submit the form. */
const editable: ReadonlySet<ContactStatus> = new Set(["idle", "invalid"]);

export function contactReducer(
  state: ContactState,
  action: ContactAction,
): ContactState {
  switch (action.type) {
    case "change": {
      if (!editable.has(state.status)) return state;
      const errors = { ...state.errors };
      delete errors[action.field];
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors,
      };
    }
    case "submit": {
      if (!editable.has(state.status)) return state;
      const errors = validate(state.values);
      const status = Object.keys(errors).length ? "invalid" : "submitting";
      return { ...state, status, errors };
    }
    case "succeeded":
      return state.status === "submitting"
        ? { ...state, status: "success" }
        : state;
    case "failed":
      return state.status === "submitting"
        ? { ...state, status: "error" }
        : state;
    case "retry":
      return state.status === "error" ? { ...state, status: "idle" } : state;
  }
}
