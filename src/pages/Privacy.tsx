import Layout from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="container py-12 md:py-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Privacy Policy</h1>
        <div className="glass rounded-xl p-6 shadow-card space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Last updated:</strong> April 2026</p>

          <h2 className="text-lg font-semibold text-foreground">No Image Collection</h2>
          <p>PMEFA processes images entirely within your browser. No images are uploaded, transmitted, or stored on any server. We have zero access to the photos you process.</p>

          <h2 className="text-lg font-semibold text-foreground">Local Storage</h2>
          <p>We store a single anonymous identifier (UUID) in your browser's localStorage to maintain consistent watermark payloads across sessions. This ID is never transmitted anywhere.</p>

          <h2 className="text-lg font-semibold text-foreground">No Tracking</h2>
          <p>PMEFA does not use analytics, tracking pixels, or any third-party scripts that collect user data.</p>

          <h2 className="text-lg font-semibold text-foreground">No Cookies</h2>
          <p>We do not set any cookies. The only client-side storage used is localStorage for the anonymous user ID described above.</p>

          <h2 className="text-lg font-semibold text-foreground">Third Parties</h2>
          <p>We do not share any data with third parties because we do not collect any data in the first place.</p>

          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>If you have questions about this privacy policy, please reach out through the Support page.</p>
        </div>
      </section>
    </Layout>
  );
}
