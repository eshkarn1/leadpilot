"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { leadSchema, type LeadFormInput } from "@/lib/validators/lead";

const emptyForm: LeadFormInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  serviceNeeded: "",
  message: ""
};

export default function LeadForm() {
  const router = useRouter();
  const [form, setForm] = useState<LeadFormInput>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof LeadFormInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field) {
          fieldErrors[field.toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed.data)
      });

      if (!response.ok) {
        const payload = await response.json();
        setErrors({ form: payload.error ?? "Something went wrong." });
        return;
      }

      setForm(emptyForm);
      router.push("/thank-you");
    } catch (error) {
      setErrors({ form: "Unable to submit right now. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Name
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Jordan Smith"
          />
          {errors.name ? (
            <span className="text-xs text-red-600">{errors.name}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Email
          <input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            className="rounded-lg border border-slate-200 px-3 py-2"
            placeholder="jordan@company.com"
          />
          {errors.email ? (
            <span className="text-xs text-red-600">{errors.email}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Phone
          <input
            value={form.phone ?? ""}
            onChange={(event) => updateField("phone", event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
            placeholder="(555) 123-4567"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Company
          <input
            value={form.company ?? ""}
            onChange={(event) => updateField("company", event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
            placeholder="LeadPilot Inc."
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Service Needed
        <input
          value={form.serviceNeeded}
          onChange={(event) => updateField("serviceNeeded", event.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2"
          placeholder="Website build, automation, SEO..."
        />
        {errors.serviceNeeded ? (
          <span className="text-xs text-red-600">{errors.serviceNeeded}</span>
        ) : null}
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Message
        <textarea
          value={form.message ?? ""}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-[120px] rounded-lg border border-slate-200 px-3 py-2"
          placeholder="Tell us about your goals or project timeline."
        />
      </label>
      {errors.form ? (
        <p className="text-sm text-red-600">{errors.form}</p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Request a Demo"}
      </button>
    </form>
  );
}
