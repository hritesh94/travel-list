import { useState } from "react";
export default function Form({ onAddItems }) {
  //here👇 we are doing controlled elements(lec 73) as to matlab state ko ek jagah pe rakhne ke liye matlab html form mai values hota woh logo ka state DOM mai stored hota jisko access karna so humlog khud se controlled elements bana rhe hai jahan par apne aap state jo hai form ka woh react mai rhega
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]);we are lifting the state to the parent component i.e App coz we want the data to flow into "packing list" so it can only be done by "lifting up" to App

  // function handleAddItems(item) {//moved into app component
  //   //setItems(items=>items.push())<== we cannot do this coz React is all about immutability and we are mutating the state here
  //   // setItems(items => [...items, item]);//<--this is the correct way i.e without mutating the original(items)
  // }

  /*the technique of controlled elements
  basically consists of three steps.
  So we define a piece of state, like this description here
  then we use that piece of state
  on the element that we want to control.
  So we basically force the element to always take the value
  of this state variable.
  And then finally, of course
  we need to update that state variable.
  And we do so here with the on change handler
  where we then set the description
  to the current value of that input field. */

  //form elements are very important in react
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    //so as we defined description and quantity in useState so we will get the value from these variables only
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem); //handleAddItems();

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {/*it can be accessed inside the form element so you can say its a child element of form */}
        {/* <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option> One way of having options is this👆 but we need 20 options so 👇*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        // {/*so here👇 as you can see in value when we set the value={description and and at the useState when its initial value was ='' then non matter whatever we typed in html input in webpage  it was always equal to ''so it didnt show the change so that's why included onChange={setDescription(e.target.value)} to show the changed value and hence by this the state is now controlled by react so that's why react controlled elements } */}
        onChange={(e) => {
          setDescription(e.target.value);
          //so what here is happening is each time we write a new value so the setDescription is updating and rendering the form again and again so this is why we can see each and every text one by one logged in console👇 each time we type a letter inside input field
          // console.log(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
