export type CourseAssemblyNodeType =
  | "published_lesson"
  | "queued_lesson"
  | "canon_chain"
  | "function_lens"
  | "pattern_debrief"
  | "tradition_card";

export type CourseAssemblySection =
  | "course_path"
  | "supporting_nodes"
  | "traditions_in_conversation"
  | "queued_lessons";

export type CourseAssemblyNode = {
  courseSlug: string;
  section: CourseAssemblySection;
  type: CourseAssemblyNodeType;
  nodeSlug: string;
  label: string;
  summary: string;
  sortOrder: number;
};

export const courseAssemblies: CourseAssemblyNode[] = [
  {
    courseSlug: "ecology",
    section: "course_path",
    type: "published_lesson",
    nodeSlug: "h0776",
    label: "H0776 — אֶרֶץ / erets",
    summary: "Land / Earth / Domain",
    sortOrder: 10,
  },
  {
    courseSlug: "ecology",
    section: "queued_lessons",
    type: "queued_lesson",
    nodeSlug: "h0127",
    label: "H0127 — אֲדָמָה / adamah",
    summary: "Ground, soil; queued Ecology word lesson.",
    sortOrder: 20,
  },
  {
    courseSlug: "ecology",
    section: "queued_lessons",
    type: "queued_lesson",
    nodeSlug: "h4325",
    label: "H4325 — מַיִם / mayim",
    summary: "Water; queued Ecology word lesson.",
    sortOrder: 30,
  },
  {
    courseSlug: "ecology",
    section: "queued_lessons",
    type: "queued_lesson",
    nodeSlug: "h7704",
    label: "H7704 — שָׂדֶה / sadeh",
    summary: "Field; queued Ecology word lesson.",
    sortOrder: 40,
  },
  {
    courseSlug: "ecology",
    section: "supporting_nodes",
    type: "canon_chain",
    nodeSlug: "erets-domain-witness-chain",
    label: "Domain Witness Chain",
    summary: "Canon chain for land, earth, ground, bloodguilt, rest, and dwellability.",
    sortOrder: 50,
  },
  {
    courseSlug: "ecology",
    section: "supporting_nodes",
    type: "function_lens",
    nodeSlug: "created-domain-made-readable",
    label: "Created Domain Made Readable",
    summary: "Function lens for created domain, witness, condition, and dwellability.",
    sortOrder: 60,
  },
  {
    courseSlug: "ecology",
    section: "supporting_nodes",
    type: "pattern_debrief",
    nodeSlug: "bloodguilt",
    label: "Bloodguilt",
    summary: "Pattern debrief active in the land field.",
    sortOrder: 70,
  },
  {
    courseSlug: "ecology",
    section: "traditions_in_conversation",
    type: "tradition_card",
    nodeSlug: "creation-theology",
    label: "Creation Theology",
    summary: "Reusable tradition card attached to H0776 through a lesson placement.",
    sortOrder: 80,
  },
  {
    courseSlug: "ecology",
    section: "traditions_in_conversation",
    type: "tradition_card",
    nodeSlug: "covenantal-biblical-theology",
    label: "Covenantal Biblical Theology",
    summary: "Reusable tradition card attached to H0776 through a lesson placement.",
    sortOrder: 90,
  },
  {
    courseSlug: "ecology",
    section: "traditions_in_conversation",
    type: "tradition_card",
    nodeSlug: "dispensationalism",
    label: "Dispensationalism",
    summary: "Reusable tradition card attached to H0776 through a lesson placement.",
    sortOrder: 100,
  },
];

export function getCourseAssembly(courseSlug: string) {
  return courseAssemblies
    .filter((node) => node.courseSlug === courseSlug)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCourseAssemblyBySection(
  courseSlug: string,
  section: CourseAssemblySection
) {
  return getCourseAssembly(courseSlug).filter((node) => node.section === section);
}
