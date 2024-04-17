import { Button } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";

const products = [
  { title: "Avatar", id: 1 },
  { title: "Avengers", id: 2 },
  { title: "Coco", id: 3 },
];

function addOption() {
  console.log("omg i hit it");
}

export default function ListCreation() {
  const [options, setOptions] = useState("");
  const listItems = products.map((product) => (
    <li key={product.id}>
      {product.title}
    </li>
  ));
  return (
    <>
      <div>
        <ul>{listItems}</ul>
        <label>
          New Option: <input name="newOption" />
        </label>
        <Button onClick={addOption()}>Add</Button>
      </div>
    </>
  );
}
