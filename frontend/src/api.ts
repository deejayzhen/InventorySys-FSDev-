import axios from "axios";
import { useAuthStore } from "./authStore";

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

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post<{ accessToken: string }>(
    "/auth/login",
    credentials,
  );
  return response.data.accessToken;
};

export const getParts = async () => {
  const response = await api.get<PcPart[]>("/pc-parts");
  return response.data;
};

export const createPart = async (part: NewPcPart) => {
  const response = await api.post<PcPart>("/pc-parts", part);
  return response.data;
};

export const updatePart = async ({
  id,
  part,
}: {
  id: number;
  part: NewPcPart;
}) => {
  const response = await api.patch<PcPart>(`/pc-parts/${id}`, part);
  return response.data;
};

export const deletePart = async (id: number) => {
  await api.delete(`/pc-parts/${id}`);
};

export type NewPcPart = Omit<PcPart, "id" | "createdAt" | "price"> & {
  price: number;
};
