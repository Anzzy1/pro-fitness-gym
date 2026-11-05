"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, EXTRA_INQUIRY_OPTIONS, FORM_CONFIG, PLANS } from "@/data/site";
import { CheckIcon } from "./Icons";

type Field = "name" | "email" | "phone" | "plan";
type FieldEl = HTMLInputElement | HTMLSelectElement;

/** Inquiry form: name + plan required, at least one of email / PH mobile. Emails the gym via FormSubmit. */
export default function InquiryForm() {
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    plan: useRef<HTMLSelectElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
    honey: useRef<HTMLInputElement>(null),
  };
  const formRef = useRef<HTMLFormElement>(null);
  const [invalid, setInvalid] = useState<Record<Field | "contact", boolean>>({ name: false, email: false, phone: false, plan: false, contact: false });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const el = (f: Field) => refs[f].current as FieldEl;
  const mark = (f: Field | "contact", bad: boolean) => setInvalid((s) => (s[f] === bad ? s : { ...s, [f]: bad }));

  const validateField = (f: Field) => {
    const e = el(f);
    const ok = e.checkValidity() && (e.type !== "text" || e.value.trim().length > 1);
    mark(f, !ok);
    return ok;
  };
  const validateContact = () => {
    const hasOne = el("email").value.trim() !== "" || el("phone").value.trim() !== "";
    mark("contact", !hasOne);
    const emailOk = validateField("email"), phoneOk = validateField("phone");
    return { ok: hasOne && emailOk && phoneOk, hasOne, emailOk, phoneOk };
  };
  const cleanPhone = () => { const p = el("phone"); p.value = p.value.replace(/[\s-]/g, ""); };

  // "Choose plan" buttons in the Membership section prefill the dropdown
  useEffect(() => {
    let t = 0;
    const onClick = (e: MouseEvent) => {
      const planBtn = (e.target as HTMLElement).closest<HTMLElement>("[data-plan]");
      if (!planBtn) return;
      refs.plan.current!.value = planBtn.dataset.plan!;
      mark("plan", false);
      t = window.setTimeout(() => refs.name.current?.focus({ preventScroll: true }), 700);
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBlur = (f: Field) => () => {
    if (f === "phone") cleanPhone();
    if (f === "email" || f === "phone") { if (el(f).value) validateField(f); }
    else validateField(f); // name + plan are required
  };
  const onInput = (f: Field) => () => {
    if (invalid[f]) validateField(f);
    if ((f === "email" || f === "phone") && invalid.contact) validateContact();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    cleanPhone();
    const nameOk = validateField("name"), planOk = validateField("plan");
    const contact = validateContact();
    if (!nameOk || !planOk || !contact.ok) {
      // focus the first problem, in page order
      const first = !nameOk ? "name" : !contact.emailOk ? "email" : !contact.phoneOk ? "phone" : !planOk ? "plan" : !contact.hasOne ? "email" : null;
      if (first) el(first).focus();
      return;
    }
    if (refs.honey.current!.value) return; // bot

    if (!FORM_CONFIG.email) {
      console.warn("FORM_CONFIG.email is empty — set the gym's email in src/data/site.ts.");
      setError(`Sorry, online inquiries aren't set up yet. Please call or text us at ${CONTACT.phoneDisplay}.`);
      return;
    }

    const name = el("name").value.trim(), email = el("email").value.trim();
    const data: Record<string, string> = {
      name,
      contact_email: email || "(not provided)",
      contact_mobile: el("phone").value.trim() || "(not provided)",
      interested_in: el("plan").value,
      message: refs.message.current!.value.trim() || "(none)",
      _subject: `${FORM_CONFIG.subject} — ${name}`,
      _template: "table",
      _captcha: "false",
    };
    if (email) data._replyto = email; // manager can hit "Reply"

    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FORM_CONFIG.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || `HTTP ${res.status}`);
      setSent(true);
      formRef.current!.reset();
    } catch (err) {
      console.error("Inquiry failed:", err);
      setError(`Sorry, we couldn't send your inquiry right now. Please try again, or call/text us at ${CONTACT.phoneDisplay}.`);
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (f: Field) => `field${invalid[f] ? " is-invalid" : ""}`;

  return (
    <form className="form reveal-right" id="inquiryForm" noValidate ref={formRef} onSubmit={onSubmit}>
      <h3><span data-promo="">Claim your promo</span><span data-regular="">Send us an inquiry</span></h3>
      <p className="form__sub">Send us your details and our team will get back to you by email or text.</p>

      {/* spam trap: real visitors never see or fill this */}
      <input type="text" name="_honey" className="form__honey" tabIndex={-1} autoComplete="off" aria-hidden="true" ref={refs.honey} />

      <div className={fieldClass("name")}>
        <input type="text" id="fName" name="name" placeholder=" " required autoComplete="name" ref={refs.name} onBlur={onBlur("name")} onInput={onInput("name")} />
        <label htmlFor="fName">Full name</label>
        <small className="err">Please enter your name.</small>
      </div>

      <fieldset className={`contact-group${invalid.contact ? " is-invalid" : ""}`} id="contactGroup">
        <legend>How can we reach you? <span>Email, mobile, or both</span></legend>
        <div className={fieldClass("email")}>
          <input type="email" id="fEmail" name="email" placeholder=" " autoComplete="email" inputMode="email" ref={refs.email} onBlur={onBlur("email")} onInput={onInput("email")} />
          <label htmlFor="fEmail">Email address</label>
          <small className="err">Enter a valid email, e.g. juan@gmail.com.</small>
        </div>
        <div className={fieldClass("phone")}>
          <input type="tel" id="fPhone" name="phone" placeholder=" " autoComplete="tel" inputMode="tel" pattern="^(\+63|0)9\d{9}$" ref={refs.phone} onBlur={onBlur("phone")} onInput={onInput("phone")} />
          <label htmlFor="fPhone">Mobile number (09XX…)</label>
          <small className="err">Enter a valid PH mobile number, e.g. 09171234567.</small>
        </div>
        <small className="err contact-group__err">Please give us at least your email or mobile number.</small>
      </fieldset>

      <div className={fieldClass("plan")}>
        <select id="fPlan" name="plan" required defaultValue="" ref={refs.plan} onBlur={onBlur("plan")} onInput={onInput("plan")}>
          <option value="" disabled hidden></option>
          {PLANS.map((p) => <option key={p.label}>{p.label}</option>)}
          {EXTRA_INQUIRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <label htmlFor="fPlan">Interested in</label>
        <small className="err">Please choose an option.</small>
      </div>
      <div className="field">
        <textarea id="fMessage" name="message" placeholder=" " rows={3} maxLength={1000} ref={refs.message}></textarea>
        <label htmlFor="fMessage">Message (optional)</label>
      </div>

      <button type="submit" className="btn btn--primary btn--block btn--lg" id="formSubmit" hidden={sent} disabled={sending}>
        {sending ? "Sending…" : "Send inquiry"}
      </button>
      <div className="form__error" id="formError" role="alert" hidden={!error}>{error}</div>
      <div className="form__success" id="formSuccess" role="status" hidden={!sent}>
        <CheckIcon />
        <p><b>Inquiry sent!</b> Thanks — our team will contact you soon.</p>
      </div>
    </form>
  );
}
