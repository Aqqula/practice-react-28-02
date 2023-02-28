import React, { Component } from "react";
import styles from "./Counter.module.css";

const minMS = 1000;
const maxMS = 5000;

const maxTime = 10;

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: true,
      count: 0,
      MS: 1000,
      iaAuto: false,
      time: new Date(0, 0, 0, 0, 0, 0, 0),
    };
    this.idInterval = null;
    this.idIntervalTimer = null;
  }

  handleCalcCount = () => {
    const { isAdd } = this.state;
    this.setState((state, props) => {
      return {
        count: isAdd ? state.count + props.step : state.count - props.step,
      };
    });
  };

  handleChangeMod = () => {
    const { isAdd } = this.state;
    this.setState({ isAdd: !isAdd });
  };

  handleClick = ({ target: { value } }) => {
    if (value >= minMS && value <= maxMS) {
      this.setState({ MS: Number(value) });
    }
  };

  autoClick = () => {
    this.setState((state, props) => {
      const newCount = state.count + props.step;
      return { count: newCount };
    });
  };

  start = () => {
    const { MS } = this.state;
    this.idInterval = setInterval(this.autoClick, MS);
  };

  startTimer = () => {
    if (this.idIntervalTimer === null) {
      this.idIntervalTimer = setInterval(this.tick, 1000);
    }
  };

  tick = () => {
    this.setState((state, props) => {
      const { time } = state;
      const newTime = new Date(time.getTime());
      newTime.setSeconds(newTime.getSeconds() + 1);
      return { time: newTime };
    });
  };

  componentDidMount() {
    if (this.idInterval === null) {
      this.start();
    }
    this.startTimer();
  }
  componentDidUpdate() {
    const { time } = this.state;
    if (time.getSeconds() === maxTime) {
      clearInterval(this.idInterval);
      clearInterval(this.idIntervalTimer);
      this.idInterval = null;
      this.idIntervalTimer = null;
      this.setState({ time: new Date(0, 0, 0, 0, 0, 0, 0) });
    }
  }

  render() {
    const { isAdd, count, MS, time } = this.state;
    return (
      <div className={styles.container}>
        <p>{time.toLocaleTimeString("en-GB")}</p>
        <h1>Counter: {count}</h1>
        <button className={styles.btn} onClick={this.handleCalcCount}>
          {isAdd ? "Add" : "Sub"}
        </button>
        <button className={styles.btn} onClick={this.handleChangeMod}>
          change mod
        </button>
        <br />
        <input
          className={styles.input}
          type="number"
          value={MS}
          onChange={this.handleClick}
          step="500"
        />
        <button className={styles.btn} onClick={this.start}>
          Auto Click
        </button>
        <p className={styles.p}>Set ms: {MS}</p>
      </div>
    );
  }
}

export default Counter;
