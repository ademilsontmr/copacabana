import { ExternalLink } from "lucide-react";

import { DOMAIN } from "@/lib/site";
import { getRelatedDomainsExcludingCurrent } from "@/lib/related-domains";

export function RelatedDomainsSection() {
  const domains = getRelatedDomainsExcludingCurrent(DOMAIN);

  if (domains.length === 0) return null;

  return (
    <section
      className="border-t border-border/40 bg-card/20 py-16 md:py-20"
      aria-labelledby="related-domains-heading"
    >
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2
          id="related-domains-heading"
          className="font-serif text-2xl md:text-3xl text-foreground mb-3"
        >
          Outros domínios premium à venda
        </h2>
        <p className="text-sm text-muted-foreground mb-10">
          Estes sites também estão disponíveis para aquisição
        </p>
        <ul className="flex flex-wrap justify-center gap-3 list-none p-0 m-0">
          {domains.map(({ url, label }) => (
            <li key={label}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/40 px-4 py-2.5 text-sm text-foreground hover:border-gold/50 hover:text-primary transition"
              >
                {label}
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
