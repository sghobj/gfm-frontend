type MaybeNumber = number | null | undefined;

export type PackagingApproxInput = {
    amount?: MaybeNumber;
    amountMin?: MaybeNumber;
    amountMax?: MaybeNumber;
    unit?: string | null | undefined;
};

const toPositiveNumber = (value: unknown): number | null => {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : null;
};

const resolveRepresentativeAmount = (input: PackagingApproxInput): number | null => {
    const direct = toPositiveNumber(input.amount);
    if (direct) return direct;

    const min = toPositiveNumber(input.amountMin);
    const max = toPositiveNumber(input.amountMax);
    if (min && max) return (min + max) / 2;
    return min ?? max ?? null;
};

export const normalizeUnit = (unit: string | null | undefined): string =>
    String(unit ?? "")
        .trim()
        .toLowerCase();

export const toKgPerPackage = (input: PackagingApproxInput): number | null => {
    const amount = resolveRepresentativeAmount(input);
    if (!amount) return null;

    const unit = normalizeUnit(input.unit);

    if (unit === "kg") return amount;
    if (unit === "g") return amount / 1000;

    // Volume to mass is shown as an approximation for UI guidance.
    if (unit === "l") return amount;
    if (unit === "ml") return amount / 1000;

    return null;
};

export const getApproxPackageCount = (
    quantityKg: number,
    input: PackagingApproxInput | null | undefined,
): number | null => {
    const kg = toPositiveNumber(quantityKg);
    if (!kg || !input) return null;

    const kgPerPackage = toKgPerPackage(input);
    if (!kgPerPackage) return null;

    return kg / kgPerPackage;
};

export const formatApproxPackageCount = (value: number | null | undefined): string => {
    if (!value || !Number.isFinite(value)) return "";
    return value >= 100 ? value.toFixed(0) : value.toFixed(1);
};
