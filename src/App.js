import "./index.css";
import { useState } from "react";

function Logo() {
  return <h1>😎🌴 Far Away ✈ 😎</h1>;
}

function Form({ onAddItem, curItem }) {
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

function PackingList({ items, onDeleteItem, onPackedChange, onItemClicked }) {
  const [sortBy, setSortBy] = useState("input");
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onPackedChange={onPackedChange}
            onItemClicked={onItemClicked}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onPackedChange, onItemClicked }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onPackedChange(item.id)}
      />{" "}
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
        onClick={() => onItemClicked(item.id)}
      >
        {item.qty} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        Start adding some items to your packing list ...
      </footer>
    );

  const numItems = items.length;
  const packedItemsCnt = items.filter((el) => el.packed).length;
  const packedPercent =
    numItems > 0 ? Math.round((packedItemsCnt / numItems) * 100) : "";
  return (
    <footer className="stats">
      {numItems === packedItemsCnt
        ? "You got everything! Ready to go ✈"
        : `🧳 You have ${numItems} items on your list and you already packed ${packedItemsCnt} (${packedPercent}%)`}
    </footer>
  );
}

export default function App() {
  const [items, setItems] = useState([]);
  const [curItem, setCurItem] = useState({ qty: null, description: null });

  function handleAddItem(item) {
    setItems((arr) => [...arr, item]);
  }

  function handleDeleteItem(id) {
    setItems((arr) => arr.filter((e) => e.id !== id));
  }

  function handlePackedChange(id) {
    setItems((arr) =>
      arr.map((e) => {
        if (e.id !== id) return e;
        return { ...e, packed: !e.packed };
      })
    );
  }

  function handleItemClicked(id) {
    return; // doesn't work right now, so do nothing ...
    const curItemObj = items.filter((el) => el.id === id);
    if (curItemObj.length === 1) {
      // nur zur Sicherheit, kann eigentlich nix anderes sein ...
      setCurItem(curItemObj[0]);
      console.log("curItemObj=", curItemObj[0]);
      handleDeleteItem(id);
    }
  }

  console.log("App currItem=", curItem);
  return (
    <div className="App">
      <Logo />
      <Form onAddItem={handleAddItem} curItem={curItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackedChange={handlePackedChange}
        onItemClicked={handleItemClicked}
      />
      <Stats items={items} />
    </div>
  );
}
