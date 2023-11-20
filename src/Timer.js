import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import ResetButton from "./ResetButton";
import BeepSound from './assets/beep-3.wav';
import BoopSound from './assets/finished.wav';

const red = "#f54e4e";
const green = "#4aec8c";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [roundsLeft, setRoundsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const roundsLeftRef = useRef(roundsLeft);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function resetClock() {
    secondsLeftRef.current = 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  function roundDone() {
    roundsLeftRef.current--;
    setRoundsLeft(roundsLeftRef.current);
    console.log(roundsLeftRef.current);
  }

  function resetAll(){
    roundsLeftRef.current = settingsInfo.count;
    setRoundsLeft(roundsLeftRef.current);
    resetClock()
    setIsPaused(true);
    isPausedRef.current = true;
  }

  function beep() {
   let s = new Audio(BeepSound)
   s.play()
  }

  function boop() {
   let s= new Audio(BoopSound)
   s.play()
  }

  useEffect(() => {
    roundsLeftRef.current = settingsInfo.count;
    setRoundsLeft(roundsLeftRef.current);
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (roundsLeftRef.current === 0 && secondsLeftRef.current === 0) {
        resetAll()
        boop()
        return;
      }

      if (secondsLeftRef.current === 0) {
        beep()
        resetClock();
        return roundDone();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = settingsInfo.workMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: green,
          tailColor: "rgba(255, 255, 255, .2)",
        })}
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        Rounds Left: {roundsLeft}
      </div>
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center"}}>
        <div>
          {isPaused ? (
            <PlayButton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
        </div>
        <div>
            <ResetButton
              onClick={() => {
                resetAll();
              }}
            />
\
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
