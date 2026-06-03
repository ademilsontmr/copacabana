export type RelatedDomain = {
  url: string;
  label: string;
};

/** Rede de domínios premium irmãos — exibir em todos os sites, exceto o atual. */
export const RELATED_DOMAINS: RelatedDomain[] = [
  { url: "https://cassinodegramado.com.br/", label: "cassinodegramado.com.br" },
  { url: "https://cassinocamposdojordao.com.br/", label: "cassinocamposdojordao.com.br" },
  { url: "https://cassinocopacabana.com/", label: "cassinocopacabana.com" },
  { url: "https://cassinodesaopaulo.com.br/", label: "cassinodesaopaulo.com.br" },
  { url: "https://cassinodebrasilia.com.br/", label: "cassinodebrasilia.com.br" },
  { url: "https://cassinodesalinas.com.br/", label: "cassinodesalinas.com.br" },
  { url: "https://cassinobh.com.br/", label: "cassinobh.com.br" },
  { url: "https://cassinoportoalegre.com/", label: "cassinoportoalegre.com" },
];

function normalizeHost(host: string): string {
  return host.replace(/^www\./i, "").toLowerCase();
}

export function getRelatedDomainsExcludingCurrent(currentHost: string = "cassinocopacabana.com"): RelatedDomain[] {
  const current = normalizeHost(currentHost);
  return RELATED_DOMAINS.filter((item) => {
    try {
      return normalizeHost(new URL(item.url).hostname) !== current;
    } catch {
      return normalizeHost(item.label) !== current;
    }
  });
}
