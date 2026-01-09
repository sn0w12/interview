import { UnitGroup } from "./data";

export const LAST_SUCCESSFUL_CITY_KEY = "lastSuccessfulCity";
export const LAST_SUCCESSFUL_UNIT_KEY = "lastSuccessfulUnit";
export const LATEST_SEARCHES_KEY = "latestSearches";

export interface LatestSearchEntry {
    city: string;
    unitGroup: UnitGroup;
}

export function getDefaultCity(): string {
    if (typeof window === "undefined") {
        return "";
    }
    return localStorage.getItem(LAST_SUCCESSFUL_CITY_KEY) || "";
}

export function getDefaultUnit(): UnitGroup {
    if (typeof window === "undefined") {
        return "metric";
    }
    return (
        (localStorage.getItem(LAST_SUCCESSFUL_UNIT_KEY) as UnitGroup) ||
        "metric"
    );
}

export function getLatestSearches(): LatestSearchEntry[] {
    if (typeof window === "undefined") {
        return [];
    }
    const data = localStorage.getItem(LATEST_SEARCHES_KEY);
    if (!data) {
        return [];
    }
    try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [];
    } catch {
        return [];
    }
}

export function saveLatestSearch(
    city: string,
    unitGroup: UnitGroup,
    maxItems = 5
): void {
    if (typeof window === "undefined") {
        return;
    }
    const searches = getLatestSearches();
    const updatedSearches = [
        { city, unitGroup },
        ...searches.filter((c) => c.city !== city || c.unitGroup !== unitGroup),
    ].slice(0, maxItems);
    localStorage.setItem(LATEST_SEARCHES_KEY, JSON.stringify(updatedSearches));
}
