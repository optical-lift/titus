"use client";

import { useEffect } from "react";

const TOTAL_DRAWERS = 5;

function clampDrawer(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(TOTAL_DRAWERS, Math.max(1, value));
}

function readDrawerNumberFromPage() {
  const drawer = document.querySelector<HTMLElement>(".course-word-packet__drawer");
  const text = drawer?.textContent ?? "";
  const match = text.match(/DRAWER\s+(\d+)\s+OF\s+(\d+)/i);

  if (!match) return 1;

  return clampDrawer(Number(match[1]));
}

function setProgress(drawerNumber: number) {
  const current = clampDrawer(drawerNumber);
  const percent = Math.round((current / TOTAL_DRAWERS) * 100);

  document.documentElement.style.setProperty("--titus-drawer-progress", `${percent}%`);

  const progress = document.querySelector<HTMLElement>(".course-word-packet__top-progress");

  if (progress) {
    progress.dataset.drawerCurrent = String(current);
    progress.dataset.drawerTotal = String(TOTAL_DRAWERS);
    progress.setAttribute(
      "aria-label",
      `Lesson progress: drawer ${current} of ${TOTAL_DRAWERS}`,
    );
  }
}

export function TitusDrawerProgressRuntime() {
  useEffect(() => {
    let currentDrawer = readDrawerNumberFromPage();
    setProgress(currentDrawer);

    const syncFromRenderedDrawer = () => {
      currentDrawer = readDrawerNumberFromPage();
      setProgress(currentDrawer);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");

      if (!button) return;

      const actions = button.closest(".course-word-packet__drawer-actions");
      if (!actions) return;

      const label = (button.textContent ?? "").trim().toLowerCase();

      if (label.includes("continue") || label.includes("next")) {
        currentDrawer = clampDrawer(currentDrawer + 1);
        setProgress(currentDrawer);
        window.setTimeout(syncFromRenderedDrawer, 40);
        window.setTimeout(syncFromRenderedDrawer, 140);
        return;
      }

      if (label.includes("previous") || label.includes("back")) {
        currentDrawer = clampDrawer(currentDrawer - 1);
        setProgress(currentDrawer);
        window.setTimeout(syncFromRenderedDrawer, 40);
        window.setTimeout(syncFromRenderedDrawer, 140);
      }
    };

    const handlePopState = () => {
      window.setTimeout(syncFromRenderedDrawer, 40);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
