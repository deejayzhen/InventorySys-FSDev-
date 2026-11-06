import { useQuery } from "@tanstack/react-query";
import { getParts } from "./api";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["parts"],
    queryFn: getParts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">PC Parts Inventory</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.sku}</td>
              <td>{part.brand}</td>
              <td>{part.category}</td>
              <td>{part.quantity}</td>
              <td>{part.price}</td>
              <td>{part.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
