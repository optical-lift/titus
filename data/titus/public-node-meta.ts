export type PublicNodeMeta = {
  compiler: string;
  reviewer: string;
  sourcePacket: string;
  status: "queued" | "debrief_only" | "beta" | "published" | "reviewed" | "revised" | "retired";
  version: string;
  lastUpdated: string;
  confidence: "low" | "medium" | "high";
  knownLimits: string[];
  sourceList: string[];
};
