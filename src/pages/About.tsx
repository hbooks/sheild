import Layout from "@/components/Layout";
import { Shield, Eye, Lock, Cpu } from "lucide-react";

export default function About() {
  const features = [
    { icon: Shield, title: "Invisible Watermarking", desc: "PMEFA uses LSB steganography to embed an invisible machine-readable payload directly into your image's pixel data." },
    { icon: Eye, title: "AI Opt-Out Signal", desc: "The embedded payload explicitly states that the image owner opts out of AI training, creating a verifiable record." },
    { icon: Lock, title: "Client-Side Privacy", desc: "Your images never leave your browser. All processing happens locally using JavaScript Canvas APIs." },
    { icon: Cpu, title: "Dual-Layer Protection", desc: "Beyond steganography, PMEFA also injects metadata into PNG tEXt chunks as a secondary signal." },
  ];

  return (
    <Layout>
      <section className="container py-16 md:py-24 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">About PMEFA</h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          PMEFA (Protect Me From AI) is a free, open tool that lets anyone mark their images with an invisible digital watermark
          signaling that AI companies should not use them for training.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {features.map(f => (
            <div key={f.title} className="glass-strong rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
