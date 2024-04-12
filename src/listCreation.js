import { Button } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";

const products = [
  { title: "Avatar", isFruit: false, id: 1 },
  { title: "Avengers", isFruit: false, id: 2 },
  { title: "Coco", isFruit: false, id: 3 },
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
