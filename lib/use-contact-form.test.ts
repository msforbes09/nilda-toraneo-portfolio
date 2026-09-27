import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useContactForm } from "./use-contact-form";

const ENDPOINT = "https://formspree.io/f/test123";

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", ENDPOINT);
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

function renderFilled() {
  const hook = renderHook(() => useContactForm());
  act(() => {
    hook.result.current.change("name", "Ana Reyes");
    hook.result.current.change("email", "ana@example.com");
    hook.result.current.change("message", "I need help with my PPC.");
  });
  return hook;
}

describe("useContactForm", () => {
  it("posts the fields as JSON to the endpoint and ends in success", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    const { result } = renderFilled();

    act(() => result.current.submit(""));

    expect(result.current.state.status).toBe("submitting");
    await waitFor(() => expect(result.current.state.status).toBe("success"));
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init?.method).toBe("POST");
    expect(init?.headers).toEqual({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
    expect(JSON.parse(String(init?.body))).toEqual({
      name: "Ana Reyes",
      email: "ana@example.com",
      message: "I need help with my PPC.",
      company: "",
    });
  });

  it.each([
    ["a rejected fetch", () => fetchMock.mockRejectedValue(new TypeError())],
    [
      "a non-ok response",
      () => fetchMock.mockResolvedValue(new Response("", { status: 500 })),
    ],
  ])("ends in error after %s", async (_, arrange) => {
    arrange();
    const { result } = renderFilled();

    act(() => result.current.submit(""));

    await waitFor(() => expect(result.current.state.status).toBe("error"));
  });
});
