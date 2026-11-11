import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getParts } from "./api";

function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["parts"],
    queryFn: getParts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const totals: Record<string, number> = {};
  for (const part of data ?? []) {
    totals[part.category] = (totals[part.category] ?? 0) + part.quantity;
  }
  const chartData = Object.entries(totals).map(([category, quantity]) => ({
    category,
    quantity,
  }));
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Stock by Category</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
