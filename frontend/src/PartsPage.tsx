import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getParts, deletePart } from "./api";
import { usePartStore } from "./store";
import PartForm from "./PartForm";
import { filterParts } from "./filterParts.ts";
import { Pencil, Trash2 } from "lucide-react";

function PartsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["parts"],
    queryFn: getParts,
  });
  const editingPart = usePartStore((state) => state.editingPart);
  const setEditingPart = usePartStore((state) => state.setEditingPart);
  const search = usePartStore((state) => state.search);
  const setSearch = usePartStore((state) => state.setSearch);
  const isFormOpen = usePartStore((state) => state.isFormOpen);
  const setFormOpen = usePartStore((state) => state.setFormOpen);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const filteredParts = filterParts(data ?? [], search);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">PC Parts Inventory</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setFormOpen(true)}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Add Part
        </button>
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingPart ? "Edit Part" : "Add Part"}
              </h2>
              <PartForm key={editingPart?.id ?? "new"} />
            </div>
          </div>
        )}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, SKU or brand"
          className="border rounded px-2 py-1 w-72"
        />
      </div>
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>SKU</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Created</th>
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
              <td className="p-2">
                {Number(part.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="p-2">
                {new Date(part.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setEditingPart(part);
                      setFormOpen(true);
                    }}
                    aria-label="Edit"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(part.id)}
                    aria-label="Delete"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PartsPage;
