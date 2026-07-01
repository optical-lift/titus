import { canonChains } from "@/data/titus/canon-chains";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import { queuedLessons } from "@/data/titus/queued-lessons";
import type { SourcePacket } from "@/data/titus/source-packets";
import { traditionCards } from "@/data/titus/tradition-notes";

export type SourcePacketUsage = {
  nodeType: string;
  slug: string;
  title: string;
  href: string;
  status: string;
};

export function getSourcePacketUsage(packet: SourcePacket): SourcePacketUsage[] {
  return [
    ...lessons
      .filter((node) => node.publicNodeMeta.sourcePacketSlug === packet.slug)
      .map((node) => ({
        nodeType: "Published Lesson",
        slug: node.slug,
        title: node.title,
        href: `/lessons/${node.slug}`,
        status: node.status,
      })),
    ...queuedLessons
      .filter((node) => node.publicNodeMeta.sourcePacketSlug === packet.slug)
      .map((node) => ({
        nodeType: "Queued Lesson",
        slug: node.slug,
        title: node.title,
        href: `/lessons/${node.slug}`,
        status: node.status,
      })),
    ...patternDebriefs
      .filter((node) => node.publicNodeMeta.sourcePacketSlug === packet.slug)
      .map((node) => ({
        nodeType: "Pattern Debrief",
        slug: node.slug,
        title: node.title,
        href: `/patterns/${node.slug}`,
        status: node.status,
      })),
    ...functionLenses
      .filter((node) => node.publicNodeMeta.sourcePacketSlug === packet.slug)
      .map((node) => ({
        nodeType: "Function Lens",
        slug: node.slug,
        title: node.title,
        href: `/lenses/${node.slug}`,
        status: node.status,
      })),
    ...canonChains
      .filter((node) => node.publicNodeMeta.sourcePacketSlug === packet.slug)
      .map((node) => ({
        nodeType: "Canon Chain",
        slug: node.slug,
        title: node.title,
        href: `/chains/${node.slug}`,
        status: node.status,
      })),
    ...traditionCards
      .filter((node) => node.publicNodeMeta.sourcePacketSlug === packet.slug)
      .map((node) => ({
        nodeType: "Tradition Card",
        slug: node.slug,
        title: node.title,
        href: `/traditions/${node.slug}`,
        status: node.status,
      })),
  ];
}
