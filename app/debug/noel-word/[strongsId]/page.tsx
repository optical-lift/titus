import { getTitusNoelWordPacket } from "@/lib/noel/titus-word-packet";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{
    strongsId: string;
  }>;
};

export default async function NoelWordDebugPage({ params }: PageProps) {
  const { strongsId } = await params;
  const packet = await getTitusNoelWordPacket(strongsId);

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Noel packet test: {strongsId.toUpperCase()}</h1>

      <h2>Identity</h2>
      <pre>{JSON.stringify(packet.identity, null, 2)}</pre>

      <h2>Occurrences</h2>
      <pre>{JSON.stringify(packet.occurrences.slice(0, 10), null, 2)}</pre>

      <h2>Canon verses</h2>
      <pre>{JSON.stringify(packet.canonVerses, null, 2)}</pre>
    </main>
  );
}
