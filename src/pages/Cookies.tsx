import Layout from "@/components/Layout";

export default function Cookies() {
  return (
    <Layout>
      <section className="container py-12 md:py-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Cookie Policy</h1>
        <div className="glass rounded-xl p-6 shadow-card space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Last updated:</strong> April 2026</p>

          <h2 className="text-lg font-semibold text-foreground">We Don't Use Cookies</h2>
          <p>PMEFA does not use cookies of any kind — no first-party cookies, no third-party cookies, no tracking cookies.</p>

          <h2 className="text-lg font-semibold text-foreground">localStorage</h2>
          <p>We use browser localStorage to store a single anonymous UUID. This is used solely to generate consistent watermark payloads. It is never sent to any server and contains no personal information.</p>

          <h2 className="text-lg font-semibold text-foreground">How to Clear</h2>
          <p>You can clear localStorage at any time through your browser's developer tools or settings. This will simply generate a new anonymous ID on your next visit.</p>
        </div>
      </section>
    </Layout>
  );
}
