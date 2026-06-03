import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Crown,
  Globe,
  Hotel,
  Mail,
  MapPin,
  Shield,
  Scale,
  Sparkles,
  TrendingUp,
  Trophy,
  ArrowRight,
} from "lucide-react";

import { DomainHero } from "@/components/domain-hero";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getSortedBlogPosts } from "@/lib/blog-posts";
import { getHomeHeadMeta } from "@/lib/seo";
import { DOMAIN, FORM_URL, SITE_URL } from "@/lib/site";

const faqItems = [
  {
    q: "O domínio está disponível para transferência?",
    a: `Sim. O domínio ${DOMAIN} está ativo, em nome do proprietário atual e pronto para transferência imediata após a confirmação da negociação. A transferência é realizada de forma segura através de registradores oficiais (ICANN).`,
  },
  {
    q: "Qual domínio está à venda?",
    a: `A oferta inclui o domínio premium ${DOMAIN}, com forte associação a Copacabana, turismo e entretenimento regulado no Rio de Janeiro.`,
  },
  {
    q: "Como funciona o processo de negociação?",
    a: "O processo é simples e transparente: você envia uma proposta pelo formulário, recebemos seu contato, alinhamos valores e condições, formalizamos o acordo e iniciamos a transferência segura do domínio.",
  },
  {
    q: "Posso enviar uma oferta personalizada?",
    a: "Com certeza. Aceitamos propostas e analisamos todas as ofertas sérias com atenção. Informe seu valor e condições no formulário e retornaremos rapidamente.",
  },
  {
    q: "Qual o prazo para transferência do domínio?",
    a: "Após a confirmação do pagamento, a transferência costuma ser concluída em até 7 dias úteis, dependendo do registrador escolhido pelo comprador.",
  },
  {
    q: "Por que Copacabana?",
    a: "Copacabana é um dos bairros mais reconhecidos do mundo, com fluxo turístico intenso, hotelaria consolidada e vocação para entretenimento premium — cenário ideal para projetos de cassino regulado no Rio de Janeiro.",
  },
  {
    q: "A regulamentação de cassinos no Brasil afeta o valor deste domínio?",
    a: "O governo federal está quase regulamentando cassinos no Brasil, seguindo modelos de países que já legalizam e fiscalizam a atividade. Essa perspectiva reforça a relevância de um domínio premium associado a turismo e entretenimento em Copacabana — destino natural para resorts integrados de alto padrão.",
  },
];

const valueCards = [
  { icon: Sparkles, title: "Nome memorável", text: "Fácil de lembrar, escrever e divulgar — ideal para construção de marca forte." },
  { icon: MapPin, title: "Associação com Copacabana", text: "Conexão direta com um dos destinos turísticos mais valorizados do Brasil." },
  { icon: Crown, title: "Potencial para branding", text: "Permite criar uma identidade premium em diversos segmentos de alto valor." },
  { icon: Hotel, title: "Turismo e entretenimento", text: "Encaixe natural em hotelaria, eventos, lazer e experiências exclusivas." },
  { icon: Globe, title: "Domínio .COM", text: "Presença internacional com endereço memorável e credibilidade global." },
  { icon: Trophy, title: "Ativo digital escasso", text: "Combinações premium como esta são raras e tendem a se valorizar com o tempo." },
  { icon: Scale, title: "Regulação iminente", text: "O governo federal está quase regulamentando cassinos no Brasil — ampliando o potencial do setor de entretenimento e turismo." },
  { icon: Shield, title: "Negociação segura", text: "Transferência documentada via registradores ICANN, com processo transparente do primeiro contato à entrega do domínio." },
  { icon: TrendingUp, title: "Interesse de busca em alta", text: "Palavras-chave de turismo, entretenimento e regulação tendem a crescer — posicionar-se cedo amplifica visibilidade orgânica no Google." },
];

const useCases = [
  { icon: Crown, title: "Resorts", text: "Identidade digital para empreendimentos integrados de hospedagem, lazer e entretenimento de alto padrão." },
  { icon: Globe, title: "Portal turístico", text: "Hub completo de informações sobre Copacabana." },
  { icon: Hotel, title: "Guia de hotéis e pousadas", text: "Plataforma de reservas e curadoria de hospedagens." },
  { icon: Calendar, title: "Portal de eventos", text: "Agenda cultural, gastronômica e festivais da região." },
  { icon: Sparkles, title: "Blog de viagens", text: "Conteúdo premium sobre destinos à beira-mar e luxo." },
  { icon: Trophy, title: "Projeto de entretenimento", text: "Marca forte para shows, espetáculos e experiências." },
  { icon: Building2, title: "Agência de turismo", text: "Operadora especializada em pacotes premium para Copacabana." },
  { icon: Award, title: "Portal histórico e cultural", text: "Acervo digital sobre patrimônio e tradições locais." },
  { icon: TrendingUp, title: "Marketplace regional", text: "Comércio local de produtores, restaurantes e artesãos." },
];

const seoKeywords = [
  "Cassino Copacabana",
  "Domínio premium à venda",
  "Regulação cassinos Brasil",
  "Turismo Zona Sul do Rio de Janeiro",
  "Hotelaria e resorts",
  "Entretenimento regulado",
  "Emprego formal",
  "Jogo responsável",
];

export const Route = createFileRoute("/")({
  head: () => getHomeHeadMeta(faqItems),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main
        id="conteudo-principal"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <meta itemProp="url" content={SITE_URL} />
        <meta itemProp="name" content={`Cassino Copacabana — domínio ${DOMAIN} à venda`} />
        <DomainHero />
        <DomainsStrip />
        <ValueSection />
        <RegulationSection />
        <SeoSection />
        <UseCasesSection />
        <BlogSection />
        <DomainCtaSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function DomainsStrip() {
  const items = [
    { icon: Shield, label: "Transferência Segura" },
    { icon: Award, label: "Marca Protegida" },
    { icon: TrendingUp, label: "Alto Potencial" },
    { icon: Globe, label: DOMAIN },
  ];
  return (
    <section className="border-y border-border/40 bg-card/30">
      <div className="container mx-auto max-w-6xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" /> {label}
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  headingId,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  headingId?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{eyebrow}</div>
      )}
      <h2 id={headingId} className="font-serif text-3xl md:text-5xl leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function ValueSection() {
  return (
    <section id="valor" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Vantagens"
          title="Por que este domínio é uma oportunidade única?"
          subtitle="Uma combinação rara de relevância geográfica, força de marca e versatilidade comercial em um único ativo digital."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {valueCards.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card/60 p-7 hover:border-gold/50 hover:-translate-y-1 transition"
            >
              <div className="h-11 w-11 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold mb-5">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegulationSection() {
  return (
    <section id="regulamentacao" className="py-24 bg-card/30 border-y border-border/40">
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Contexto de Mercado"
          title="Regulamentação de Cassinos no Brasil"
          subtitle="O governo federal está quase regulamentando a atividade, seguindo o modelo adotado por diversos países."
        />
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-lg space-y-5">
          <p>
            Assim como nos <strong className="text-foreground">Estados Unidos, Portugal, Singapura</strong> e em
            vários destinos turísticos da Europa e da América Latina, o Brasil está próximo de estabelecer um marco
            regulatório para cassinos. O governo federal avança na definição de regras claras, fiscalização e
            contribuição à economia — abrindo espaço para empreendimentos integrados de lazer, hotelaria e
            entretenimento.
          </p>
          <p>
            Em países onde a atividade já é legal e regulada, resorts com cassino impulsionam turismo, geração de
            empregos e arrecadação pública. Destinos premium como{" "}
            <strong className="text-foreground">Copacabana</strong> reúnem o perfil ideal para esse tipo de
            projeto: infraestrutura hoteleira consolidada, fluxo turístico de alto padrão e forte apelo
            internacional.
          </p>
          <p>
            Possuir um domínio com posicionamento claro neste segmento — neste momento de transição regulatória —
            representa uma vantagem estratégica para investidores, empreendedores e grupos hoteleiros que desejam
            antecipar tendências e construir uma marca sólida no mercado brasileiro.
          </p>
        </div>
      </div>
    </section>
  );
}

function SeoSection() {
  return (
    <section className="py-24 bg-card/30 border-y border-border/40">
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="SEO Estratégico"
          title="Potencial para Posicionamento Digital"
        />
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-lg space-y-5">
          <p>
            O domínio <strong className="text-foreground">{DOMAIN}</strong> reúne, em um único
            endereço, palavras-chave de alto interesse que tradicionalmente atraem audiências qualificadas em
            segmentos de turismo, hotelaria, eventos e entretenimento. A combinação entre um termo aspiracional
            e a referência direta a um dos destinos mais valorizados do Brasil cria um ativo com forte
            identidade e relevância semântica.
          </p>
          <p>
            Para projetos digitais que buscam construir autoridade ao longo do tempo, partir de um domínio com
            tamanha clareza temática representa uma base sólida — especialmente com o governo federal quase
            regulamentando cassinos no Brasil. Aliado a uma estratégia editorial consistente no{" "}
            <Link to="/blog" className="text-primary hover:underline">
              blog sobre regulação e turismo
            </Link>
            , esse ativo pode sustentar portais informativos, plataformas de reservas, guias culturais e
            experiências de marca premium voltadas ao público que visita ou se interessa pela região.
          </p>
          <ul className="list-disc list-inside space-y-2 text-base mt-6">
            <li>
              <Link to="/blog/cassinos-brasil-emprego-renda" className="text-primary hover:underline">
                Emprego e renda com cassinos regulados no Brasil
              </Link>
            </li>
            <li>
              <Link to="/blog/copacabana-polo-entretenimento-regulado" className="text-primary hover:underline">
                Copacabana como polo de entretenimento licenciado
              </Link>
            </li>
            <li>
              <Link to="/blog/dominio-premium-seo-entretenimento-copacabana" className="text-primary hover:underline">
                Domínio premium e SEO no entretenimento em Copacabana
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3" role="list" aria-label="Palavras-chave estratégicas">
          {seoKeywords.map((k) => (
            <span
              key={k}
              role="listitem"
              className="px-4 py-2 rounded-full border border-gold/40 bg-background/60 text-sm text-foreground"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section id="aplicacoes" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Aplicações"
          title="Possibilidades de Utilização"
          subtitle="Um ativo versátil que se adapta a múltiplos modelos de negócio voltados à Zona Sul do Rio."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card/60 p-6 hover:border-gold/50 transition"
            >
              <Icon className="h-5 w-5 text-primary mb-4" />
              <h3 className="font-serif text-lg mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const posts = getSortedBlogPosts().slice(0, 6);

  return (
    <section id="blog" className="py-24 bg-card/30 border-y border-border/40" aria-labelledby="blog-heading">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading
          headingId="blog-heading"
          eyebrow="Conteúdo"
          title="Blog sobre regulação, emprego e turismo"
          subtitle="Artigos informativos sobre cassinos regulados em Copacabana e no Brasil — reforçando autoridade temática do domínio."
        />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="h-full rounded-xl border border-border bg-card/60 p-6 hover:border-gold/50 transition flex flex-col">
                <h2 className="font-serif text-lg mb-3 leading-snug">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary transition">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium"
                >
                  Ler artigo <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
          >
            Ver todos os artigos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DomainCtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50"
           style={{ backgroundImage: "radial-gradient(ellipse at center, oklch(0.82 0.14 85 / 18%), transparent 65%)" }} />
      <div className="container mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-gold/40 bg-card/70 backdrop-blur p-10 md:p-16 text-center shadow-elegant">
          <Crown className="h-10 w-10 mx-auto text-primary mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl">Adquira o Domínio Premium</h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Garanta presença digital estratégica com {DOMAIN} — marca memorável para turismo e entretenimento em Copacabana.
          </p>
          <div className="mt-10 max-w-md mx-auto">
            <div className="rounded-xl border border-gold/40 bg-background/60 px-6 py-6 ring-gold-glow">
              <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="font-serif text-lg md:text-xl">{DOMAIN}</div>
            </div>
          </div>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition"
          >
            <Mail className="h-4 w-4" /> Enviar Oferta
          </a>
        </div>
      </div>
    </section>
  );
}


function FaqSection() {
  return (
    <section id="faq" className="py-24" aria-labelledby="faq-heading">
      <div className="container mx-auto max-w-3xl px-6">
        <SectionHeading headingId="faq-heading" eyebrow="Dúvidas Frequentes" title="Perguntas e Respostas" />
        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border bg-card/60 p-6 open:border-gold/50 transition"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-serif text-lg">
                <span itemProp="name">{item.q}</span>
                <span className="text-primary text-2xl leading-none transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="mt-4 text-muted-foreground leading-relaxed" itemProp="text">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
