import { getCourse } from "@/data/titus/courses";
import {
  type CoursePacketPreviewTerm,
  getCoursePacketPreview,
} from "@/data/titus/course-packet-previews";
import { getLexStamp, type LexStamp } from "@/data/titus/lex-stamps";

export type CoursePacketField = "hebrewField" | "greekWitness";

export type CourseWordLessonShellConfig = {
  lessonSlug: string;
  courseSlug: string;
  lessonNumber: number;
  lessonKind: string;
  methodLabel: string;
  packetField: CoursePacketField;
  strongId: string;
  positionNote: string;
};

export type CourseWordLessonShell = {
  lessonSlug: string;
  course: {
    slug: string;
    title: string;
    subtitle: string;
  };
  lessonNumber: number;
  lessonKind: string;
  methodLabel: string;
  languageLabel: string;
  term: CoursePacketPreviewTerm;
  termsInView: CoursePacketPreviewTerm[];
  positionNote: string;
  lexStamp: LexStamp;
};

export const courseWordLessonShells: CourseWordLessonShellConfig[] = [
  {
    lessonSlug: "h8451",
    courseSlug: "proverbs-law-vocabulary",
    lessonNumber: 1,
    lessonKind: "Word Field",
    methodLabel: "Read",
    packetField: "hebrewField",
    strongId: "H8451",
    positionNote:
      "This lesson begins the word field for Proverbs as Law Vocabulary by identifying the starting term before the canon chain is followed.",
  },
];

export function getCourseWordLessonShell(
  lessonSlug: string,
): CourseWordLessonShell | undefined {
  const config = courseWordLessonShells.find(
    (lesson) => lesson.lessonSlug === lessonSlug,
  );

  if (!config) {
    return undefined;
  }

  const course = getCourse(config.courseSlug);
  const packetPreview = getCoursePacketPreview(config.courseSlug);
  const lexStamp = getLexStamp(config.strongId);

  if (!course || !packetPreview || !lexStamp) {
    return undefined;
  }

  const termsInView = packetPreview[config.packetField];
  const term = termsInView.find(
    (candidate) =>
      candidate.strongId.toLowerCase() === config.strongId.toLowerCase(),
  );

  if (!term) {
    return undefined;
  }

  return {
    lessonSlug: config.lessonSlug,
    course: {
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
    },
    lessonNumber: config.lessonNumber,
    lessonKind: config.lessonKind,
    methodLabel: config.methodLabel,
    languageLabel:
      config.packetField === "hebrewField" ? "Hebrew Field" : "Greek Witness",
    term,
    termsInView,
    positionNote: config.positionNote,
    lexStamp,
  };
}
