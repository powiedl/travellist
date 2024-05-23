import { useState } from "react";

export default function FormChildren({ onAddItem, children }) {
  const oChildren = JSON.parse(children);
  const [description, setDescription] = useState(oChildren.description);
  const [qty, setQty] = useState(oChildren.qty);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!description) return; // wenn man keine Description angegeben hat, passiert nix ...

    const newItem = { description, qty, packed: false, id: Date.now() };
    onAddItem(newItem);

    setDescription("");
    setQty(1);
  }

  console.log("Form oChildren=", oChildren);
  console.log(`  qty=${qty}, description='${description}'`);
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
