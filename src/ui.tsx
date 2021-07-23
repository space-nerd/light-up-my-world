import React from 'react';
import './App.css'
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { blue } from '@material-ui/core/colors';
import { Slider } from '@material-ui/core';
const Govee = require("node-govee-led");
let mac = "1d:e7:7c:a6:b0:13:b8:e9"

const Client = new Govee({
	apiKey: "8a17da1f-c1e9-4a1d-8295-6b1360595bb6",
	mac: `${mac}`,
	model: "H6003"
});

const currentColor = '#0000ff'
const black = "#000000"

const angle = 90
  
  const gradient = "linear-gradient(" + angle + "deg, " + black + ", " + currentColor + ")";
  
  document.body.style.background = gradient;

const LightSwitch = withStyles({
  switchBase: {
    color: blue[300],
    '&$checked': {
      color: blue[500],
    },
    '&$checked + $track': {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const PowerSwitch = withStyles({
  switchBase: {
    color: blue[300],
    '&$checked': {
      color: blue[500],
    },
    '&$checked + $track': {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const BrightnessSlider = withStyles({
  root: {
    width: 300,
  },
})(Slider)

export default function UI() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChangeLight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked === true) {
      let mac = "1d:e7:7c:a6:b0:13:b8:e9"
    } else if (event.target.checked === false) {
      let mac = "75:b5:7c:a6:b0:13:ba:9e"
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked === true) {
        Client.turnOn()
    } else if (event.target.checked === false) {
        Client.turnOff()
    }
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <div className="ui">
      <FormControlLabel
          control={<PowerSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="On/Off"
          labelPlacement="bottom" />
      <FormControlLabel
      control={<LightSwitch checked={state.checkedB} onChange={handleChangeLight} name="checkedB" />}
      label="Lamp | Desk"
      labelPlacement="bottom" />
      <BrightnessSlider
        defaultValue={75}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={25}
        marks
        min={0}
        max={100}
        className="brightness"
      />
    </div>
  );
}


