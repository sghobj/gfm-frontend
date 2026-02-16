import { countries, continents } from "countries-list";

/**
 * Build once at module load (not inside component) → fast & stable.
 */
export const countryToIso2: Record<string, string> = Object.fromEntries(
    Object.entries(countries).map(([iso2, data]) => [data.name, iso2]),
);

export const countryToContinent: Record<string, string> = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(countries).map(([_, data]) => [
        data.name,
        continents[data.continent as keyof typeof continents] ?? data.continent,
    ]),
);

/**
 * Normalizes typical naming differences.
 * - handles "United States of America" vs "United States"
 * - handles "Czechia" vs "Czech Republic" etc (add as needed)
 */
const ALIASES: Record<string, string> = {
    "United States of America": "United States",
};

export function normalizeCountryName(name: string) {
    return ALIASES[name] ?? name;
}

export function getFlagUrl(countryName: string): string | null {
    const normalized = normalizeCountryName(countryName);
    const iso2 = countryToIso2[normalized];
    if (!iso2) return null;
    return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
}
