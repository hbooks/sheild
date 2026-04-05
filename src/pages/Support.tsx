import Layout from "@/components/Layout";
import { Heart, Coffee, DollarSign } from "lucide-react";

export default function Support() {
  const platforms = [
    { name: "PayPal", icon: DollarSign, url: "https://paypal.me/", color: "text-primary" },
    { name: "Ko-fi", icon: Coffee, url: "https://ko-fi.com/", color: "text-accent" },
    { name: "Buy Me a Coffee", icon: Coffee, url: "https://buymeacoffee.com/", color: "text-secondary" },
  ];

  return (
    <Layout>
      <section className="container py-16 md:py-24 max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-destructive/10 mb-6">
          <Heart className="h-7 w-7 text-destructive" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Support My Work</h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          PMEFA is free and always will be. If you find it useful, consider supporting its development
          so I can keep improving it and cover hosting costs.
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {platforms.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
              <div className="glass-strong rounded-2xl p-8 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted/50 mb-4">
                  <p.icon className={`h-6 w-6 ${p.color}`} />
                </div>
                <p className="font-semibold text-sm">{p.name}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-10">
          Thank you for believing in a more ethical internet. 💙
        </p>
      </section>
    </Layout>
  );
}
