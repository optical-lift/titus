import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourseAssembly,
  type CourseAssemblyNode,
  type CourseAssemblySection,
} from "@/data/titus/course-assemblies";
import { getCourse } from "@/data/titus/courses";
import {
  getCourseAssemblyNodeHref,
  getCourseAssemblySectionLabel,
  getCourseAssemblyTypeLabel,
} from "@/lib/titus/course-node-links";

const sectionOrder: CourseAssemblySection[] = [
  "course_path",
  "supporting_nodes",
  "traditions_in_conversation",
  "queued_lessons",
];

function CourseAssemblyCard({ node }: { node: CourseAssemblyNode }) {
  const href = getCourseAssemblyNodeHref(node);

  const inner = (
    <>
      <span className="status">{getCourseAssemblyTypeLabel(node.type)}</span>
      <h3>{node.label}</h3>
      <p>{node.summary}</p>
      <p className="assembly-meta">
        Section: {getCourseAssemblySectionLabel(node.section)}
        <br />
        Node: {node.nodeSlug}
      </p>
      {href ? <span className="small-link">Open node →</span> : null}
    </>
  );

  return href ? (
    <Link className="course-assembly-card" href={href}>
      {inner}
    </Link>
  ) : (
    <article className="course-assembly-card disabled-node">{inner}</article>
  );
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) {
    notFound();
  }

  const assembly = getCourseAssembly(course.slug);

  return (
    <main className="page-shell">
      <Link className="small-link" href="/">
        ← Course catalogue
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Titus Course</div>
        <h1>{course.title}</h1>
        <p className="lede">
          {course.subtitle}
          <br />
          Status: {course.status.replaceAll("_", " ")}
        </p>
      </section>

      <section className="card course-intro-card">
        <h2>Course Purpose</h2>
        <p>{course.description}</p>
      </section>

      {assembly.length === 0 ? (
        <section className="card course-intro-card">
          <h2>Course Assembly Pending</h2>
          <p>
            This course has a catalogue record, but its reusable node assembly
            has not been built yet.
          </p>
        </section>
      ) : (
        sectionOrder.map((section) => {
          const nodes = assembly.filter((node) => node.section === section);

          if (nodes.length === 0) {
            return null;
          }

          return (
            <section className="course-assembly-section" key={section}>
              <div className="kicker">{getCourseAssemblySectionLabel(section)}</div>
              <div className="course-assembly-grid">
                {nodes.map((node) => (
                  <CourseAssemblyCard
                    key={`${node.courseSlug}-${node.section}-${node.type}-${node.nodeSlug}`}
                    node={node}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}

      <nav className="footer-nav">
        <Link className="small-link" href="/">
          ← Course catalogue
        </Link>
        <Link className="small-link" href="/registry">
          Node Registry
        </Link>
      </nav>
    </main>
  );
}
