"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const emptyForm = {
  id: "",
  name: "",
  slug: "",
  description: "",
  logoId: "",
  logoUrl: "",
};

async function readResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}

export default function BrandsManager() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [logoFile, setLogoFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadBrands = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cms/brand", {
        cache: "no-store",
      });

      const data = await readResponse(response);

      setBrands(data.brands || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setLogoFile(null);
    setMessage("");
    setError("");
  }

  function editBrand(brand) {
    setForm({
      id: brand._id,
      name: brand.name || "",
      slug: brand.slug || "",
      description: brand.description || "",
      logoId: brand.logoId || "",
      logoUrl: brand.logoUrl || "",
    });

    setLogoFile(null);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function uploadLogo(file) {
    const data = new FormData();
    data.append("file", file);

    const response = await fetch("/api/cms/projects/upload", {
      method: "POST",
      body: data,
    });

    return readResponse(response);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      let logoId = form.logoId;

      if (logoFile) {
        const uploaded = await uploadLogo(logoFile);
        logoId = uploaded.assetId;
      }

      const payload = {
        name: form.name,
        slug:
          form.slug ||
          form.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        description: form.description,
        logoId,
      };

      const response = await fetch("/api/cms/brand", {
        method: form.id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          id: form.id || undefined,
        }),
      });

      await readResponse(response);

      setMessage(
        form.id ? "Brand updated successfully." : "Brand created successfully.",
      );

      resetForm();
      await loadBrands();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteBrand(brand) {
    const confirmed = window.confirm(
      `Delete "${brand.name}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/cms/brand", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: brand._id,
        }),
      });

      await readResponse(response);

      if (form.id === brand._id) {
        resetForm();
      }

      setMessage("Brand deleted successfully.");

      await loadBrands();
    } catch (err) {
      setError(err.message);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";

  return (
    <main className="min-h-screen bg-[#f5f3ff] text-slate-900">
      {/* HEADER */}
      <header className="relative overflow-hidden border-b border-white/10 bg-[#17142f] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-7 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <Link
                href="/cms/dashboard"
                className="inline-flex items-center gap-2 text-sm text-violet-200 transition hover:text-white"
              >
                <span className="text-lg">←</span>
                Back to dashboard
              </Link>

              <div className="mt-5 flex items-center gap-3">
                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">
                  LEEX CMS
                </span>

                <span className="h-1 w-1 rounded-full bg-violet-300" />

                <span className="text-xs text-slate-400">
                  Client management
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Brand manager
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Manage the brands and clients connected to your creative
                portfolio.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              + New brand
            </button>
          </div>

          {/* STATS */}
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Brands
              </p>

              <p className="mt-1 text-xl font-bold">{brands.length}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                With logos
              </p>

              <p className="mt-1 text-xl font-bold">
                {brands.filter((brand) => brand.logoUrl).length}
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Portfolio
              </p>

              <p className="mt-1 text-xl font-bold">LEEX</p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:py-10">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            <span className="mt-0.5">!</span>
            <p>{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            <span className="mt-0.5">✓</span>
            <p>{message}</p>
          </div>
        )}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          {/* FORM */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(30,20,80,0.25)]">
            <div className="border-b border-slate-100 bg-gradient-to-r from-white to-violet-50/60 px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                    {form.id ? "Editing existing client" : "New client"}
                  </p>

                  <h2 className="mt-2 text-xl font-bold tracking-tight">
                    {form.id ? "Edit brand" : "Create a brand"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add the identity and information for a client brand.
                  </p>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl text-violet-600 sm:flex">
                  ◈
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">
              {/* BRAND INFORMATION */}
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-bold">Brand information</h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Basic information used throughout the CMS and portfolio.
                  </p>
                </div>

                <div className="space-y-5">
                  <label className="block text-sm font-medium">
                    Brand name *
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={(event) => {
                        const name = event.target.value;

                        setForm((current) => ({
                          ...current,
                          name,
                          slug:
                            current.id || current.slug
                              ? current.slug
                              : name
                                  .toLowerCase()
                                  .trim()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/^-|-$/g, ""),
                        }));
                      }}
                      placeholder="e.g. Papilon"
                      required
                    />
                  </label>

                  <label className="block text-sm font-medium">
                    URL slug *
                    <input
                      className={inputClass}
                      value={form.slug}
                      onChange={(event) =>
                        updateField("slug", event.target.value)
                      }
                      placeholder="papilon"
                      required
                    />
                    <span className="mt-2 block text-xs text-slate-400">
                      Used as the brand's unique identifier.
                    </span>
                  </label>

                  <label className="block text-sm font-medium">
                    Description
                    <textarea
                      rows={5}
                      className={inputClass}
                      value={form.description}
                      onChange={(event) =>
                        updateField("description", event.target.value)
                      }
                      placeholder="Tell visitors a little about this brand..."
                    />
                  </label>
                </div>
              </div>

              {/* LOGO */}
              <div className="border-t border-slate-100 pt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-bold">Brand identity</h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Upload the primary logo used to represent this client.
                  </p>
                </div>

                <label className="block cursor-pointer">
                  <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-violet-300 hover:bg-violet-50/30">
                    {logoFile ? (
                      <div className="relative flex aspect-[16/8] items-center justify-center bg-white p-8">
                        <img
                          src={URL.createObjectURL(logoFile)}
                          alt="Selected logo"
                          className="h-full w-full object-contain"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                          <span className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                            Change logo
                          </span>
                        </div>
                      </div>
                    ) : form.logoUrl ? (
                      <div className="relative flex aspect-[16/8] items-center justify-center bg-white p-8">
                        <img
                          src={form.logoUrl}
                          alt={`${form.name} logo`}
                          className="h-full w-full object-contain"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                          <span className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                            Replace logo
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/8] flex-col items-center justify-center px-6 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-xl text-violet-600">
                          ↑
                        </span>

                        <p className="mt-4 text-sm font-semibold">
                          Upload brand logo
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          PNG, JPG, WEBP or other supported image
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Maximum 50 MB
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        setLogoFile(event.target.files?.[0] || null)
                      }
                    />
                  </div>
                </label>

                {logoFile && (
                  <p className="mt-3 truncate text-xs text-violet-600">
                    Selected: {logoFile.name}
                  </p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-7">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : form.id
                      ? "Save changes"
                      : "Create brand"}
                </button>

                {form.id && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold transition hover:bg-slate-50"
                  >
                    Cancel editing
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* BRAND LIST */}
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                  Clients
                </p>

                <h2 className="mt-1 text-xl font-bold">Existing brands</h2>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                {brands.length} total
              </span>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="space-y-4 animate-pulse">
                  <div className="h-48 rounded-2xl bg-slate-100" />
                  <div className="h-5 w-2/3 rounded bg-slate-100" />
                  <div className="h-4 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
            ) : brands.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-600">
                  ◈
                </div>

                <h3 className="mt-5 font-bold">No brands yet</h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Add your first client brand using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {brands.map((brand, index) => (
                  <article
                    key={brand._id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_45px_-30px_rgba(30,20,80,0.3)] transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_25px_60px_-30px_rgba(90,50,180,0.3)]"
                  >
                    {/* LOGO */}
                    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-slate-50 p-8">
                      {brand.logoUrl ? (
                        <img
                          src={brand.logoUrl}
                          alt={brand.name}
                          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-3xl font-black text-violet-500">
                          {brand.name?.charAt(0)?.toUpperCase() || "B"}
                        </div>
                      )}

                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600 backdrop-blur-md">
                        CLIENT
                      </span>
                    </div>

                    {/* DETAILS */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold tracking-tight">
                            {brand.name}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-violet-600">
                            /{brand.slug}
                          </p>
                        </div>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm text-violet-600">
                          ◈
                        </span>
                      </div>

                      {brand.description && (
                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                          {brand.description}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => editBrand(brand)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteBrand(brand)}
                            className="rounded-lg border border-rose-100 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>

                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-300">
                          Brand
                        </span>
                      </div>
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
