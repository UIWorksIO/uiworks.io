import { FormEvent, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { isValidEmail, subscribeViaSubstack } from "../lib/substack";

type WaitlistFormProps = {
  id?: string;
  size?: "default" | "large";
  className?: string;
  variant?: "light" | "dark";
};

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  id = "waitlist",
  size = "default",
  className = "",
  variant = "light",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const dark = variant === "dark";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid work email.");
      return;
    }

    setStatus("loading");
    setMessage("");
    await new Promise((r) => setTimeout(r, 450));
    subscribeViaSubstack(email);
    setStatus("success");
    setMessage("You're on the list. Confirm in the Substack tab if prompted.");
  }

  const isLarge = size === "large";
  const inputId = `${id}-email`;

  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-3 rounded-full border border-brand/30 bg-brand-wash px-5 py-4 text-sm text-ink ${className}`}
        role="status"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-snow">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <p className="font-medium leading-snug">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} noValidate>
      <div
        className={`group relative flex flex-col gap-2 rounded-full border p-1.5 shadow-[0_12px_40px_-24px_rgba(20,20,20,0.35)] transition focus-within:border-brand/50 sm:flex-row sm:items-center ${
          dark
            ? "border-white/15 bg-white/10"
            : "border-line bg-snow"
        } ${isLarge ? "sm:p-2" : ""}`}
      >
        <label htmlFor={inputId} className="sr-only">
          Work email
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          className={`min-w-0 flex-1 rounded-full bg-transparent px-5 outline-none disabled:opacity-60 ${
            dark
              ? "text-snow placeholder:text-white/45"
              : "text-ink placeholder:text-mist/80"
          } ${isLarge ? "py-3.5 text-base" : "py-3 text-[15px]"}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 font-semibold text-snow transition hover:bg-[#ff6a33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 ${
            isLarge ? "py-3.5 text-base" : "py-3 text-sm"
          }`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Request Early Access
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 px-3 text-sm text-red-600" role="alert">
          {message}
        </p>
      )}
      <p className={`mt-3 px-3 text-xs ${dark ? "text-white/55" : "text-mist"}`}>
        Early access is limited. No spam — product updates only.
      </p>
    </form>
  );
}
