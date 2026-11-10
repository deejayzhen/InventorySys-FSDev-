import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getParts, deletePart } from "./api";
import { usePartStore } from "./store";
import PartForm from "./PartForm";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["parts"],
    queryFn: getParts,
  });
  const editingPart = usePartStore((state) => state.editingPart);
  const setEditingPart = usePartStore((state) => state.setEditingPart);
  const search = usePartStore((state) => state.search);
  const setSearch = usePartStore((state) => state.setSearch);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const term = search.toLowerCase();
  const filteredParts = data?.filter(
    (part) =>
      part.name.toLowerCase().includes(term) ||
      part.sku.toLowerCase().includes(term) ||
      part.brand.toLowerCase().includes(term),
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">PC Parts Inventory</h1>
      <PartForm key={editingPart?.id ?? "new"} />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, SKU or brand"
        className="border rounded px-2 py-1 mb-4"
      />
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredParts?.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.sku}</td>
              <td>{part.brand}</td>
              <td>{part.category}</td>
              <td>{part.quantity}</td>
              <td>{part.price}</td>
              <td>{part.createdAt}</td>
              <td>
                <button onClick={() => deleteMutation.mutate(part.id)}>
                  Delete
                </button>
                <button onClick={() => setEditingPart(part)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
