import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";
// https://deckofcardsapi.com/api/deck/${deck_id}/draw/

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getdata = this.getdata.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}new/shuffle`);
    this.setState({ deck: deck.data });
  }
  async getdata() {
    try {
      let deck_id = this.state.deck.deck_id;
      let cardUrl = `${API_BASE_URL}${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      console.log(cardRes.data);
      if (!cardRes.data.success) {
        throw new Error("out of card");
      }
      let card = cardRes.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            card: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (error) {
      alert(error);
    }
  }
  render() {
    let cards = this.state.drawn.map((c) => (
      <Card key={c.id} image={c.image} name={c.card} />
    ));
    return (
      <div>
        <h1 className='Deck-title'>Card Deck</h1>
        <button className='Deck-btn' onClick={this.getdata}>
          Click
        </button>
        <div className='Deck'>{cards}</div>
      </div>
    );
  }
}
