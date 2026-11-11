import { describe, expect, it } from "vitest";
import type { PcPart } from "./api";
import { filterParts } from "./filterParts.ts";

const parts: PcPart[] = [
  {
    id: 1,
    name: "Ryzen 5 7600",
    sku: "CPU-R5-7600",
    brand: "AMD",
    category: "CPU",
    quantity: 4,
    price: 229.99,
    createdAt: "2026-11-01T00:00:00Z",
  },
  {
    id: 2,
    name: "RTX 4070",
    sku: "GPU-RTX-4070",
    brand: "NVIDIA",
    category: "GPU",
    quantity: 8,
    price: 599.99,
    createdAt: "2026-11-01T00:00:00Z",
  },
];

describe("filterParts", () => {
  it("matches by name, ignoring case", () => {
    expect(filterParts(parts, "RYZEN")).toHaveLength(1);
  });

  it("returns everything when search is empty", () => {
    expect(filterParts(parts, "")).toHaveLength(2);
  });
  
  it("matches by SKU", () => {
    expect(filterParts(parts, "GPU-RTX")).toHaveLength(1);
  });
});
