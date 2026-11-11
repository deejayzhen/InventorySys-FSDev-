import { useState, type SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { createPart, updatePart } from "./api";
import { usePartStore } from "./store";

function PartForm() {
  const editingPart = usePartStore((state) => state.editingPart);
  const setEditingPart = usePartStore((state) => state.setEditingPart);
  const setFormOpen = usePartStore((state) => state.setFormOpen);

  const [name, setName] = useState(editingPart?.name ?? "");
  const [sku, setSku] = useState(editingPart?.sku ?? "");
  const [brand, setBrand] = useState(editingPart?.brand ?? "");
  const [category, setCategory] = useState(editingPart?.category ?? "");
  const [quantity, setQuantity] = useState(
    editingPart ? String(editingPart.quantity) : "",
  );
  const [price, setPrice] = useState(editingPart?.price ?? "");
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
      setName("");
      setSku("");
      setBrand("");
      setCategory("");
      setQuantity("");
      setPrice("");
      setFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
      setEditingPart(null);
      setFormOpen(false);
    },
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const part = {
      name,
      sku,
      brand,
      category,
      quantity: Number(quantity),
      price: Number(price),
    };

    if (editingPart) {
      updateMutation.mutate({ id: editingPart.id, part });
    } else {
      createMutation.mutate(part);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border rounded px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        className="border rounded px-3 py-2"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        placeholder="SKU"
        required
      />
      <input
        className="border rounded px-3 py-2"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
        required
      />
      <input
        className="border rounded px-3 py-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        className="border rounded px-3 py-2"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <input
        className="border rounded px-3 py-2"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setEditingPart(null);
            setFormOpen(false);
          }}
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          {editingPart ? "Save" : "Add"}
        </button>
      </div>

      {createMutation.isError && (
        <p>
          {isAxiosError(createMutation.error)
            ? createMutation.error.response?.data.message
            : "Something went wrong"}
        </p>
      )}
    </form>
  );
}

export default PartForm;
