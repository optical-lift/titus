import { notFound } from "next/navigation";
import { LiveCourseWordLessonShellView } from "@/components/live-course-word-lesson-shell";
import { getLiveCourseWordLessonShell } from "@/lib/noel/live-course-word-lesson";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function H8451LessonPage() {
  const shell = await getLiveCourseWordLessonShell("h8451");

  if (!shell) {
    notFound();
  }

  return <LiveCourseWordLessonShellView shell={shell} />;
}
