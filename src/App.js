import "./App.css";
import { createPoll, uploadPollOptions, getPollOptions,
  closePolls,
  isPollOpen,
} from "./firestore";
import { Button } from "react-bootstrap";
import List from "./List";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Navigate } from "react-router-dom";

const products = [
  { title: "Avatar", id: 1 },
  { title: "Avengers", id: 2 },
  { title: "Coco", id: 3 },
];
const enumValue = (name) => Object.freeze({toString: () => name});

const PollSections = Object.freeze({
  Create : enumValue("PollSections.Create"),
  AddOption : enumValue("PollSections.AddOption"),
  HomePage : enumValue("PollSections.HomePage"),
  Voting : enumValue("PollSections.Voting"),
  Results : enumValue("PollSections.Results")
})

const pollContext = React.createContext({
  poll: "",
  setPoll: (poll) => {}
});

function App() {
  
  const [shortPollCode, setShortPollCode] = useState("");
  const [openPoll, setOpen] = useState(true);
  const createPoll = async () => {
    try {
      createPoll();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {});
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
        <Poll></Poll>
        <div>{openPoll ? <p>It's open</p> : <p> It's closed</p>}</div>
        <DndProvider backend={HTML5Backend}>
          <List />
        </DndProvider>
      </div>
  );
}


function Header() {
  const appTitle = "Ranked Choice Voting";
  return (
    <header className="header">
      <div className="logo">
        <h1>{appTitle}</h1>
      </div>
    </header>
  );
}

function Poll() {
  const [currentSection, setCurrentSection] = useState(PollSections.HomePage);
  const [pollCode, setPollCode] = useState("")
  return (
    <pollContext.Provider value={[pollCode, setPollCode]}>
    <div>
      <h1> Poll </h1>
      <h3> {pollCode}</h3>
      {currentSection===PollSections.HomePage ? <HomePage setCurrentSection = {setCurrentSection}/> : null}
      {currentSection===PollSections.Create ? <PollCreation setCurrentSection = {setCurrentSection}/> : null}
      {currentSection===PollSections.AddOption ? <AddOption setCurrentSection = {setCurrentSection}/> : null}
      {currentSection===PollSections.Voting ? <PollVoting setCurrentSection = {setCurrentSection}/> : null}
      {currentSection===PollSections.Results ? <PollResults setCurrentSection = {setCurrentSection}/> : null}
    </div>
    </pollContext.Provider>
  );
}

function HomePage({setCurrentSection}) {
  const enterPoll = async () => {
    try {
      console.log("hello world");
      setCurrentSection(PollSections.Voting);
    } catch (error) {
      console.log(error);
    }
  };

  function createPoll(){
    setCurrentSection(PollSections.Create);
  }

  return (
    <div>
      <h1> Home Page</h1>
      {/* use flex to make it inline */}
      <Button className="button" onClick={createPoll}>Create A Poll </Button>
      <Button className="button" onClick={enterPoll}>Enter A Poll </Button>
    </div>
  );
}

function EnterPoll({setCurrentSection}) {
  function handleSubmit(event) {
    setCurrentSection(PollSections.AddOption)
    console.log(event.value);
  }
  return (
    <div>
      <h1> Enter Poll</h1>
      <form className="fact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Poll Code"
        />
        <button className="btn btn-large">Enter</button>
      </form>
    </div>
  );
}

function PollCreation({setCurrentSection}) {
  const [pollCode, setPollCode] = React.useContext(pollContext);
  function createPoll(){
    setCurrentSection(PollSections.AddOption);
    setPollCode(generateCode());
  }

  function generateCode(){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return ( 
    <>
    <h1> Poll Creation</h1>
    <button className="btn btn-large" onClick={createPoll}>Create poll</button>
    </>
  );
}

function AddOption({setCurrentSection}) {
  const [options, setOptions] = useState([]);
  const [text, setText] = useState("");
  const listItems = options.map((product) => (
    <li key={product.id}>{product.value}</li>
  ));

  const addOption = async () => {
    setCurrentSection(PollSections.Voting);
    // try {
    //   uploadPollOptions("shortPollCode", ["JAMES d"]);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  function handleSubmit(event) {
    console.log("running");
    setOptions([options, { value: text, id: options.length + 1 }]);
  }
  return (
    <>
      <h1>Add Option</h1>
      <div>
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
      <Button className="button" onClick={addOption}> Close</Button>
      </div>
    </>
  );
}

function PollVoting({setCurrentSection}) {
  function submitVotes() {
    setCurrentSection(PollSections.Results);
  }
  return ( 
    <>
      <h1> Poll Voting</h1>
      <Button className="button" onClick={submitVotes}> Submit Votes</Button>
    </>
  );
}

function PollResults({setCurrentSection}) {
  return ( 
    <>
      <h1> Poll Results</h1>
    </>
  );
}


export default App;
