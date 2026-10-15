"use client";

import { useCallback, useEffect, useState } from "react";

const categories = [
  { label: "Graphic Design", value: "graphic-design" },
  { label: "UI/UX Design", value: "ui-ux" },
  { label: "3D Design", value: "3d-design" },
  { label: "Video Editing", value: "video-editing" },
  { label: "Other", value: "other" },
];

const emptyForm = {
  name: "",
  category: "graphic-design",
  proficiency: 80,
  description: "",
  sortOrder: 0,
  featured: false,
  isVisible: true,
  logoId: "",
  logoUrl: "",
};

async function readResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

export default function ToolsDashboardPage() {
  const [tools, setTools] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadTools = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cms/tools", {
        cache: "no-store",
      });
      const data = await readResponse(response);
      setTools(data.tools || []);
    } catch (err) {
      setError(err.message || "Could not load tools.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setLogoFile(null);

    const input = document.getElementById("tool-logo");
    if (input) input.value = "";
  }

  function startEditing(tool) {
    setEditingId(tool._id);

    setForm({
      name: tool.name || "",
      category: tool.category || "other",
      proficiency: tool.proficiency ?? 0,
      description: tool.description || "",
      sortOrder: tool.sortOrder ?? 0,
      featured: tool.featured ?? false,
      isVisible: tool.isVisible ?? false,
      logoId: tool.logoId || "",
      logoUrl: tool.logoUrl || "",
    });

    setLogoFile(null);
    setError("");
    setSuccess("");

    const input = document.getElementById("tool-logo");
    if (input) input.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadLogo() {
    if (!logoFile) return form.logoId;

    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", logoFile);

      const response = await fetch("/api/cms/tools/upload", {
        method: "POST",
        body: data,
      });

      const result = await readResponse(response);

      setForm((current) => ({
        ...current,
        logoId: result.assetId,
        logoUrl: result.url,
      }));

      return result.assetId;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Enter the tool name.");
      return;
    }

    if (!editingId && !logoFile && !form.logoId) {
      setError("Select a logo image for this tool.");
      return;
    }

    setSaving(true);

    try {
      const logoId = await uploadLogo();

      if (!editingId && !logoId) {
        throw new Error("Please upload a tool logo.");
      }

      const payload = {
        ...form,
        proficiency: Number(form.proficiency),
        sortOrder: Number(form.sortOrder) || 0,
        featured: Boolean(form.featured),
        isVisible: Boolean(form.isVisible),
        logoId,
      };

      const response = await fetch("/api/cms/tools", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { ...payload, id: editingId } : payload,
        ),
      });

      await readResponse(response);

      setSuccess(
        editingId
          ? "Tool updated successfully."
          : "Tool added successfully.",
      );

      resetForm();
      await loadTools();
    } catch (err) {
      setError(err.message || "Could not save the tool.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteTool(tool) {
    if (!window.confirm(`Delete "${tool.name}"? This cannot be undone.`)) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/cms/tools", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: tool._id }),
      });

      await readResponse(response);

      if (editingId === tool._id) resetForm();

      setSuccess(`${tool.name} was deleted.`);
      await loadTools();
    } catch (err) {
      setError(err.message || "Could not delete the tool.");
    }
  }

  async function toggleVisibility(tool) {
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/cms/tools", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: tool._id,
          name: tool.name,
          category: tool.category,
          proficiency: tool.proficiency ?? 0,
          description: tool.description || "",
          sortOrder: tool.sortOrder ?? 0,
          featured: Boolean(tool.featured),
          isVisible: !tool.isVisible,
        }),
      });

      await readResponse(response);

      setSuccess(
        `${tool.name} is now ${tool.isVisible ? "hidden" : "visible"}.`,
      );

      await loadTools();
    } catch (err) {
      setError(err.message || "Could not change tool visibility.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

  return (
    <main className="min-h-screen px-5 py-8 text-slate-900 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
            LEEX Creative Studio
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Tools & Technologies
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage your tool logos, categories, proficiency levels, homepage
            features, and public visibility.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
          >
            {success}
          </div>
        )}

        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                {editingId ? "Edit tool" : "Add a tool"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Fields marked as required must be completed.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Tool name *
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="e.g. Adobe Photoshop"
                  className={inputClass}
                  required
                />
              </label>

              <label className="block text-sm font-semibold">
                Category *
                <select
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  className={inputClass}
                  required
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label
                className="block text-sm font-semibold"
                htmlFor="tool-logo"
              >
                Tool logo{" "}
                {editingId
                  ? "(optional when keeping the current logo)"
                  : "*"}
              </label>

              <input
                id="tool-logo"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setLogoFile(file);
                  setError("");
                }}
                className={`${inputClass} file:mr-4 file:rounded-lg file:border-0 file:bg-violet-50 file:px-3 file:py-2 file:font-semibold file:text-violet-700`}
              />

              {logoFile ? (
                <p className="mt-2 text-xs text-slate-500">
                  Selected: {logoFile.name}
                </p>
              ) : form.logoUrl ? (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={form.logoUrl}
                    alt="Current tool logo"
                    className="h-14 w-14 rounded-xl border border-slate-200 object-contain p-2"
                  />
                  <span className="text-xs text-slate-500">Current logo</span>
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  rows={3}
                  placeholder="Briefly describe how you use this tool."
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Proficiency: {form.proficiency}%
                <input
                  type="range"
                  name="proficiency"
                  min="0"
                  max="100"
                  step="1"
                  value={form.proficiency}
                  onChange={updateField}
                  className="mt-4 w-full accent-violet-600"
                />
              </label>

              <label className="block text-sm font-semibold">
                Display order
                <input
                  type="number"
                  name="sortOrder"
                  min="0"
                  value={form.sortOrder}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/70 p-4">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={updateField}
                className="mt-1 h-4 w-4 accent-violet-600"
              />

              <span>
                <span className="block text-sm font-semibold">
                  Featured on Homepage
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Select this to include the tool in the homepage section.
                  Only the first five featured, visible tools are displayed.
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4">
              <input
                type="checkbox"
                name="isVisible"
                checked={form.isVisible}
                onChange={updateField}
                className="mt-1 h-4 w-4 accent-violet-600"
              />

              <span>
                <span className="block text-sm font-semibold">
                  Show on public Tools page
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Disable this to hide the tool from both the homepage and the
                  public Tools page. Hidden tools remain in your CMS.
                </span>
              </span>
            </label>

            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading
                ? "Uploading logo..."
                : saving
                  ? "Saving..."
                  : editingId
                    ? "Save changes"
                    : "Add tool"}
            </button>
          </form>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Your tools</h2>
              <p className="mt-1 text-sm text-slate-500">
                {tools.length} {tools.length === 1 ? "tool" : "tools"} in the
                CMS
              </p>
            </div>

            <button
              type="button"
              onClick={loadTools}
              disabled={loading}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Loading tools...
            </p>
          ) : tools.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="font-bold">No tools added yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Use the form above to add your first tool.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((tool) => (
                <article
                  key={tool._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    {tool.logoUrl ? (
                      <img
                        src={tool.logoUrl}
                        alt=""
                        className="h-14 w-14 rounded-xl border border-slate-100 object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-50 text-xl font-black text-violet-600">
                        {tool.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold">{tool.name}</h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {categories.find(
                          (item) => item.value === tool.category,
                        )?.label || tool.category}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Proficiency: {tool.proficiency ?? 0}% · Order:{" "}
                        {tool.sortOrder ?? 0}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                            tool.isVisible
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {tool.isVisible ? "Visible" : "Hidden"}
                        </span>

                        {tool.featured && (
                          <span className="inline-block rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {tool.description && (
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {tool.description}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => startEditing(tool)}
                      className="rounded-lg bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleVisibility(tool)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                      {tool.isVisible ? "Hide" : "Show"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteTool(tool)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
