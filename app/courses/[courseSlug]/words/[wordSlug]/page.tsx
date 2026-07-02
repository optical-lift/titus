import { notFound } from "next/navigation";
import { LiveCourseWordLessonShellView } from "@/components/live-course-word-lesson-shell";
import { getLiveCourseWordPlacementShell } from "@/lib/noel/live-course-word-lesson";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CourseWordPlacementPage({
  params,
}: {
  params: Promise<{ courseSlug: string; wordSlug: string }>;
}) {
  const { courseSlug, wordSlug } = await params;
  const shell = await getLiveCourseWordPlacementShell(courseSlug, wordSlug);

  if (!shell) {
    notFound();
  }

  return <LiveCourseWordLessonShellView shell={shell} />;
}
