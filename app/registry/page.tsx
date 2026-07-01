import Link from "next/link";
import { canonChains } from "@/data/titus/canon-chains";
import { courseAssemblies } from "@/data/titus/course-assemblies";
import { sourcePackets } from "@/data/titus/source-packets";
import { assertNoAssemblyErrors, getAssemblyIssues } from "@/lib/titus/assembly-validation";
import { assertNoCourseAssemblyErrors, getCourseAssemblyIssues } from "@/lib/titus/course-assembly-validation";
import { assertNoSourcePacketErrors, getSourcePacketIssues } from "@/lib/titus/source-packet-validation";
import { getAttachmentHref, getAttachmentTypeLabel } from "@/lib/titus/node-links";
import {
  getCourseAssemblyNodeHref,
  getCourseAssemblySectionLabel,
  getCourseAssemblyTypeLabel,
} from "@/lib/titus/course-node-links";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessonAssemblies } from "@/data/titus/lesson-assemblies";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import {
  traditionCards,
  traditionPlacements,
} from "@/data/titus/tradition-notes";

export default function RegistryPage() {
  assertNoAssemblyErrors();
  assertNoCourseAssemblyErrors();
  assertNoSourcePacketErrors();

  const assemblyIssues = getAssemblyIssues();
  const courseAssemblyIssues = getCourseAssemblyIssues();
  const sourcePacketIssues = getSourcePacketIssues();

  return (
    <main className="page-shell">
      <Link className="small-link" href="/">
        ← Course catalogue
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Titus Node Registry</div>
        <h1>Reusable public study nodes.</h1>
        <p className="lede">
          This page shows the reusable Titus objects that can be attached to
          lessons and courses: word lessons, Pattern Debriefs, Function Lenses,
          Canon Chains, Tradition Cards, and Tradition Placements.
        </p>
      </section>


      <section className="registry-section">
        <div className="kicker">Assembly Integrity</div>
        <article className={assemblyIssues.length === 0 ? "registry-health-card ok" : "registry-health-card problem"}>
          <h2>{assemblyIssues.length === 0 ? "All assemblies resolve" : "Assembly issues found"}</h2>
          <p>
            {assemblyIssues.length === 0
              ? "Every lesson assembly currently points to an existing lesson, course, and reusable node."
              : "One or more lesson assemblies point to missing or incomplete nodes."}
          </p>

          {assemblyIssues.length > 0 ? (
            <ul className="pattern-list">
              {assemblyIssues.map((issue) => (
                <li key={`${issue.lessonSlug}-${issue.drawerCode}-${issue.nodeSlug}-${issue.message}`}>
                  <strong>{issue.severity.toUpperCase()}:</strong> {issue.message}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </section>


      <section className="registry-section">
        <div className="kicker">Source Packet Integrity</div>
        <article className={sourcePacketIssues.length === 0 ? "registry-health-card ok" : "registry-health-card problem"}>
          <h2>{sourcePacketIssues.length === 0 ? "All source packets resolve" : "Source packet issues found"}</h2>
          <p>
            {sourcePacketIssues.length === 0
              ? "Every public node currently points to a registered source packet."
              : "One or more public nodes point to missing or duplicate source packets."}
          </p>

          {sourcePacketIssues.length > 0 ? (
            <ul className="pattern-list">
              {sourcePacketIssues.map((issue) => (
                <li key={`${issue.nodeType}-${issue.nodeSlug}-${issue.sourcePacket}-${issue.message}`}>
                  <strong>{issue.severity.toUpperCase()}:</strong> {issue.message}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </section>

      <section className="registry-section">
        <div className="kicker">Course Assembly Integrity</div>
        <article className={courseAssemblyIssues.length === 0 ? "registry-health-card ok" : "registry-health-card problem"}>
          <h2>{courseAssemblyIssues.length === 0 ? "All course assemblies resolve" : "Course assembly issues found"}</h2>
          <p>
            {courseAssemblyIssues.length === 0
              ? "Every course assembly currently points to an existing course and reusable or queued node."
              : "One or more course assemblies point to missing or incomplete nodes."}
          </p>

          {courseAssemblyIssues.length > 0 ? (
            <ul className="pattern-list">
              {courseAssemblyIssues.map((issue) => (
                <li key={`${issue.courseSlug}-${issue.section}-${issue.nodeSlug}-${issue.message}`}>
                  <strong>{issue.severity.toUpperCase()}:</strong> {issue.message}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </section>

      <section className="registry-section">
        <div className="kicker">Source Packet Records</div>
        <div className="registry-grid">
          {sourcePackets.map((packet) => (
            <Link
              className="registry-card placement-registry-card"
              href={`/sources/${packet.slug}`}
              key={packet.slug}
            >
              <span className="status">Source Packet · {packet.status}</span>
              <h2>{packet.title}</h2>
              <p>{packet.summary}</p>
              <p>
                Kind: {packet.packetKind.replaceAll("_", " ")}
                <br />
                Owner: {packet.owner}
                <br />
                Last updated: {packet.lastUpdated}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Course Assemblies</div>
        <div className="registry-grid">
          {courseAssemblies.map((node) => {
            const href = getCourseAssemblyNodeHref(node);

            const inner = (
              <>
                <span className="status">Course Assembly</span>
                <h2>{node.label}</h2>
                <p>{node.summary}</p>
                <p>
                  Course: {node.courseSlug}
                  <br />
                  Section: {getCourseAssemblySectionLabel(node.section)}
                  <br />
                  Type: {getCourseAssemblyTypeLabel(node.type)}
                  <br />
                  Node: {node.nodeSlug}
                </p>
              </>
            );

            return href ? (
              <Link
                className="registry-card placement-registry-card"
                href={href}
                key={`${node.courseSlug}-${node.section}-${node.type}-${node.nodeSlug}`}
              >
                {inner}
              </Link>
            ) : (
              <article
                className="registry-card placement-registry-card"
                key={`${node.courseSlug}-${node.section}-${node.type}-${node.nodeSlug}`}
              >
                {inner}
              </article>
            );
          })}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Lesson Assemblies</div>
        <div className="registry-grid">
          {lessonAssemblies.map((attachment) => {
            const href = getAttachmentHref(attachment);

            if (!href) {
              return (
                <article
                  className="registry-card placement-registry-card"
                  key={`${attachment.lessonSlug}-${attachment.type}-${attachment.nodeSlug}`}
                >
                  <span className="status">Broken Assembly</span>
                  <h2>{attachment.label}</h2>
                  <p>
                    Lesson: {attachment.lessonSlug}
                    <br />
                    Course: {attachment.courseSlug}
                    <br />
                    Drawer: {attachment.drawerCode}
                    <br />
                    Type: {getAttachmentTypeLabel(attachment)}
                    <br />
                    Node: {attachment.nodeSlug}
                  </p>
                </article>
              );
            }

            return (
              <Link
                className="registry-card placement-registry-card"
                href={href}
                key={`${attachment.lessonSlug}-${attachment.type}-${attachment.nodeSlug}`}
              >
                <span className="status">Lesson Assembly</span>
                <h2>{attachment.label}</h2>
                <p>
                  Lesson: {attachment.lessonSlug}
                  <br />
                  Course: {attachment.courseSlug}
                  <br />
                  Drawer: {attachment.drawerCode}
                  <br />
                  Type: {getAttachmentTypeLabel(attachment)}
                  <br />
                  Node: {attachment.nodeSlug}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Published Word Lessons</div>
        <div className="registry-grid">
          {lessons.map((lesson) => (
            <Link
              className="registry-card"
              href={`/lessons/${lesson.slug}`}
              key={lesson.slug}
            >
              <span className="status">Word Lesson</span>
              <h2>{lesson.title}</h2>
              <p>{lesson.field}</p>
              <p>Status: {lesson.status}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Pattern Debriefs</div>
        <div className="registry-grid">
          {patternDebriefs.map((pattern) => (
            <Link
              className="registry-card"
              href={`/patterns/${pattern.slug}`}
              key={pattern.slug}
            >
              <span className="status">Pattern Debrief</span>
              <h2>{pattern.title}</h2>
              <p>{pattern.appearsIn.join(", ")}</p>
              <p>Status: {pattern.status.replaceAll("_", " ")}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Function Lenses</div>
        <div className="registry-grid">
          {functionLenses.map((lens) => (
            <Link
              className="registry-card"
              href={`/lenses/${lens.slug}`}
              key={lens.slug}
            >
              <span className="status">Function Lens</span>
              <h2>{lens.title}</h2>
              <p>{lens.subtitle}</p>
              <p>Status: {lens.status}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Canon Chains</div>
        <div className="registry-grid">
          {canonChains.map((chain) => (
            <Link
              className="registry-card"
              href={`/chains/${chain.slug}`}
              key={chain.slug}
            >
              <span className="status">Canon Chain</span>
              <h2>{chain.title}</h2>
              <p>{chain.subtitle}</p>
              <p>Status: {chain.status}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Tradition Cards</div>
        <div className="registry-grid">
          {traditionCards.map((card) => (
            <Link
              className="registry-card"
              href={`/traditions/${card.slug}`}
              key={card.slug}
            >
              <span className="status">Tradition Card</span>
              <h2>{card.title}</h2>
              <p>{card.subtitle}</p>
              <p>
                {card.cardKind.replaceAll("_", " ")} · Status: {card.status}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Tradition Placements</div>
        <div className="registry-grid">
          {traditionPlacements.map((placement) => {
            const card = traditionCards.find(
              (traditionCard) => traditionCard.slug === placement.cardSlug
            );

            return (
              <Link
                className="registry-card placement-registry-card"
                href={`/traditions/${placement.cardSlug}?placement=${placement.slug}&from=/lessons/${placement.lessonSlug}`}
                key={placement.slug}
              >
                <span className="status">Tradition Placement</span>
                <h2>{placement.placementTitle}</h2>
                <p>{placement.placementSummary}</p>
                <p>
                  Card: {card?.title || placement.cardSlug}
                  <br />
                  Attached to: {placement.courseSlug} / {placement.lessonSlug}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
