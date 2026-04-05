import { Shield, Lock, Zap, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import ProtectCard from "@/components/ProtectCard";
import VerifyCard from "@/components/VerifyCard";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-medium text-primary mb-6 border border-primary/20">
            <Shield className="h-3.5 w-3.5" />
            100% Client-Side · No Uploads · Free
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="gradient-text">Protect Your Images</span>
            <br />
            <span className="text-foreground/90">From AI Training</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Embed invisible watermarks in your photos to signal that AI training is prohibited.
            Everything runs in your browser — your files never leave your device.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ProtectCard />
          <VerifyCard />
        </div>
      </section>

      {/* Features */}
      <section className="container pb-20">
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Lock, title: "Private by Design", desc: "Images never leave your browser. Zero server uploads." },
            { icon: Zap, title: "Instant Processing", desc: "Steganography runs in milliseconds using Canvas APIs." },
            { icon: Eye, title: "Invisible Mark", desc: "Watermarks are imperceptible to the human eye." },
          ].map((f) => (
            <div key={f.title} className="glass-strong rounded-2xl p-6 text-center group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
