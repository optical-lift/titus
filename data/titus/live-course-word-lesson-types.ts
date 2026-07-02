import type { LexStamp } from "@/data/titus/lex-stamps";
import type { CoursePacketPreviewTerm } from "@/data/titus/course-packet-previews";

export type LiveCourseWordLessonStatement = {
  label?: string;
  title: string;
  references?: string;
  lines: string[];
};

export type LiveCourseWordLessonDrawerBody = {
  summary?: string;
  statements?: LiveCourseWordLessonStatement[];
};

export type LiveCourseWordLessonDrawer = {
  drawerCode: string;
  heading: string;
  body: LiveCourseWordLessonDrawerBody;
  status?: string;
  sortOrder?: number;
};

export type LiveCourseWordCanonPassage = {
  ref: string;
  book?: string;
  chapter?: number;
  startVerse?: number;
  endVerse?: number;
  passageRole?: string;
  notice?: string;
  text?: string | null;
  sortOrder?: number;
};

export type LiveCourseWordRelationship = {
  relationshipType?: string;
  targetLabel?: string;
  targetSlug?: string | null;
  targetStrongId?: string | null;
  sourceTable?: string | null;
  sourceRef?: string | null;
  functionNote?: string | null;
  status?: string;
  sortOrder?: number;
};

export type LiveCourseWordMirror = {
  greekId?: string;
  weight?: number | null;
  transliteration?: string | null;
  lemma?: string | null;
  baselineGloss?: string | null;
};

export type LiveCourseWordLineageItem = {
  directionKind?: string | null;
  relationBucket?: string | null;
  relatedObjectId?: string | null;
  relatedTransliteration?: string | null;
  relatedLemma?: string | null;
};

export type LiveCourseWordLessonShell = {
  lessonSlug: string;
  course: {
    slug: string;
    title: string;
    subtitle: string;
  };
  lessonNumber: number;
  courseLessonTotal: number;
  lessonKind: string;
  methodLabel: string;
  languageLabel: string;
  wordDisplayTitle: string;
  term: CoursePacketPreviewTerm;
  termsInView: CoursePacketPreviewTerm[];
  positionNote: string;
  functionReading: string;
  publicSummary: string;
  status: string;
  confidence: string;
  knownLimits: string[];
  lexStamp: LexStamp;
  drawers: LiveCourseWordLessonDrawer[];
  canonPassages: LiveCourseWordCanonPassage[];
  relationships: LiveCourseWordRelationship[];
  mirrors: LiveCourseWordMirror[];
  lineage: LiveCourseWordLineageItem[];
  occurrenceCount?: number | null;
  baseline: {
    source: string;
    gloss: string;
    definitionText?: string;
    kjvUsage?: string;
  };
  nextWordStudyHref?: string;
  nextWordStudyLabel?: string;
};
