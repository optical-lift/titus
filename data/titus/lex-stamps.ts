export type LexStampLineageItem = {
  strongId: string;
  transliteration: string;
};

export type LexStamp = {
  strongId: string;
  identitySource: string;
  kjvLexicalSource: string;
  currentObject: {
    strongId: string;
    transliteration: string;
  };
  objectIdentityEnglishPrimary: string;
  objectIdentityEnglishSecondary?: string;
  inheritedKjvLexical: string;
  lxxMoment: {
    resolved: boolean;
    greekStrongId?: string;
    transliteration?: string;
    english?: string;
  };
  anchor: {
    book: string;
    chapter: number;
    verse: number;
  };
  lineage: LexStampLineageItem[];
};

export const lexStamps: LexStamp[] = [
  {
    strongId: "H8451",
    identitySource: "intelligence.v_object_baseline_lexicon",
    kjvLexicalSource: "kjv_usage_compacted",
    currentObject: {
      strongId: "H8451",
      transliteration: "torah",
    },
    objectIdentityEnglishPrimary: "law",
    objectIdentityEnglishSecondary: "instruction",
    inheritedKjvLexical: "law",
    lxxMoment: {
      resolved: true,
      greekStrongId: "G3551",
      transliteration: "nomos",
      english: "law",
    },
    anchor: {
      book: "Pro",
      chapter: 1,
      verse: 8,
    },
    lineage: [
      {
        strongId: "H3384",
        transliteration: "yarah",
      },
    ],
  },
];

export function getLexStamp(strongId: string) {
  return lexStamps.find(
    (stamp) => stamp.strongId.toLowerCase() === strongId.toLowerCase(),
  );
}
