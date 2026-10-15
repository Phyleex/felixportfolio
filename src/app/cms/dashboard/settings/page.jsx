"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const initialSettings = {
  studioName: "LEEX Creative Studio",
  tagline: "",
  contactEmail: "",
  phone: "",
  whatsappNumber2: "",
  location: "",
  websiteTitle: "",
  metaDescription: "",
  xUrl: "",
  tiktokUrl: "",
  footerText: "",
  maintenanceMode: false,
  maintenanceMessage: "We're upgrading our website. We'll be back shortly.",
};

const sections = [
  {
    title: "Studio Identity",
    description: "Your studio name and tagline.",
    fields: [
      { name: "studioName", label: "Studio Name", required: true },
      { name: "tagline", label: "Tagline" },
    ],
  },
  {
    title: "Contact Information",
    description: "How potential clients can reach you.",
    fields: [
      { name: "contactEmail", label: "Contact Email", type: "email" },
      {
        name: "phone",
        label: "Phone / WhatsApp 1",
        description: "This number is used for the Phone button and WhatsApp 1.",
        type: "tel",
      },
      {
        name: "whatsappNumber2",
        label: "WhatsApp Number 2",
        description:
          "Enter the second number with country code, e.g. 2349010466336.",
        type: "tel",
      },
      { name: "location", label: "Location" },
    ],
  },
  {
    title: "SEO Settings",
    description: "Default information for search engine results.",
    fields: [
      { name: "websiteTitle", label: "Website Title" },
      {
        name: "metaDescription",
        label: "Meta Description",
        multiline: true,
        maxLength: 160,
      },
    ],
  },
  {
    title: "Social Media",
    description: "Add the full URL for each profile.",
    fields: [
      { name: "xUrl", label: "X (Twitter) URL", type: "url" },
      { name: "tiktokUrl", label: "TikTok URL", type: "url" },
    ],
  },
  {
    title: "Footer",
    description: "Information displayed at the bottom of your website.",
    fields: [{ name: "footerText", label: "Footer Text" }],
  },
];

export default function WebsiteSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/cms/settings", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load settings.");
        }

        if (data.settings) {
          setSettings({ ...initialSettings, ...data.settings });
        }
      } catch (error) {
        setNotice({ type: "error", text: error.message });
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function handleChange(name, value) {
    setSettings((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setNotice(null);

    try {
      const response = await fetch("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save settings.");
      }

      setSettings({ ...initialSettings, ...data.settings });
      setNotice({
        type: "success",
        text: data.message || "Settings saved successfully.",
      });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f3ff] px-4 py-8 text-slate-900 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/cms/dashboard"
          className="text-sm font-semibold text-violet-700 hover:text-violet-900"
        >
          ← Back to Dashboard
        </Link>

        <header className="mb-8 mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            LEEX / Configuration
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Website Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your studio information, contact details, SEO defaults,
            social profiles, maintenance mode, and website footer in one place.
          </p>
        </header>

        {notice && (
          <div
            role="status"
            className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
              notice.type === "error"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {notice.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* MAINTENANCE MODE */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold">Maintenance Mode</h2>
              <p className="mt-1 text-sm text-slate-500">
                Control whether public visitors can access your website. The CMS
                dashboard should remain available.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-800">
                  {settings.maintenanceMode
                    ? "Maintenance mode is ON"
                    : "Maintenance mode is OFF"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {settings.maintenanceMode
                    ? "Visitors should see your maintenance page once public-route protection is enabled."
                    : "Your public website is intended to remain available."}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={Boolean(settings.maintenanceMode)}
                aria-label="Toggle maintenance mode"
                onClick={() =>
                  handleChange("maintenanceMode", !settings.maintenanceMode)
                }
                className={`relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition ${
                  settings.maintenanceMode ? "bg-rose-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    settings.maintenanceMode ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Maintenance Message
              </span>
              <textarea
                rows={3}
                maxLength={300}
                value={settings.maintenanceMessage || ""}
                onChange={(event) =>
                  handleChange("maintenanceMessage", event.target.value)
                }
                placeholder="We're upgrading our website. We'll be back shortly."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
              <span className="mt-1 block text-right text-xs text-slate-400">
                {(settings.maintenanceMessage || "").length}/300 characters
              </span>
            </label>
          </section>

          {/* OTHER SETTINGS */}
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-700">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2 className="text-lg font-bold">{section.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {section.fields.map((field) => (
                  <label
                    key={field.name}
                    className={`block ${
                      field.multiline ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      {field.label}
                      {field.required ? " *" : ""}
                    </span>

                    {field.multiline ? (
                      <>
                        <textarea
                          rows={4}
                          maxLength={field.maxLength || 160}
                          value={settings[field.name] || ""}
                          onChange={(event) =>
                            handleChange(field.name, event.target.value)
                          }
                          placeholder="Describe your studio and services briefly."
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        />
                        <span className="mt-1 block text-right text-xs text-slate-400">
                          {(settings[field.name] || "").length}/
                          {field.maxLength || 160} characters
                        </span>
                      </>
                    ) : (
                      <>
                        <input
                          type={field.type || "text"}
                          required={Boolean(field.required)}
                          value={settings[field.name] || ""}
                          onChange={(event) =>
                            handleChange(field.name, event.target.value)
                          }
                          placeholder={
                            field.type === "url"
                              ? "https://..."
                              : field.type === "tel"
                                ? "e.g. 2348012345678"
                                : ""
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        />
                        {field.description && (
                          <span className="mt-1 block text-xs leading-5 text-slate-500">
                            {field.description}
                          </span>
                        )}
                      </>
                    )}
                  </label>
                ))}
              </div>
            </section>
          ))}

          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              {loading
                ? "Loading saved settings..."
                : "Save your changes to apply the settings."}
            </p>

            <button
              type="submit"
              disabled={loading || saving}
              className="rounded-xl bg-violet-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
