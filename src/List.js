import update from 'immutability-helper'
import { useCallback, useState, useEffect } from 'react'
import { Card } from './Card.js'
import { getPollOptions } from './firestore.js';
const style = {
  width: 400,
}

export default function List(){
    const [cards, setCards] = useState([]);
    const getPoll = async () => {
      try {
        // let temp = await getPollOptions("OEWX");
        // let newTemp = temp.map((x, index) => ({id: index, text: x}));
        // setCards(newTemp);
        // console.log(cards);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=> {
      // getPoll();
    });
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      )
    }, [])
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
