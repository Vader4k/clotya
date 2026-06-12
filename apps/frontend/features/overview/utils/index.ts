export function formatCurrency(value: number) {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
}

export function formatXLabel(name: string, range: string) {
    const d = new Date(name);
    if (isNaN(d.getTime())) return name;
    if (range === "12m") return d.toLocaleDateString("en-US", { month: "short" });
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
