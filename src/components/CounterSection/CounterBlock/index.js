import React, { Component } from "react";
import Counter from "../Counter";
import styles from "./CounterBlock.module.css";

const minStep = 1;
const maxStep = 1000000;


class CounterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: minStep,
    };
  }

  handleInput = ({ target: { value } }) => {
    if (value >= minStep && value < maxStep) {
      this.setState({ step: Number(value) });
    }
  };


  render() {
    const { step } = this.state;
    return (
      <div className={styles.container}>
        <Counter step={step} />
        <br />
        <br />
        <input
          className={styles.input}
          type="number"
          value={step}
          onChange={this.handleInput}
        />
        <p className={styles.p}>Current step: {step}</p>
      </div>
    );
  }
}

export default CounterBlock;
