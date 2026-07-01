import { canonChains } from "@/data/titus/canon-chains";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import { sourcePackets } from "@/data/titus/source-packets";
import { traditionCards } from "@/data/titus/tradition-notes";

export type SourcePacketIssue = {
  severity: "error" | "warning";
  nodeType: string;
  nodeSlug: string;
  sourcePacket: string;
  message: string;
};

type PublicNodeWithMeta = {
  nodeType: string;
  slug: string;
  sourcePacket: string;
};

function getPublicNodesWithSourcePackets(): PublicNodeWithMeta[] {
  return [
    ...lessons.map((node) => ({
      nodeType: "Published Lesson",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
    })),
    ...patternDebriefs.map((node) => ({
      nodeType: "Pattern Debrief",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
    })),
    ...functionLenses.map((node) => ({
      nodeType: "Function Lens",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
    })),
    ...canonChains.map((node) => ({
      nodeType: "Canon Chain",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
    })),
    ...traditionCards.map((node) => ({
      nodeType: "Tradition Card",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
    })),
  ];
}

export function getSourcePacketIssues(): SourcePacketIssue[] {
  const issues: SourcePacketIssue[] = [];
  const publicNodes = getPublicNodesWithSourcePackets();
  const packetTitles = sourcePackets.map((packet) => packet.title);
  const duplicatePacketTitles = packetTitles.filter(
    (title, index) => packetTitles.indexOf(title) !== index
  );

  for (const duplicateTitle of duplicatePacketTitles) {
    issues.push({
      severity: "error",
      nodeType: "Source Packet",
      nodeSlug: duplicateTitle,
      sourcePacket: duplicateTitle,
      message: `Duplicate source-packet title found: ${duplicateTitle}`,
    });
  }

  for (const node of publicNodes) {
    if (!packetTitles.includes(node.sourcePacket)) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        sourcePacket: node.sourcePacket,
        message: `${node.nodeType} ${node.slug} points to an unregistered source packet: ${node.sourcePacket}`,
      });
    }
  }

  for (const packet of sourcePackets) {
    const isUsed = publicNodes.some(
      (node) => node.sourcePacket === packet.title
    );

    if (!isUsed) {
      issues.push({
        severity: "warning",
        nodeType: "Source Packet",
        nodeSlug: packet.slug,
        sourcePacket: packet.title,
        message: `Source packet is registered but not currently used by a public node: ${packet.title}`,
      });
    }
  }

  return issues;
}

export function assertNoSourcePacketErrors() {
  const errors = getSourcePacketIssues().filter(
    (issue) => issue.severity === "error"
  );

  if (errors.length > 0) {
    throw new Error(
      `Titus source-packet validation failed:\n${errors
        .map((issue) => `- ${issue.message}`)
        .join("\n")}`
    );
  }
}
