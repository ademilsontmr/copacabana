import { Mail, Sparkles } from "lucide-react";

import { DOMAIN, FORM_URL } from "@/lib/site";

type DomainHeroProps = {
  /** Versão compacta para cards em artigos do blog */
  compact?: boolean;
};

export function DomainHero({ compact = false }: DomainHeroProps) {
  if (compact) {
    return (
      <section
        className="relative overflow-hidden rounded-xl text-center px-6 py-10 md:py-12"
        aria-label="Oferta do domínio cassinocopacabana.com"
      >
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, oklch(0.82 0.14 85 / 25%), transparent 60%)",
          }}
        />
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-card/50 text-xs uppercase tracking-[0.2em] text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Ativo Digital Premium
          </div>
          <p className="font-serif text-2xl md:text-3xl leading-tight text-foreground">
            Domínio Premium à Venda
          </p>
          <p className="mt-3 text-lg md:text-xl text-primary font-sans">{DOMAIN}</p>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            Adquira um domínio estratégico para turismo, entretenimento e hotelaria em Copacabana, Rio de Janeiro.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition text-sm"
            >
              <Mail className="h-4 w-4" /> Enviar Oferta
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="top" className="relative overflow-hidden" aria-label="Domínio premium à venda">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, oklch(0.82 0.14 85 / 25%), transparent 60%)",
        }}
      />
      <div className="container mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-card/50 text-xs uppercase tracking-[0.2em] text-primary mb-8">
          <Sparkles className="h-3.5 w-3.5" /> Ativo Digital Premium
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground max-w-4xl mx-auto">
          Domínio Premium à Venda
        </h1>

        <p className="mt-5 text-xl md:text-2xl lg:text-3xl text-primary font-sans tracking-tight">
          {DOMAIN}
        </p>

        <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Adquira um domínio estratégico, memorável e com forte potencial de marca para projetos relacionados a
          turismo, entretenimento, hotelaria, eventos e negócios digitais — em um momento em que o governo federal
          está quase regulamentando cassinos no Brasil, como já ocorre em diversos países.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition text-base"
          >
            <Mail className="h-4 w-4" /> Enviar Oferta
          </a>
        </div>

        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-primary">Domínio disponível</p>

        <div id="dominio" className="mt-4 max-w-xl mx-auto">
          <div className="rounded-lg border border-border/50 bg-card/50 px-8 py-5 text-center">
            <div className="font-sans text-lg md:text-xl text-foreground tracking-tight">{DOMAIN}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
