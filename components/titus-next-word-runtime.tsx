"use client";

import { useEffect } from "react";

const NEXT_WORD_HREF = "/lessons/h8085?from=/courses/proverbs-law-vocabulary";

function getDrawerPosition() {
  const drawer = document.querySelector<HTMLElement>(".course-word-packet__drawer");
  const text = drawer?.textContent ?? "";
  const match = text.match(/DRAWER\s+(\d+)\s+OF\s+(\d+)/i);

  if (!match) return null;

  const current = Number(match[1]);
  const total = Number(match[2]);

  if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) {
    return null;
  }

  return { current, total };
}

function syncNextWordCta() {
  const root = document.querySelector<HTMLElement>(".course-word-packet");
  const actions = document.querySelector<HTMLElement>(".course-word-packet__drawer-actions");
  const position = getDrawerPosition();

  if (!root || !actions || !position) return;

  const isFinalDrawer = position.current >= position.total;
  const existing = actions.querySelector<HTMLAnchorElement>(".course-word-packet__next-word-link");

  root.classList.toggle("course-word-packet--final-drawer", isFinalDrawer);

  if (!isFinalDrawer) {
    existing?.remove();
    return;
  }

  if (existing) return;

  const link = document.createElement("a");
  link.className = "course-word-packet__next-word-link";
  link.href = NEXT_WORD_HREF;
  link.textContent = "Go to H8085 · Hear / Obey";
  link.setAttribute("aria-label", "Go to the next word study, H8085 Hear Obey");

  actions.appendChild(link);
}

export function TitusNextWordRuntime() {
  useEffect(() => {
    const run = () => {
      window.requestAnimationFrame(syncNextWordCta);
    };

    run();

    const root = document.querySelector(".course-word-packet");
    const observer = root
      ? new MutationObserver(() => {
          run();
          window.setTimeout(run, 80);
        })
      : null;

    if (observer && root) {
      observer.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
    }

    document.addEventListener("click", run, true);
    window.addEventListener("resize", run);

    return () => {
      observer?.disconnect();
      document.removeEventListener("click", run, true);
      window.removeEventListener("resize", run);
    };
  }, []);

  return null;
}
