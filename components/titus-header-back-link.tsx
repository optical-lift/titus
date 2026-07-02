"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TitusHeaderBackLink() {
  const pathname = usePathname() ?? "";
  const [lessonBackHref, setLessonBackHref] = useState("/courses/proverbs-law-vocabulary");

  useEffect(() => {
    if (!pathname.startsWith("/lessons/")) return;

    const from = new URLSearchParams(window.location.search).get("from");

    if (from && from.startsWith("/")) {
      setLessonBackHref(from);
    }
  }, [pathname]);

  if (pathname.startsWith("/courses/")) {
    return (
      <Link
        className="titus-site-header__back"
        href="/"
        aria-label="Return to course catalogue"
        title="Course catalogue"
      >
        ←
      </Link>
    );
  }

  if (pathname.startsWith("/lessons/")) {
    return (
      <Link
        className="titus-site-header__back"
        href={lessonBackHref}
        aria-label="Return to current course"
        title="Current course"
      >
        ←
      </Link>
    );
  }

  return null;
}
