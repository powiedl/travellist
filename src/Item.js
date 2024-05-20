export default function Item({
  item,
  onDeleteItem,
  onPackedChange,
  onItemClicked,
}) {
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
