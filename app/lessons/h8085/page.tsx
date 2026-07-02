import { notFound } from "next/navigation";
import { LiveCourseWordLessonShellView } from "@/components/live-course-word-lesson-shell";
import { getLiveCourseWordLessonShell } from "@/lib/noel/live-course-word-lesson";

export default async function H8085LessonPage() {
  const shell = await getLiveCourseWordLessonShell("h8085");

  if (!shell) {
    notFound();
  }

  return <LiveCourseWordLessonShellView shell={shell} />;
}
