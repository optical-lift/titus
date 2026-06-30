export type LessonAttachmentType =
  | "canon_chain"
  | "pattern_debrief"
  | "function_lens"
  | "tradition_placement";

export type LessonDrawerCode =
  | "canon"
  | "companions"
  | "function"
  | "traditions";

export type LessonAssemblyAttachment = {
  lessonSlug: string;
  courseSlug: string;
  drawerCode: LessonDrawerCode;
  type: LessonAttachmentType;
  nodeSlug: string;
  label: string;
  sortOrder: number;
};

export const lessonAssemblies: LessonAssemblyAttachment[] = [
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "canon",
    type: "canon_chain",
    nodeSlug: "erets-domain-witness-chain",
    label: "Domain Witness Chain",
    sortOrder: 10,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "companions",
    type: "pattern_debrief",
    nodeSlug: "bloodguilt",
    label: "Bloodguilt",
    sortOrder: 10,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "companions",
    type: "pattern_debrief",
    nodeSlug: "inheritance",
    label: "Inheritance",
    sortOrder: 20,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "companions",
    type: "pattern_debrief",
    nodeSlug: "rest-release",
    label: "Rest / Release",
    sortOrder: 30,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "companions",
    type: "pattern_debrief",
    nodeSlug: "fruitfulness",
    label: "Fruitfulness",
    sortOrder: 40,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "function",
    type: "function_lens",
    nodeSlug: "created-domain-made-readable",
    label: "Created Domain Made Readable",
    sortOrder: 10,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "traditions",
    type: "tradition_placement",
    nodeSlug: "h0776-ecology-creation-theology",
    label: "Creation Theology beside H0776",
    sortOrder: 10,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "traditions",
    type: "tradition_placement",
    nodeSlug: "h0776-ecology-covenantal-biblical-theology",
    label: "Covenantal Biblical Theology beside H0776",
    sortOrder: 20,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "traditions",
    type: "tradition_placement",
    nodeSlug: "h0776-ecology-dispensationalism",
    label: "Dispensationalism beside H0776",
    sortOrder: 30,
  },
  {
    lessonSlug: "h0776",
    courseSlug: "ecology",
    drawerCode: "traditions",
    type: "tradition_placement",
    nodeSlug: "h0776-ecology-new-creation-restoration",
    label: "New Creation Restoration beside H0776",
    sortOrder: 40,
  },
];

export function getLessonAssembly(lessonSlug: string) {
  return lessonAssemblies
    .filter((attachment) => attachment.lessonSlug === lessonSlug)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getLessonAttachmentsByDrawer(
  lessonSlug: string,
  drawerCode: LessonDrawerCode
) {
  return getLessonAssembly(lessonSlug).filter(
    (attachment) => attachment.drawerCode === drawerCode
  );
}
