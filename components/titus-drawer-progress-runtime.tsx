"use client";

import { useEffect } from "react";

function updateTitusDrawerProgress() {
  const progressFill = document.querySelector<HTMLElement>(
    ".course-word-packet__top-progress > span > span",
  );
  const progressWrap = document.querySelector<HTMLElement>(
    ".course-word-packet__top-progress",
  );
  const drawer = document.querySelector<HTMLElement>(".course-word-packet__drawer");

  if (!progressFill || !drawer) return;

  const text = drawer.textContent ?? "";
  const match = text.match(/DRAWER\s+(\d+)\s+OF\s+(\d+)/i);

  if (!match) return;

  const current = Number(match[1]);
  const total = Number(match[2]);

  if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) return;

  const percent = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  progressFill.style.width = `${percent}%`;

  if (progressWrap) {
    progressWrap.setAttribute(
      "aria-label",
      `Lesson progress: drawer ${current} of ${total}`,
    );
  }
}

export function TitusDrawerProgressRuntime() {
  useEffect(() => {
    updateTitusDrawerProgress();

    const root = document.querySelector(".course-word-packet");
    if (!root) return;

    const observer = new MutationObserver(() => {
      updateTitusDrawerProgress();
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const onClick = () => {
      window.setTimeout(updateTitusDrawerProgress, 0);
      window.setTimeout(updateTitusDrawerProgress, 80);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
