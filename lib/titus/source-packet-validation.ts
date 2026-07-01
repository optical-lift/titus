import { canonChains } from "@/data/titus/canon-chains";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import { queuedLessons } from "@/data/titus/queued-lessons";
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
  sourcePacketSlug: string;
};

function getPublicNodesWithSourcePackets(): PublicNodeWithMeta[] {
  return [
    ...lessons.map((node) => ({
      nodeType: "Published Lesson",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
      sourcePacketSlug: node.publicNodeMeta.sourcePacketSlug,
    })),
    ...queuedLessons.map((node) => ({
      nodeType: "Queued Lesson",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
      sourcePacketSlug: node.publicNodeMeta.sourcePacketSlug,
    })),
    ...patternDebriefs.map((node) => ({
      nodeType: "Pattern Debrief",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
      sourcePacketSlug: node.publicNodeMeta.sourcePacketSlug,
    })),
    ...functionLenses.map((node) => ({
      nodeType: "Function Lens",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
      sourcePacketSlug: node.publicNodeMeta.sourcePacketSlug,
    })),
    ...canonChains.map((node) => ({
      nodeType: "Canon Chain",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
      sourcePacketSlug: node.publicNodeMeta.sourcePacketSlug,
    })),
    ...traditionCards.map((node) => ({
      nodeType: "Tradition Card",
      slug: node.slug,
      sourcePacket: node.publicNodeMeta.sourcePacket,
      sourcePacketSlug: node.publicNodeMeta.sourcePacketSlug,
    })),
  ];
}

function duplicatedValues(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

export function getSourcePacketIssues(): SourcePacketIssue[] {
  const issues: SourcePacketIssue[] = [];
  const publicNodes = getPublicNodesWithSourcePackets();

  const packetTitles = sourcePackets.map((packet) => packet.title);
  const packetSlugs = sourcePackets.map((packet) => packet.slug);

  for (const duplicateTitle of duplicatedValues(packetTitles)) {
    issues.push({
      severity: "error",
      nodeType: "Source Packet",
      nodeSlug: duplicateTitle,
      sourcePacket: duplicateTitle,
      message: `Duplicate source-packet title found: ${duplicateTitle}`,
    });
  }

  for (const duplicateSlug of duplicatedValues(packetSlugs)) {
    issues.push({
      severity: "error",
      nodeType: "Source Packet",
      nodeSlug: duplicateSlug,
      sourcePacket: duplicateSlug,
      message: `Duplicate source-packet slug found: ${duplicateSlug}`,
    });
  }

  for (const node of publicNodes) {
    const packet = sourcePackets.find(
      (candidate) => candidate.slug === node.sourcePacketSlug
    );

    if (!packet) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        sourcePacket: node.sourcePacketSlug,
        message: `${node.nodeType} ${node.slug} points to an unregistered source-packet slug: ${node.sourcePacketSlug}`,
      });
      continue;
    }

    if (packet.title !== node.sourcePacket) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        sourcePacket: node.sourcePacket,
        message: `${node.nodeType} ${node.slug} has source-packet title/slug mismatch. Title says "${node.sourcePacket}", but slug resolves to "${packet.title}".`,
      });
    }
  }

  for (const packet of sourcePackets) {
    const isUsed = publicNodes.some(
      (node) => node.sourcePacketSlug === packet.slug
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
