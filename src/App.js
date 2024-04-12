import "./App.css";
import {
  createPoll,
  uploadPollOptions,
  getPollOptions,
  closePolls,
  isPollOpen,
} from "./firestore";
import { Button } from "react-bootstrap";
import List from "./List";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const products = [
  { title: "Avatar", id: 1 },
  { title: "Avengers", id: 2 },
  { title: "Coco", id: 3 },
];

function App() {
  const [shortPollCode, setShortPollCode] = useState("OEWX");
  const [pollOptions, setPollOptions] = useState([]);
  const [openPoll, setOpen] = useState(true);
  const createPoll = async () => {
    try {
      createPoll();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {});

  const addOption = async () => {
    try {
      uploadPollOptions(shortPollCode, ["JAMES d"]);
    } catch (error) {
      console.log(error);
    }
  };
  const isOpen = async () => {
    try {
      setOpen(await isPollOpen(shortPollCode));
    } catch (error) {
      console.log(error);
    }
  };
  const closePoll = async () => {
    try {
      closePolls(shortPollCode);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadVotes = async () => {
    try {
      uploadVotes();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <p>Ranked Choice Voting</p>
      <HomePage />
      <Button onClick={addOption}> Add Option</Button>
      <Button onClick={closePoll}> Close the poll</Button>

      <ListCreation></ListCreation>

      {/* <Button onClick={getPoll}> Get Polls</Button> */}

      <div>{openPoll ? <p>It's open</p> : <p> It's closed</p>}</div>
      <DndProvider backend={HTML5Backend}>
        <List />
      </DndProvider>
    </div>
  );
}

function Header() {
  const appTitle = "Voting App";

  return (
    <header className="header">
      <div className="logo">
        <h1>{appTitle}</h1>
      </div>
    </header>
  );
}
function HomePage() {
  const enterPoll = async () => {
    try {
      console.log("hello world");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* use fliex to make it inline */}
      <Button className="button" onClick={createPoll}>Create A Poll </Button>
      <Button className="button" onClick={enterPoll}>Enter A Poll </Button>
    </div>
  );
}

function DisplayResults() {}

function ListCreation() {
  const [options, setOptions] = useState([]);
  const [text, setText] = useState("");
  const listItems = options.map((product) => (
    <li key={product.id}>{product.value}</li>
  ));

  function handleSubmit(event) {
    console.log("running");
    setOptions([options, { value: text, id: options.length + 1 }]);
  }
  return (
    <>
      <div>
        <h1>Poll CODE</h1>
        <ul>{listItems}</ul>
        <form className="fact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Submit an option"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button className="btn btn-large">Post</button>
        </form>
      </div>
    </>
  );
}

export default App;
