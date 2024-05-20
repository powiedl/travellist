import { useState } from "react";

export default function Form({ onAddItem, curItem }) {
  const [description, setDescription] = useState(
    curItem.description ? curItem.description : ""
  );
  const [qty, setQty] = useState(curItem.qty ? curItem.qty : 1);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!description) return; // wenn man keine Description angegeben hat, passiert nix ...

    const newItem = { description, qty, packed: false, id: Date.now() };
    onAddItem(newItem);

    setDescription("");
    setQty(1);
  }

  console.log("Form curItem=", curItem);
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
