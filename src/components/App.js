import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import FormChildren from "./FormChildren";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) {
      setItems([]);
      setCurItem({ qty: null, description: null });
    }
  }

  function handleItemClicked(id) {
    //return; // doesn't work right now, so do nothing ...
    const curItemObj = items.filter((el) => el.id === id);
    if (curItemObj.length === 1) {
      // nur zur Sicherheit, kann eigentlich nix anderes sein ...
      setCurItem(curItemObj[0]);
      console.log("curItemObj=", curItemObj[0]);
      //      handleDeleteItem(id);
    }
  }

  console.log("App currItem=", curItem);
  return (
    <div className="App">
      <Logo />
      <Form onAddItem={handleAddItem} curItem={curItem}>
        {JSON.stringify(curItem)}
      </Form>
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackedChange={handlePackedChange}
        onItemClicked={handleItemClicked}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
