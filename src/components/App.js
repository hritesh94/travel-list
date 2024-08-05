import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./stats.js";

export default function App() {
  /* this is how we lift up state.
So, basically what that means
is that whenever multiple sibling components
need access to the same state,
we move that piece of state up
to the first common parent component(here i.e App),*/
  const [items, setItems] = useState([]); //this state here is lifted from form component

  //here👇 we are calculating using the items(i.e from the state or we are using the state variable from([items, setItems] = useState([])) so that means we are deriving from variable so this is why its called deriving state )
  // const numItems = items.length;//but we need it in stats component so we will pass it as a prop

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleClearList() {
    //this👇 window.confirm sends an alert window to confirm the user's decision
    const confirmed = window.confirm(
      "Are you sure you want to delete all item"
    );

    if (confirmed) setItems([]);
  }

  //this👇 will handle the cross/delete button of each item component
  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      {/*                                        this👇 here is what we call child to parent communication basically we want to delete an item but item is child component and setItems lives in App component(i.eparent component) so by passing in the function as a prop we are passing the setItems and now the child will call the function basically telling the parent to do the changes so child to parent communication or inverse data flow (inverse coz in react data only flows from parent to child)  */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///--------------------------All this👇 code has been refactored into seperate files-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function Logo() {
//   return <h1>🏝️Far Away🧳</h1>;
// }

// function Form({ onAddItems }) {
//   //here👇 we are doing controlled elements(lec 73) as to matlab state ko ek jagah pe rakhne ke liye matlab html form mai values hota woh logo ka state DOM mai stored hota jisko access karna so humlog khud se controlled elements bana rhe hai jahan par apne aap state jo hai form ka woh react mai rhega
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   // const [items, setItems] = useState([]);we are lifting the state to the parent component i.e App coz we want the data to flow into "packing list" so it can only be done by "lifting up" to App

//   // function handleAddItems(item) {//moved into app component
//   //   //setItems(items=>items.push())<== we cannot do this coz React is all about immutability and we are mutating the state here
//   //   // setItems(items => [...items, item]);//<--this is the correct way i.e without mutating the original(items)
//   // }

//   /*the technique of controlled elements
// basically consists of three steps.
// So we define a piece of state, like this description here
// then we use that piece of state
// on the element that we want to control.
// So we basically force the element to always take the value
// of this state variable.
// And then finally, of course
// we need to update that state variable.
// And we do so here with the on change handler
// where we then set the description
// to the current value of that input field. */

//   //form elements are very important in react
//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!description) return;

//     //so as we defined description and quantity in useState so we will get the value from these variables only
//     const newItem = { description, quantity, packed: false, id: Date.now() };
//     console.log(newItem);

//     onAddItems(newItem); //handleAddItems();

//     setDescription("");
//     setQuantity(1);
//   }

//   return (
//     <form className="add-form" onSubmit={handleSubmit}>
//       <h3>What do you need for your😍 trip?</h3>
//       <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
//         {/*it can be accessed inside the form element so you can say its a child element of form */}
//         {/* <option value={1}>1</option>
//         <option value={2}>2</option>
//         <option value={3}>3</option> One way of having options is this👆 but we need 20 options so 👇*/}
//         {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
//           <option value={num} key={num}>
//             {num}
//           </option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Item..."
//         value={description}
//         // {/*so here👇 as you can see in value when we set the value={description and and at the useState when its initial value was ='' then non matter whatever we typed in html input in webpage  it was always equal to ''so it didnt show the change so that's why included onChange={setDescription(e.target.value)} to show the changed value and hence by this the state is now controlled by react so that's why react controlled elements } */}
//         onChange={(e) => {
//           setDescription(e.target.value);
//           //so what here is happening is each time we write a new value so the setDescription is updating and rendering the form again and again so this is why we can see each and every text one by one logged in console👇 each time we type a letter inside input field
//           // console.log(e.target.value);
//         }}
//       />
//       <button>Add</button>
//     </form>
//   );
// }

//we are passing in the function👇 to delete but as we need it in item i.e further child so we will pass it again
// function PackingList({ items, onDeleteItem, onToggleItems, onClearList }) {
//   const [sortBy, setSortBy] = useState("input");

//   let sortedItems;
//   if (sortBy === "input") sortedItems = items;
//   if (sortBy === "description")
//     sortedItems = items
//       .slice()
//       .sort((a, b) => a.description.localeCompare(b.description));
//   if (sortBy === "packed")
//     sortedItems = items
//       .slice()
//       .sort((a, b) => Number(a.packed) - Number(b.packed));
//   return (
//     <div className="list">
//       <ul>
//         {/* {items.map((item) => (           <--- Previously we used items array but now we want to sort so we will use now sortedItems*/}
//         {sortedItems.map((item) => (
//           <Item
//             item={item}
//             key={item.id}
//             //  👇 passing it again to item
//             onDeleteItem={onDeleteItem}
//             onToggleItems={onToggleItems}
//           />
//         ))}
//       </ul>
//       <div className="actions">
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="input">Sort by input order</option>
//           <option value="description">Sort by description</option>
//           <option value="packed">Sort by packed status</option>
//         </select>
//         <button onClick={onClearList}>Clear list</button>
//       </div>
//     </div>
//   );
// }

// function Item({ item, onDeleteItem, onToggleItems }) {
//   return (
//     <li>
//       <input
//         type="checkbox"
//         value={item.packed}
//         onChange={() => onToggleItems(item.id)}
//       />
//       <span style={item.packed ? { textDecoration: "line-through" } : {}}>
//         {item.quantity} {item.description}
//       </span>
//       {/*                recieving it here👇  and also calling it as an arrow coz we need to pass in the id otherwise it will just pass in the synthetic event if we do like this onClick ={onDeleteItem}*/}
//       <button onClick={() => onDeleteItem(item.id)}>❌</button>
//       {/*                           manually 👆passing in the item from arguments/param */}
//     </li>
//   );
// }
// function Stats({ items }) {
//   if (!items.length)
//     return (
//       <p className="stats">
//         <em>Start adding some items to your packing list 🚀</em>
//       </p>
//     );
//   const numItems = items.length;
//   const numPacked = items.filter((item) => item.packed).length;
//   const percentage = Math.round((numPacked / numItems) * 100);
//   return (
//     <footer className="stats">
//       <em>
//         {percentage === 100
//           ? "You got everything! Ready to go ✈"
//           : `💼You have ${numItems} items on your list, and you already packed
//         ${numPacked} (${percentage}%)`}
//       </em>
//     </footer>
//   );
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//NOte---To attain different result from each reused component use different state