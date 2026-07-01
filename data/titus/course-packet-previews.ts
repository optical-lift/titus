export type CoursePacketPreviewTerm = {
  strongId: string;
  transliteration: string;
  surface: string;
  gloss: string;
};

export type CoursePacketPreview = {
  courseSlug: string;
  note: string;
  hebrewField: CoursePacketPreviewTerm[];
  greekWitness: CoursePacketPreviewTerm[];
};

export const coursePacketPreviews: CoursePacketPreview[] = [
  {
    courseSlug: "proverbs-law-vocabulary",
    note:
      "Preview terms are shown as packet anchors, not as final lesson claims.",
    hebrewField: [
      {
        strongId: "H8451",
        transliteration: "torah",
        surface: "תּוֹרָה",
        gloss: "law / instruction",
      },
      {
        strongId: "H8085",
        transliteration: "shama",
        surface: "שָׁמַע",
        gloss: "hear",
      },
      {
        strongId: "H4687",
        transliteration: "mitsvah",
        surface: "מִצְוָה",
        gloss: "commandment",
      },
      {
        strongId: "H3820",
        transliteration: "lev",
        surface: "לֵב",
        gloss: "heart",
      },
      {
        strongId: "H6310",
        transliteration: "peh",
        surface: "פֶּה",
        gloss: "mouth",
      },
      {
        strongId: "H1870",
        transliteration: "derek",
        surface: "דֶּרֶךְ",
        gloss: "way / path",
      },
    ],
    greekWitness: [
      {
        strongId: "G3551",
        transliteration: "nomos",
        surface: "νόμος",
        gloss: "law",
      },
      {
        strongId: "G191",
        transliteration: "akouō",
        surface: "ἀκούω",
        gloss: "hear",
      },
      {
        strongId: "G1785",
        transliteration: "entolē",
        surface: "ἐντολή",
        gloss: "commandment",
      },
      {
        strongId: "G2588",
        transliteration: "kardia",
        surface: "καρδία",
        gloss: "heart",
      },
      {
        strongId: "G4750",
        transliteration: "stoma",
        surface: "στόμα",
        gloss: "mouth",
      },
      {
        strongId: "G3598",
        transliteration: "hodos",
        surface: "ὁδός",
        gloss: "way / path",
      },
    ],
  },
];

export function getCoursePacketPreview(courseSlug: string) {
  return coursePacketPreviews.find((preview) => preview.courseSlug === courseSlug);
}
