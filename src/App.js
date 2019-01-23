import React, { Component } from "react";
import "./style.css";
import audio from './beep.mp3';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionMinutes: "25",
      sessionSeconds : '00',
      breakSeconds : '00',
      breakMinutes: "5",
      sessionTimer : 0,
      breakTimer : 0,
      displayedValueMinutes :'25',
      displayedValueSeconds : '00'
    };

    this.startTimer = this.startTimer.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startBreak = this.startBreak.bind(this);
    this.stopBreak = this.stopBreak.bind(this);
  }

 
  startBreak = ()=>{

    let duration = Number(this.state.breakMinutes) * 60 + Number(this.state.breakSeconds);
    let timer =duration , minutes, seconds;
    var id = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.setState({
          breakMinutes : minutes,
          breakSeconds : seconds,
          displayedValueMinutes : minutes,
          displayedValueSeconds : seconds
        })
        if (--timer < 0) {
            timer = duration;
        }
        if(this.state.sessionSeconds === '00' && this.state.sessionMinutes === '00')
        {
          document.getElementById("beep").play();
          this.stopBreak();
          this.reset();

        }
    }.bind(this), 1000);
    this.setState({
      breakTimer : id
    })

  }

  startTimer = () =>{
    let duration = Number(this.state.sessionMinutes) * 60 + Number(this.state.sessionSeconds);
    let timer =duration , minutes, seconds;
    var id = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.setState({
          sessionMinutes : minutes,
          sessionSeconds : seconds,
          displayedValueMinutes : minutes,
          displayedValueSeconds : seconds
        })
        if (--timer < 0) {
            timer = duration;
        }
        if(this.state.sessionSeconds === '00' && this.state.sessionMinutes === '00')
        {
          document.getElementById("beep").play();
          this.stopTimer();
          this.startBreak();
        }
    }.bind(this), 1000);
    this.setState({
      sessionTimer : id
    })
}

  stopTimer = ()=>{

    clearInterval(this.state.sessionTimer);
  }

  reset = () => {
    this.stopTimer();
    this.setState({
      sessionMinutes: "25",
      sessionSeconds : '00',
      breakMinutes: "5",
      breakSeconds : '00',
      displayedValueMinutes : '25',
      displayedValueSeconds : '00'
    });
  };

  stopBreak = ()=>{
    clearInterval(this.state.breakTimer);
  }

  sessionIncrement = () => {
    if (this.state.sessionMinutes < 60) {
      this.setState({
        sessionMinutes: Number(this.state.sessionMinutes) + 1
      });
    }
  };

  sessionDecrement = () => {
    if (this.state.sessionMinutes > 0) {
      this.setState({
        sessionMinutes: Number(this.state.sessionMinutes) - 1
      });
    }
  };

  breakIncrement = () => {
    if (this.state.breakMinutes < 60) {
      this.setState({
        breakMinutes: Number(this.state.breakMinutes) + 1
      });
    }
  };

  breakDecrement = () => {
    if (this.state.breakMinutes > 0) {
      this.setState({
        breakMinutes: Number(this.state.breakMinutes) - 1
      });
    }
  };
  render() {
    return (
      <div
        className="container"
        style={{
          height: `${window.innerHeight}px`
        }}
      >
        <h1 className="title">Podomoro Clock</h1>
        <div className="mainBox">
          <div id="breakContainer" className="box">
            <p id="break-label">Break length</p>
            <div id="imageContainer">
              <img
                src={require("./images/arrow-up.svg")}
                alt="arrow-up"
                className="icon"
                id="break-increment"
                onClick={() => this.breakIncrement()}
              />
              <img
                src={require("./images/arrow-down.svg")}
                alt="arrow-down"
                className="icon"
                id="break-decrement"
                onClick={() => this.breakDecrement()}
              />
              <div
                style={{
                  fontSize: "18px"
                }}
              >
                {this.state.breakMinutes}
              </div>
            </div>
          </div>
          <div id="sessionContainer" className="box">
            <p id="break-label">session length</p>
            <div id="imageContainer">
              <img
                src={require("./images/arrow-up.svg")}
                alt="arrow-up"
                className="icon"
                id="session-increment"
                onClick={() => this.sessionIncrement()}
              />
              <img
                src={require("./images/arrow-down.svg")}
                alt="arrow-down"
                className="icon"
                id="session-decrement"
                onClick={() => this.sessionDecrement()}
              />
              <div
                id="session-length"
                style={{
                  fontSize: "18px"
                }}
              >
                {this.state.sessionMinutes}
              </div>
            </div>
          </div>

          <div id="counter">
            <div id="time-left">{this.state.displayedValueMinutes}:{this.state.displayedValueSeconds}</div>
          </div>
          <div id="controller">
            <img src={require("./images/play.png")} alt="play"  className="icon" id="play" onClick={()=>this.startTimer()}/>
            <img src={require("./images/pause.svg")}  alt ="pause" className="icon" id="pause" onClick={()=>this.stopTimer()}/>
            <img
              src={require("./images/refresh.svg")}
              className="icon"
              id="reset"
              alt="refresh"
              onClick={() => this.reset()}
            />
            <audio ref="audio_tag" src={audio} id="beep" />
              
          </div>
        </div>
      </div>
    );
  }
}

export default App;
