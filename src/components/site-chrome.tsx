import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Crown } from "lucide-react";

import { RelatedDomainsSection } from "@/components/related-domains-section";
import { DOMAIN, FORM_URL } from "@/lib/site";

const NAV_ITEMS = [
  { label: "Vantagens", sectionId: "valor" },
  { label: "Regulação", sectionId: "regulamentacao" },
  { label: "Aplicações", sectionId: "aplicacoes" },
] as const;

function useSectionHref(sectionId: string) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" hash="top" className="flex items-center gap-2 group">
          <Crown className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg tracking-tight">
            Cassino<span className="text-gradient-gold"> Copacabana</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground" aria-label="Navegação principal">
          {NAV_ITEMS.slice(0, 3).map(({ label, sectionId }) => (
            <NavSectionLink key={sectionId} sectionId={sectionId}>
              {label}
            </NavSectionLink>
          ))}
          <Link to="/blog" className="hover:text-primary transition">
            Blog
          </Link>
          <NavSectionLink sectionId="faq">FAQ</NavSectionLink>
        </nav>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-gradient-gold text-primary-foreground px-4 py-2 rounded-md font-medium shadow-gold hover:opacity-90 transition"
        >
          Enviar Oferta
        </a>
      </div>
    </header>
  );
}

function NavSectionLink({
  sectionId,
  children,
}: {
  sectionId: string;
  children: ReactNode;
}) {
  const href = useSectionHref(sectionId);
  return (
    <a href={href} className="hover:text-primary transition">
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <>
      <RelatedDomainsSection />
      <footer className="border-t border-border/40 py-10">
      <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          <span>© {new Date().getFullYear()} {DOMAIN} — Domínio Premium à Venda</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5" aria-label="Links do rodapé">
          <Link to="/blog" className="hover:text-primary transition">Blog</Link>
          <a href="/#dominio" className="hover:text-primary transition">Domínio</a>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            Contato
          </a>
          <a href="/#faq" className="hover:text-primary transition">FAQ</a>
        </nav>
      </div>
    </footer>
    </>
  );
}
