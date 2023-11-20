import { useContext } from "react";
import ReactSlider from "react-slider";
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";
import "./slider.css";

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div style={{ textAlign: "left" }}>
      <label>rounds: {settingsInfo.count}</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.count}
        onChange={(newValue) => settingsInfo.setCount(newValue)}
        min={1}
        max={120}
      />
      <label>work time: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={10}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick = {() => settingsInfo.setShowSettings(false)}/>
      </div>
    </div>
  );
}

export default Settings;
