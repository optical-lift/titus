"use client";

import { useEffect } from "react";

function readDrawerPosition(drawer: HTMLElement) {
  const text = drawer.textContent ?? "";
  const match = text.match(/DRAWER\s+(\d+)\s+OF\s+(\d+)/i);

  if (!match) return null;

  const current = Number(match[1]);
  const total = Number(match[2]);

  if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) {
    return null;
  }

  return { current, total };
}

function isVisibleDrawer(drawer: HTMLElement) {
  const style = window.getComputedStyle(drawer);
  const rect = drawer.getBoundingClientRect();

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function getActiveDrawer() {
  const drawers = Array.from(
    document.querySelectorAll<HTMLElement>(".course-word-packet__drawer"),
  );

  const visibleDrawers = drawers.filter(isVisibleDrawer);

  if (visibleDrawers.length === 0) {
    return drawers[drawers.length - 1] ?? null;
  }

  // Prefer the visible drawer currently nearest the top of the lesson viewport.
  return visibleDrawers
    .map((drawer) => ({
      drawer,
      distance: Math.abs(drawer.getBoundingClientRect().top),
    }))
    .sort((a, b) => a.distance - b.distance)[0]?.drawer ?? visibleDrawers[0];
}

function updateTitusDrawerProgress() {
  const progressFill = document.querySelector<HTMLElement>(
    ".course-word-packet__top-progress > span > span",
  );
  const progressWrap = document.querySelector<HTMLElement>(
    ".course-word-packet__top-progress",
  );

  if (!progressFill) return;

  const activeDrawer = getActiveDrawer();
  if (!activeDrawer) return;

  const position = readDrawerPosition(activeDrawer);
  if (!position) return;

  const percent = Math.min(
    100,
    Math.max(0, Math.round((position.current / position.total) * 100)),
  );

  progressFill.style.width = `${percent}%`;

  if (progressWrap) {
    progressWrap.setAttribute(
      "aria-label",
      `Lesson progress: drawer ${position.current} of ${position.total}`,
    );
    progressWrap.dataset.drawerCurrent = String(position.current);
    progressWrap.dataset.drawerTotal = String(position.total);
  }
}

export function TitusDrawerProgressRuntime() {
  useEffect(() => {
    const run = () => {
      requestAnimationFrame(() => {
        updateTitusDrawerProgress();
      });
    };

    run();

    const root = document.querySelector(".course-word-packet");
    if (!root) return;

    const observer = new MutationObserver(run);

    observer.observe(root, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden"],
    });

    document.addEventListener("click", run, true);
    document.addEventListener("keyup", run, true);
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", run, true);
      document.removeEventListener("keyup", run, true);
      window.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
    };
  }, []);

  return null;
}
