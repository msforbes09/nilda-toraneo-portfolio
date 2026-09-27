import { useReducer } from "react";
import {
  type ContactField,
  type ContactState,
  contactReducer,
  initialContactState,
} from "./contact-form";

/**
 * Wires the contact state machine to the third-party form service.
 * The request is sent from the submit handler, never from an effect, so a
 * dev-mode double render can't post twice.
 */
export function useContactForm() {
  // Read on every render: Next inlines it at build, tests stub it per case.
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() ?? "";
  const [state, dispatch] = useReducer(contactReducer, initialContactState);

  function change(field: ContactField, value: string) {
    dispatch({ type: "change", field, value });
  }

  /**
   * `honeypot` is the hidden field's value; people leave it empty. Returns
   * the state the submit leads to, so the form can move focus.
   */
  function submit(honeypot: string): ContactState {
    if (!endpoint) return state;
    const next = contactReducer(state, { type: "submit" });
    dispatch({ type: "submit" });
    if (next.status !== "submitting") return next;

    if (honeypot) {
      // A bot filled the hidden field: look sent, send nothing.
      dispatch({ type: "succeeded" });
      return next;
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...state.values, company: honeypot }),
    }).then(
      (response) => dispatch({ type: response.ok ? "succeeded" : "failed" }),
      () => dispatch({ type: "failed" }),
    );
    return next;
  }

  function retry() {
    dispatch({ type: "retry" });
  }

  return { state, enabled: endpoint !== "", change, submit, retry };
}
