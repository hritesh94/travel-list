export default function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/*                recieving it here👇  and also calling it as an arrow coz we need to pass in the id otherwise it will just pass in the synthetic event if we do like this onClick ={onDeleteItem}*/}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      {/*                           manually 👆passing in the item from arguments/param */}
    </li>
  );
}
