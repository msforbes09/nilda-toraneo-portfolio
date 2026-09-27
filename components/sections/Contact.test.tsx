import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://formspree.io/f/test123");
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

const field = (name: string) => screen.getByLabelText(name);

async function fillAndSend() {
  const user = userEvent.setup();
  render(<Contact />);
  await user.type(field("Name"), "Ana Reyes");
  await user.type(field("Email"), "ana@example.com");
  await user.type(field("Message"), "I need help with my PPC.");
  await user.click(screen.getByRole("button", { name: "Send message" }));
  return user;
}

describe("Contact", () => {
  it("renders the labelled fields and an enabled send button", () => {
    render(<Contact />);

    for (const name of ["Name", "Email", "Message"]) {
      expect(field(name)).toBeEnabled();
    }
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });

  it("shows each field's error on an invalid submit and sends nothing", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(field("Name")).toHaveAttribute("aria-invalid", "true");
    expect(field("Name")).toHaveFocus();
    expect(field("Name")).toHaveAccessibleDescription("Enter your name.");
    expect(field("Email")).toHaveAccessibleDescription(
      "Enter a valid email address, like name@example.com.",
    );
    expect(field("Message")).toHaveAccessibleDescription(
      "Write a message of at least 10 characters.",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("marks the button busy and disabled while sending", async () => {
    fetchMock.mockReturnValue(new Promise(() => {}));

    await fillAndSend();

    const button = screen.getByRole("button", { name: "Sending…" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("confirms and focuses the success message once the service accepts", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));

    await fillAndSend();

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("Message sent");
    expect(status).toHaveFocus();
  });

  it("shows the error and restores the typed values on Try again", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

    const user = await fillAndSend();
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Your message didn’t send");
    await user.click(within(alert).getByRole("button", { name: "Try again" }));

    expect(field("Name")).toHaveValue("Ana Reyes");
    expect(field("Email")).toHaveValue("ana@example.com");
    expect(field("Message")).toHaveValue("I need help with my PPC.");
    const send = screen.getByRole("button", { name: "Send message" });
    expect(send).toBeEnabled();
    expect(send).toHaveFocus();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("looks sent without calling the service when the honeypot is filled", async () => {
    const user = userEvent.setup();
    const { container } = render(<Contact />);
    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="company"]',
    )!;
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
    expect(honeypot.closest("[aria-hidden='true']")).not.toBeNull();

    fireEvent.change(honeypot, { target: { value: "Acme Bots Ltd" } });
    await user.type(field("Name"), "Bot");
    await user.type(field("Email"), "bot@example.com");
    await user.type(field("Message"), "Buy cheap followers now");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByRole("status")).toHaveTextContent("Message sent");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("disables the form and points to email when no endpoint is set", () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "");
    render(<Contact />);

    expect(
      screen.getByRole("group", { name: "Send a message" }),
    ).toBeDisabled();
    const note = screen.getByRole("note");
    expect(within(note).getByRole("link")).toHaveAttribute(
      "href",
      "mailto:nildatoraneo@gmail.com",
    );

    fireEvent.submit(screen.getByRole("form", { name: "Contact form" }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["set", "https://formspree.io/f/test123"],
    ["empty", ""],
  ])("keeps the email and LinkedIn links with the endpoint %s", (_, value) => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", value);
    render(<Contact />);

    expect(
      screen.getByRole("link", { name: /^Email nildatoraneo@gmail\.com$/ }),
    ).toHaveAttribute("href", "mailto:nildatoraneo@gmail.com");
    const linkedin = screen.getByRole("link", { name: /^LinkedIn/ });
    expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nilda-toraneo/",
    );
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("offers the resume download marked as a sample", () => {
    render(<Contact />);

    expect(
      screen.getByRole("link", { name: /Download resume \(PDF\) Sample$/ }),
    ).toHaveAttribute("href", "/resume-sample.pdf");
  });
});
