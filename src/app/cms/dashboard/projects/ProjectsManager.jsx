"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const UPLOAD_CONCURRENCY = 5;

const categories = [
  "Brand Identity",
  "Graphic Design",
  "Social Media Design",
  "Creative Campaigns",
  "Digital Design",
  "Other",
];

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  brandId: "",
  category: "Brand Identity",
  year: new Date().getFullYear().toString(),
  description: "",
  coverImageId: "",
  coverImageUrl: "",
  galleryIds: [],
  galleryImages: [],
  featured: false,
};

async function readResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ active: false, completed: 0, total: 0 });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cms/projects", {
        cache: "no-store",
      });

      const data = await readResponse(response);

      setProjects(data.projects || []);
      setBrands(data.brands || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setCoverFile(null);
    setGalleryFiles([]);
    setMessage("");
    setError("");
  }

  function editProject(project) {
    const galleryImages = Array.isArray(project.gallery) ? project.gallery : [];

    setForm({
      id: project._id,
      title: project.title || "",
      slug: project.slug?.current || "",
      brandId: project.brand?._id || "",
      category: project.category || "Other",
      year: project.year?.toString() || "",
      description: project.description || "",
      coverImageId: project.coverImage || "",
      coverImageUrl: project.coverImageUrl || "",
      galleryIds: galleryImages.map((image) => image.id),
      galleryImages,
      featured: Boolean(project.featured),
    });

    setCoverFile(null);
    setGalleryFiles([]);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function removeGalleryImage(imageId) {
    setForm((current) => ({
      ...current,
      galleryIds: current.galleryIds.filter((id) => id !== imageId),
      galleryImages: current.galleryImages.filter(
        (image) => image.id !== imageId,
      ),
    }));
  }

  function removeNewGalleryFile(index) {
    setGalleryFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index),
    );
  }

  async function uploadImage(file) {
    const data = new FormData();

    data.append("file", file);

    return readResponse(
      await fetch("/api/cms/projects/upload", {
        method: "POST",
        body: data,
      }),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      let coverImageId = form.coverImageId;

      if (coverFile) {
        const uploaded = await uploadImage(coverFile);
        coverImageId = uploaded.assetId;
      }

      const galleryIds = [...form.galleryIds];

      if (galleryFiles.length > 0) {
        const total = galleryFiles.length;
        const results = new Array(total);
        let nextIndex = 0;
        let completed = 0;

        setUploadProgress({ active: true, completed: 0, total });

        async function worker() {
          while (true) {
            const index = nextIndex++;
            if (index >= total) return;

            const uploaded = await uploadImage(galleryFiles[index]);
            results[index] = uploaded.assetId;
            completed += 1;
            setUploadProgress({ active: true, completed, total });
          }
        }

        const workerCount = Math.min(UPLOAD_CONCURRENCY, total);
        await Promise.all(Array.from({ length: workerCount }, () => worker()));
        galleryIds.push(...results);
      }

      setUploadProgress({ active: false, completed: 0, total: 0 });

      const payload = {
        title: form.title,
        slug:
          form.slug ||
          form.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        brandId: form.brandId,
        category: form.category,
        year: form.year,
        description: form.description,
        coverImageId,
        galleryIds,
        featured: form.featured,
      };

      const response = await fetch("/api/cms/projects", {
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
        form.id
          ? "Project updated successfully."
          : "Project created successfully.",
      );

      resetForm();
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(project) {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await readResponse(
        await fetch("/api/cms/projects", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: project._id,
          }),
        }),
      );

      if (form.id === project._id) {
        resetForm();
      }

      setMessage("Project deleted.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";

  return (
    <main className="min-h-screen bg-[#f5f3ff] text-slate-900">
      {/* TOP HEADER */}
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
                  Portfolio management
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Project manager
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Create, edit and organize the creative work displayed across
                your portfolio.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              + New project
            </button>
          </div>

          {/* STATS */}
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Projects
              </p>

              <p className="mt-1 text-xl font-bold">{projects.length}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Featured
              </p>

              <p className="mt-1 text-xl font-bold">
                {projects.filter((project) => project.featured).length}
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Brands
              </p>

              <p className="mt-1 text-xl font-bold">{brands.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:py-10">
        {/* ALERTS */}
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
                    {form.id ? "Editing existing work" : "New portfolio work"}
                  </p>

                  <h2 className="mt-2 text-xl font-bold tracking-tight">
                    {form.id ? "Edit project" : "Create a project"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add the details and visual assets for this project.
                  </p>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl text-violet-600 sm:flex">
                  ✦
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">
              {/* BASIC INFORMATION */}
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-bold">Project information</h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Basic information visitors will see about the project.
                  </p>
                </div>

                <div className="space-y-5">
                  <label className="block text-sm font-medium">
                    Project title *
                    <input
                      className={inputClass}
                      value={form.title}
                      onChange={(event) => {
                        const title = event.target.value;

                        setForm((current) => ({
                          ...current,
                          title,
                          slug:
                            current.id || current.slug
                              ? current.slug
                              : title
                                  .toLowerCase()
                                  .trim()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/^-|-$/g, ""),
                        }));
                      }}
                      placeholder="e.g. Papilon Social Media Campaign"
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
                      placeholder="papilon-social-media-campaign"
                      required
                    />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-medium">
                      Brand / Client *
                      <select
                        className={inputClass}
                        value={form.brandId}
                        onChange={(event) =>
                          updateField("brandId", event.target.value)
                        }
                        required
                      >
                        <option value="">Select a brand</option>

                        {brands.map((brand) => (
                          <option key={brand._id} value={brand._id}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block text-sm font-medium">
                      Category *
                      <select
                        className={inputClass}
                        value={form.category}
                        onChange={(event) =>
                          updateField("category", event.target.value)
                        }
                        required
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block text-sm font-medium">
                    Year
                    <input
                      type="number"
                      className={inputClass}
                      value={form.year}
                      onChange={(event) =>
                        updateField("year", event.target.value)
                      }
                    />
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
                      placeholder="Describe the creative work, campaign or project..."
                    />
                  </label>
                </div>
              </div>

              {/* COVER IMAGE */}
              <div className="border-t border-slate-100 pt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-bold">Cover image</h3>

                  <p className="mt-1 text-xs text-slate-400">
                    This is the main image displayed for the project.
                  </p>
                </div>

                <label className="block cursor-pointer">
                  <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-violet-300 hover:bg-violet-50/30">
                    {coverFile ? (
                      <div className="relative aspect-[16/8]">
                        <img
                          src={URL.createObjectURL(coverFile)}
                          alt="Selected cover"
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100">
                          <span className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                            Change image
                          </span>
                        </div>
                      </div>
                    ) : form.coverImageUrl ? (
                      <div className="relative aspect-[16/8]">
                        <img
                          src={form.coverImageUrl}
                          alt="Current cover"
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100">
                          <span className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                            Replace image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/8] flex-col items-center justify-center px-6 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-xl text-violet-600">
                          ↑
                        </span>

                        <p className="mt-4 text-sm font-semibold">
                          Upload cover image
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
                        setCoverFile(event.target.files?.[0] || null)
                      }
                      required={!form.id && !form.coverImageId}
                    />
                  </div>
                </label>

                {coverFile && (
                  <p className="mt-3 truncate text-xs text-violet-600">
                    Selected: {coverFile.name}
                  </p>
                )}
              </div>

              {/* GALLERY */}
              <div className="border-t border-slate-100 pt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-bold">Design gallery</h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Add, preview or remove additional designs belonging to this
                    project.
                  </p>
                </div>

                {/* EXISTING GALLERY */}
                {form.galleryImages.length > 0 && (
                  <div className="mb-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-700">
                        Existing images
                      </p>

                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400">
                        {form.galleryImages.length}{" "}
                        {form.galleryImages.length === 1 ? "image" : "images"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {form.galleryImages.map((image, index) => (
                        <div
                          key={image.id}
                          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                        >
                          <div className="aspect-square">
                            <img
                              src={image.url}
                              alt={`Gallery image ${index + 1}`}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </div>

                          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-3">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/70">
                              Image {index + 1}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeGalleryImage(image.id)}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-rose-600"
                            title="Remove image from gallery"
                            aria-label={`Remove gallery image ${index + 1}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 text-[11px] leading-5 text-slate-400">
                      Removing an image only removes it from this project. The
                      original asset remains in Sanity.
                    </p>
                  </div>
                )}

                {/* ADD IMAGES */}
                <label className="block cursor-pointer">
                  <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center transition hover:border-violet-300 hover:bg-violet-50/30">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      +
                    </span>

                    <p className="mt-3 text-sm font-semibold">
                      Add gallery images
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      You can select multiple images
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) =>
                        setGalleryFiles(Array.from(event.target.files || []))
                      }
                    />
                  </div>
                </label>

                {/* NEW IMAGES */}
                {galleryFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-600">
                        New images selected
                      </p>

                      <span className="text-[10px] text-slate-400">
                        {galleryFiles.length} selected
                      </span>
                    </div>

                    {galleryFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3"
                      >
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-slate-600">
                            {file.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {(file.size / (1024 * 1024)).toFixed(1)} MB
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeNewGalleryFile(index)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          title="Remove selected image"
                          aria-label={`Remove ${file.name}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FEATURED */}
              <div className="border-t border-slate-100 pt-7">
                <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-violet-100 bg-violet-50/50 p-4">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) =>
                      updateField("featured", event.target.checked)
                    }
                    className="mt-1 h-4 w-4 accent-violet-600"
                  />

                  <span>
                    <span className="block text-sm font-semibold">
                      Feature this project
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      Featured projects can appear in the homepage work section.
                    </span>
                  </span>
                </label>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-7">
                <button
                  type="submit"
                  disabled={saving || brands.length === 0}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploadProgress.active
                    ? `Uploading ${uploadProgress.completed} / ${uploadProgress.total}...`
                    : saving
                      ? "Saving project..."
                      : form.id
                        ? "Save changes"
                        : "Create project"}
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

          {/* PROJECT LIST */}
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                  Portfolio
                </p>

                <h2 className="mt-1 text-xl font-bold">Existing projects</h2>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                {projects.length} total
              </span>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="animate-pulse space-y-4">
                  <div className="h-48 rounded-2xl bg-slate-100" />
                  <div className="h-5 w-2/3 rounded bg-slate-100" />
                  <div className="h-4 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-600">
                  ✦
                </div>

                <h3 className="mt-5 font-bold">No projects yet</h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Create your first portfolio project using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {projects.map((project, index) => (
                  <article
                    key={project._id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_45px_-30px_rgba(30,20,80,0.3)] transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_25px_60px_-30px_rgba(90,50,180,0.3)]"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      {project.coverImageUrl ? (
                        <img
                          src={project.coverImageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 to-fuchsia-100">
                          <span className="text-5xl font-black text-violet-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                        <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                          LEEX / WORK
                        </span>

                        {project.featured && (
                          <span className="rounded-full border border-violet-300/30 bg-violet-600/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                            {project.category}
                          </p>

                          <h3 className="mt-2 text-lg font-bold leading-6 tracking-tight">
                            {project.title}
                          </h3>
                        </div>

                        {project.year && (
                          <span className="shrink-0 text-xs font-medium text-slate-400">
                            {project.year}
                          </span>
                        )}
                      </div>

                      {project.brand?.name && (
                        <div className="mt-4 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />

                          <span className="text-xs font-medium text-slate-500">
                            {project.brand.name}
                          </span>
                        </div>
                      )}

                      {project.description && (
                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                          {project.description}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => editProject(project)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteProject(project)}
                            className="rounded-lg border border-rose-100 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>

                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-300">
                          Project
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
