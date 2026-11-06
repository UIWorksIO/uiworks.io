import { FormEvent, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { isValidEmail, subscribeViaSubstack } from "../lib/substack";

type WaitlistFormProps = {
  id?: string;
  size?: "default" | "large";
  className?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  id = "waitlist",
  size = "default",
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid work email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Brief intentional delay so the control feels wired; then Substack.
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
        className={`flex items-center gap-3 rounded-2xl border border-brand/40 bg-brand/10 px-5 py-4 text-sm text-snow ${className}`}
        role="status"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <p className="font-medium leading-snug">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} noValidate>
      <div
        className={`group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_0_0_1px_rgba(254,176,0,0.08),0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md transition focus-within:border-brand/50 focus-within:shadow-[0_0_0_1px_rgba(254,176,0,0.35),0_0_40px_-8px_rgba(254,176,0,0.35)] sm:flex-row sm:items-center ${
          isLarge ? "sm:p-2.5" : ""
        }`}
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
          className={`min-w-0 flex-1 rounded-xl bg-transparent px-4 text-snow outline-none placeholder:text-mist/70 disabled:opacity-60 ${
            isLarge ? "py-3.5 text-base" : "py-3 text-[15px]"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 font-semibold text-ink transition hover:bg-[#ffc133] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 ${
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
        <p className="mt-2 px-1 text-sm text-red-400" role="alert">
          {message}
        </p>
      )}
      <p className="mt-3 px-1 text-xs text-mist/80">
        Early access is limited. No spam — product updates only.
      </p>
    </form>
  );
}
