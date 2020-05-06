import React, { Component } from 'react';
import './Card.css';
// transform: translate(10px, 20px) rotate(10deg)
export default class Card extends Component {
	constructor(props) {
		super(props);
		let angle = Math.random() * 45;
		let xpos = Math.random() * 45;
		let ypos = Math.random() * 45;
		this._transform = `translate(${xpos}px, ${ypos}px) rotate(${angle}deg)`;
	}
	render() {
		return (
			<div>
				<img
					style={{ transform: this._transform }}
					className='Card'
					src={this.props.image}
					alt={this.props.name}
				/>
			</div>
		);
	}
}
