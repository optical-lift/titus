import { canonChains } from "@/data/titus/canon-chains";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import { queuedLessons } from "@/data/titus/queued-lessons";
import { traditionCards } from "@/data/titus/tradition-notes";
import type { PublicNodeMeta } from "@/data/titus/public-node-meta";

export type PublicNodeIssue = {
  severity: "error" | "warning";
  nodeType: string;
  nodeSlug: string;
  message: string;
};

type PublicNodeRecord = {
  nodeType: string;
  slug: string;
  status: string;
  meta: PublicNodeMeta;
};

function getPublicNodeRecords(): PublicNodeRecord[] {
  return [
    ...lessons.map((node) => ({
      nodeType: "Published Lesson",
      slug: node.slug,
      status: node.status,
      meta: node.publicNodeMeta,
    })),
    ...queuedLessons.map((node) => ({
      nodeType: "Queued Lesson",
      slug: node.slug,
      status: node.status,
      meta: node.publicNodeMeta,
    })),
    ...patternDebriefs.map((node) => ({
      nodeType: "Pattern Debrief",
      slug: node.slug,
      status: node.status,
      meta: node.publicNodeMeta,
    })),
    ...functionLenses.map((node) => ({
      nodeType: "Function Lens",
      slug: node.slug,
      status: node.status,
      meta: node.publicNodeMeta,
    })),
    ...canonChains.map((node) => ({
      nodeType: "Canon Chain",
      slug: node.slug,
      status: node.status,
      meta: node.publicNodeMeta,
    })),
    ...traditionCards.map((node) => ({
      nodeType: "Tradition Card",
      slug: node.slug,
      status: node.status,
      meta: node.publicNodeMeta,
    })),
  ];
}

export function getPublicNodeIssues(): PublicNodeIssue[] {
  const issues: PublicNodeIssue[] = [];

  for (const node of getPublicNodeRecords()) {
    if (node.meta.status !== node.status) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        message: `${node.nodeType} ${node.slug} has status "${node.status}" but public metadata status "${node.meta.status}".`,
      });
    }

    if (!node.meta.compiler.trim()) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        message: `${node.nodeType} ${node.slug} is missing a compiler.`,
      });
    }

    if (!node.meta.reviewer.trim()) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        message: `${node.nodeType} ${node.slug} is missing a reviewer.`,
      });
    }

    if (!node.meta.sourcePacket.trim()) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        message: `${node.nodeType} ${node.slug} is missing a source-packet title.`,
      });
    }

    if (!node.meta.sourcePacketSlug.trim()) {
      issues.push({
        severity: "error",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        message: `${node.nodeType} ${node.slug} is missing a source-packet slug.`,
      });
    }

    if (node.meta.knownLimits.length === 0) {
      issues.push({
        severity: "warning",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        message: `${node.nodeType} ${node.slug} has no known limits listed.`,
      });
    }

    if (node.meta.sourceList.length === 0) {
      issues.push({
        severity: "warning",
        nodeType: node.nodeType,
        nodeSlug: node.slug,
        message: `${node.nodeType} ${node.slug} has no source list entries.`,
      });
    }
  }

  return issues;
}

export function assertNoPublicNodeErrors() {
  const errors = getPublicNodeIssues().filter(
    (issue) => issue.severity === "error"
  );

  if (errors.length > 0) {
    throw new Error(
      `Titus public-node validation failed:\n${errors
        .map((issue) => `- ${issue.message}`)
        .join("\n")}`
    );
  }
}
