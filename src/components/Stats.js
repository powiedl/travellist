export default function Stats({ items }) {
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
