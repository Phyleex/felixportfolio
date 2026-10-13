"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const gradients = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-fuchsia-600 via-pink-600 to-rose-600",
  "from-cyan-500 via-blue-600 to-violet-700",
];

export default function ProjectGallery({ images, projectTitle }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });
  const pointerStart = useRef(null);

  const isOpen = activeIndex !== null;
  const activeImage = isOpen ? images[activeIndex] : null;

  const resetView = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setDragging(false);
  }, []);

  const closeViewer = useCallback(() => {
    setActiveIndex(null);
    resetView();
  }, [resetView]);

  const showImage = useCallback(
    (index) => {
      setActiveIndex((index + images.length) % images.length);
      resetView();
    },
    [images.length, resetView],
  );

  const changeZoom = useCallback((amount) => {
    setZoom((current) => {
      const next = Math.min(4, Math.max(1, current + amount));

      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }

      return next;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowRight") showImage(activeIndex + 1);
      if (event.key === "ArrowLeft") showImage(activeIndex - 1);

      if (event.key === "+" || event.key === "=") changeZoom(0.5);
      if (event.key === "-") changeZoom(-0.5);
      if (event.key === "0") resetView();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, closeViewer, showImage, changeZoom, resetView]);

  function handlePointerDown(event) {
    if (zoom <= 1) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStart.current = event.pointerId;
    dragStart.current = { x: event.clientX, y: event.clientY };
    positionStart.current = { ...position };
    setDragging(true);
  }

  function handlePointerMove(event) {
    if (!dragging || pointerStart.current !== event.pointerId) return;

    setPosition({
      x: positionStart.current.x + event.clientX - dragStart.current.x,
      y: positionStart.current.y + event.clientY - dragStart.current.y,
    });
  }

  function handlePointerUp(event) {
    if (pointerStart.current !== event.pointerId) return;

    pointerStart.current = null;
    setDragging(false);
  }

  if (!images?.length) return null;

  return (
    <>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {images.map((image, index) => {
          const isFeatured = index % 3 === 0;

          return (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                resetView();
              }}
              aria-label={`View ${projectTitle} image ${index + 1} fullscreen`}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${
                gradients[index % gradients.length]
              } p-2.5 text-left sm:rounded-3xl sm:p-3 ${
                isFeatured ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-xl bg-slate-900 sm:rounded-2xl ${
                  isFeatured ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${projectTitle} design ${index + 1}`}
                  fill
                  unoptimized
                  sizes={
                    isFeatured
                      ? "(max-width: 768px) 100vw, 100vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/40 text-xl text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                    ⤢
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {isOpen && activeImage && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} image viewer`}
          onClick={closeViewer}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{projectTitle}</p>
              <p className="mt-1 text-xs text-slate-400">
                Image {activeIndex + 1} of {images.length}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => changeZoom(-0.5)}
                disabled={zoom <= 1}
                aria-label="Zoom out"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-xl transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>

              <span className="hidden min-w-14 text-center text-xs text-slate-300 sm:block">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={() => changeZoom(0.5)}
                disabled={zoom >= 4}
                aria-label="Zoom in"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-xl transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>

              <button
                type="button"
                onClick={resetView}
                className="hidden rounded-lg border border-white/15 px-3 py-2 text-xs transition hover:bg-white/10 sm:block"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={closeViewer}
                aria-label="Close fullscreen viewer"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-2xl transition hover:bg-white/20"
              >
                ×
              </button>
            </div>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-14 py-5 sm:px-20"
            onClick={(event) => event.stopPropagation()}
            onWheel={(event) => {
              if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                changeZoom(event.deltaY < 0 ? 0.25 : -0.25);
              }
            }}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => showImage(activeIndex - 1)}
                aria-label="Previous image"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl transition hover:bg-white/15 sm:left-5 sm:h-12 sm:w-12"
              >
                ‹
              </button>
            )}

            <div
              className="relative flex h-full w-full items-center justify-center"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onDoubleClick={() => {
                if (zoom > 1) {
                  resetView();
                } else {
                  setZoom(2);
                }
              }}
              style={{
                cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in",
                touchAction: zoom > 1 ? "none" : "pan-y",
              }}
            >
              <img
                src={activeImage.url}
                alt={
                  activeImage.alt || `${projectTitle} design ${activeIndex + 1}`
                }
                draggable={false}
                className="max-h-full max-w-full select-none object-contain"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transition: dragging ? "none" : "transform 150ms ease-out",
                }}
              />
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={() => showImage(activeIndex + 1)}
                aria-label="Next image"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl transition hover:bg-white/15 sm:right-5 sm:h-12 sm:w-12"
              >
                ›
              </button>
            )}
          </div>

          <div className="shrink-0 border-t border-white/10 px-4 py-3 text-center text-xs text-slate-400">
            Use + / − to zoom · Drag to explore · Double-click to zoom · Esc to
            close
          </div>
        </div>
      )}
    </>
  );
}
