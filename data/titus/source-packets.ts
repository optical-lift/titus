export type SourcePacketStatus = "seed" | "draft" | "reviewed" | "retired";

export type SourcePacketKind =
  | "build_plan"
  | "research_packet"
  | "seed_set"
  | "source_map"
  | "review_packet";

export type SourcePacket = {
  slug: string;
  title: string;
  status: SourcePacketStatus;
  packetKind: SourcePacketKind;
  summary: string;
  owner: string;
  lastUpdated: string;
};

export const sourcePackets: SourcePacket[] = [
  {
    slug: "titus-tradition-card-seed-set-reusable-theological-reading-streams",
    title: "Titus Tradition Card seed set \u00b7 reusable theological reading streams",
    status: "seed",
    packetKind: "research_packet",
    summary: "Initial Titus source-packet registry record. This preserves the named research trail so public nodes can be validated before deeper source expansion.",
    owner: "Lex Bible Project",
    lastUpdated: "2026-06-30",
  },
  {
    slug: "titus-canon-chain-seed-set-ecology-h0776-domain-witness-chain",
    title: "Titus Canon Chain seed set \u00b7 Ecology / H0776 domain witness chain",
    status: "seed",
    packetKind: "research_packet",
    summary: "Initial Titus source-packet registry record. This preserves the named research trail so public nodes can be validated before deeper source expansion.",
    owner: "Lex Bible Project",
    lastUpdated: "2026-06-30",
  },
  {
    slug: "titus-pattern-debrief-seed-set-ecology-h0776-companion-patterns",
    title: "Titus Pattern Debrief seed set \u00b7 Ecology / H0776 companion patterns",
    status: "seed",
    packetKind: "research_packet",
    summary: "Initial Titus source-packet registry record. This preserves the named research trail so public nodes can be validated before deeper source expansion.",
    owner: "Lex Bible Project",
    lastUpdated: "2026-06-30",
  },
  {
    slug: "titus-canon-word-study-course-library-build-plan-appendix-a",
    title: "Titus Canon Word-Study Course Library Build Plan \u00b7 Appendix A",
    status: "seed",
    packetKind: "research_packet",
    summary: "Initial Titus source-packet registry record. This preserves the named research trail so public nodes can be validated before deeper source expansion.",
    owner: "Lex Bible Project",
    lastUpdated: "2026-06-30",
  },
  {
    slug: "titus-function-lens-seed-set-ecology-h0776-created-domain-lens",
    title: "Titus Function Lens seed set \u00b7 Ecology / H0776 created domain lens",
    status: "seed",
    packetKind: "research_packet",
    summary: "Initial Titus source-packet registry record. This preserves the named research trail so public nodes can be validated before deeper source expansion.",
    owner: "Lex Bible Project",
    lastUpdated: "2026-06-30",
  },
];

export function getSourcePacketByTitle(title: string) {
  return sourcePackets.find((packet) => packet.title === title);
}

export function getSourcePacket(slug: string) {
  return sourcePackets.find((packet) => packet.slug === slug);
}
