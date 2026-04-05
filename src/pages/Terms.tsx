import Layout from "@/components/Layout";

export default function Terms() {
  return (
    <Layout>
      <section className="container py-12 md:py-20 max-w-3xl prose-sm">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Terms of Service</h1>
        <div className="glass rounded-xl p-6 shadow-card space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Last updated:</strong> April 2026</p>

          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By using PMEFA ("the Service"), you agree to these Terms of Service. If you do not agree, please do not use the Service.</p>

          <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
          <p>PMEFA provides a free, client-side tool for embedding invisible watermarks in images. The Service runs entirely in your web browser and does not transmit, store, or process your images on any server.</p>

          <h2 className="text-lg font-semibold text-foreground">3. No Warranty</h2>
          <p>The Service is provided "as is" without warranties of any kind. We do not guarantee that the watermark will prevent AI training or that all platforms will honor the opt-out signal.</p>

          <h2 className="text-lg font-semibold text-foreground">4. Limitation of Liability</h2>
          <p>In no event shall PMEFA, its creators, or contributors be liable for any damages arising from the use or inability to use the Service.</p>

          <h2 className="text-lg font-semibold text-foreground">5. User Responsibilities</h2>
          <p>You are solely responsible for the images you process. You must own or have the right to modify any image you upload to the Service.</p>

          <h2 className="text-lg font-semibold text-foreground">6. Intellectual Property</h2>
          <p>The watermark embedded by PMEFA does not transfer ownership of your images. You retain all rights to your original content.</p>

          <h2 className="text-lg font-semibold text-foreground">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the Service constitutes acceptance of updated terms.</p>

          <h2 className="text-lg font-semibold text-foreground">8. Governing Law</h2>
          <p>These terms shall be governed by applicable law. Any disputes shall be resolved through good-faith negotiation.</p>
        </div>
      </section>
    </Layout>
  );
}
