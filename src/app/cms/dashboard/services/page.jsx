"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const emptyForm = {
  id: "",
  title: "",
  number: "",
  description: "",
  order: 1,
  subServicesText: "",
  isVisible: true,
};

async function readResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}

function formatDate(value) {
  if (!value) return "Recently added";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ServicesManagerPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cms/services", {
        cache: "no-store",
      });

      const data = await readResponse(response);
      setServices(data.services || []);
    } catch (err) {
      setError(err.message || "Could not load services.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    const nextOrder =
      services.reduce(
        (maximum, service) => Math.max(maximum, Number(service.order) || 0),
        0,
      ) + 1;

    setForm({
      ...emptyForm,
      order: nextOrder,
      number: String(services.length + 1).padStart(2, "0"),
    });

    setMessage("");
    setError("");
  }

  function editService(service) {
    setForm({
      id: service._id,
      title: service.title || "",
      number: service.number || "",
      description: service.description || "",
      order: Number(service.order) || 0,
      subServicesText: (service.subServices || [])
        .map((item) => item.title)
        .filter(Boolean)
        .join("\n"),
      isVisible: service.isVisible !== false,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function buildPayload() {
    return {
      id: form.id || undefined,
      title: form.title.trim(),
      number: form.number.trim(),
      description: form.description.trim(),
      order: Number(form.order),
      isVisible: form.isVisible,
      subServices: form.subServicesText
        .split("\n")
        .map((title) => title.trim())
        .filter(Boolean)
        .map((title) => ({ title })),
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/cms/services", {
        method: form.id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload()),
      });

      await readResponse(response);

      setMessage(
        form.id
          ? "Service updated successfully."
          : "Service created successfully.",
      );

      setForm(emptyForm);
      await loadServices();
    } catch (err) {
      setError(err.message || "Could not save service.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteService(service) {
    const confirmed = window.confirm(
      `Delete "${service.title}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(service._id);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/cms/services", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: service._id }),
      });

      await readResponse(response);

      if (form.id === service._id) {
        setForm(emptyForm);
      }

      setMessage("Service deleted successfully.");
      await loadServices();
    } catch (err) {
      setError(err.message || "Could not delete service.");
    } finally {
      setDeletingId("");
    }
  }

  async function toggleVisibility(service) {
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/cms/services", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: service._id,
          title: service.title,
          number: service.number,
          description: service.description,
          order: Number(service.order) || 0,
          isVisible: service.isVisible === false,
          subServices: service.subServices || [],
        }),
      });

      await readResponse(response);

      setMessage(
        service.isVisible === false
          ? "Service is now visible."
          : "Service hidden from the website.",
      );

      await loadServices();
    } catch (err) {
      setError(err.message || "Could not update visibility.");
    }
  }

  const visibleCount = services.filter(
    (service) => service.isVisible !== false,
  ).length;

  const hiddenCount = services.length - visibleCount;

  return (
    <main className="min-h-screen bg-[#f5f3ff] text-slate-900">
      {/* HEADER */}
      <header className="relative overflow-hidden border-b border-white/10 bg-[#17142f] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-7 sm:px-10">
          <Link
            href="/cms/dashboard"
            className="inline-flex items-center gap-2 text-sm text-violet-200 transition hover:text-white"
          >
            <span className="text-lg">←</span>
            Back to dashboard
          </Link>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">
                  LEEX CMS
                </span>
                <span className="h-1 w-1 rounded-full bg-violet-300" />
                <span className="text-xs text-slate-400">Website content</span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Services manager
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Add and manage your studio services directly from your custom
                dashboard.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              + New service
            </button>
          </div>

          {/* STATS */}
          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Total services
              </p>
              <p className="mt-1 text-xl font-bold">{services.length}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Visible
              </p>
              <p className="mt-1 text-xl font-bold text-emerald-300">
                {visibleCount}
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Hidden
              </p>
              <p className="mt-1 text-xl font-bold text-amber-300">
                {hiddenCount}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:py-10">
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700"
          >
            {message}
          </div>
        )}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          {/* SERVICE FORM */}
          <section className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-white to-violet-50/60 px-6 py-6 sm:px-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                {form.id ? "Editing existing service" : "New studio service"}
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight">
                {form.id ? "Edit service" : "Create a service"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Changes are saved to Sanity through your custom CMS.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              <label className="block text-sm font-medium">
                Service title *
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="e.g. Video Editing"
                  required
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Display number *
                  <input
                    className={inputClass}
                    value={form.number}
                    onChange={(event) =>
                      updateField("number", event.target.value)
                    }
                    placeholder="08"
                    required
                  />
                </label>

                <label className="block text-sm font-medium">
                  Display order *
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className={inputClass}
                    value={form.order}
                    onChange={(event) =>
                      updateField("order", event.target.value)
                    }
                    required
                  />
                </label>
              </div>

              <label className="block text-sm font-medium">
                Description *
                <textarea
                  rows={5}
                  className={inputClass}
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Describe this service and what it offers..."
                  required
                />
              </label>

              <label className="block text-sm font-medium">
                Sub-services
                <textarea
                  rows={5}
                  className={inputClass}
                  value={form.subServicesText}
                  onChange={(event) =>
                    updateField("subServicesText", event.target.value)
                  }
                  placeholder={
                    "Ads Editing\nContent Editing\nUGC Editing\nMotion Graphics"
                  }
                />
                <span className="mt-2 block text-xs leading-5 text-slate-400">
                  Enter one sub-service per line. Leave empty if the service has
                  no sub-services.
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/50 p-4">
                <input
                  type="checkbox"
                  checked={form.isVisible}
                  onChange={(event) =>
                    updateField("isVisible", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-violet-600"
                />

                <span>
                  <span className="block text-sm font-semibold">
                    Visible on website
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    Turn this off to hide the service without deleting it.
                  </span>
                </span>
              </label>

              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving service..."
                    : form.id
                      ? "Save changes"
                      : "Create service"}
                </button>

                {form.id && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-slate-50"
                  >
                    Cancel editing
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* SERVICE LIST */}
          <section>
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                  Your content
                </p>
                <h2 className="mt-1 text-xl font-bold">Existing services</h2>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                {services.length} total
              </span>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="animate-pulse space-y-4">
                  <div className="h-5 w-2/3 rounded bg-slate-100" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
            ) : services.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-600">
                  ✦
                </div>

                <h3 className="mt-5 font-bold">No CMS services yet</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create your first service using the form. Your existing
                  hardcoded homepage services remain separate.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <article
                    key={service._id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                          {service.number} · Order {service.order}
                        </p>

                        <h3 className="mt-2 break-words text-lg font-bold">
                          {service.title}
                        </h3>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          service.isVisible === false
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {service.isVisible === false ? "Hidden" : "Visible"}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>

                    {service.subServices?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.subServices.map((item) => (
                          <span
                            key={item._key || item.title}
                            className="rounded-lg bg-violet-50 px-2.5 py-1.5 text-[11px] font-medium text-violet-700"
                          >
                            {item.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-4 text-[10px] text-slate-400">
                      Updated{" "}
                      {formatDate(service._updatedAt || service._createdAt)}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => editService(service)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleVisibility(service)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold transition hover:bg-slate-50"
                      >
                        {service.isVisible === false ? "Show" : "Hide"}
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === service._id}
                        onClick={() => deleteService(service)}
                        className="rounded-lg border border-rose-100 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                      >
                        {deletingId === service._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
