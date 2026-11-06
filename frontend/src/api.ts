import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export type PcPart = {
  id: number;
  name: string;
  sku: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  createdAt: string;
};

export const getParts = async () => {
  const response = await api.get<PcPart[]>("/pc-parts");
  return response.data;
};
