import type { PcPart } from "./api";

export function filterParts(parts: PcPart[], search: string) {
  const term = search.toLowerCase();
  return parts.filter(
    (part) =>
      part.name.toLowerCase().includes(term) ||
      part.sku.toLowerCase().includes(term) ||
      part.brand.toLowerCase().includes(term),
  );
}
