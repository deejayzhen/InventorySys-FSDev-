import { useState, type SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { createPart, updatePart } from "./api";
import { usePartStore } from "./store";

function PartForm() {
  const editingPart = usePartStore((state) => state.editingPart);
  const setEditingPart = usePartStore((state) => state.setEditingPart);

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
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
      setEditingPart(null);
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
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        placeholder="SKU"
        required
      />
      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
        required
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <button type="submit">{editingPart ? "Save" : "Add"}</button>
      {editingPart && (
        <button type="button" onClick={() => setEditingPart(null)}>
          Cancel
        </button>
      )}

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
