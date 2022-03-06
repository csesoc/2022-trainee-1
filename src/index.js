import React from 'react';
import ReactDOM from 'react-dom';
import Particles from "react-tsparticles";

import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ParticlesParams = {
  "particles": {
      "number": {
        "value": 100,
        "density": {
            "enable": true,
            "value_area": 500
        }
      },
      "color": {
        "value": "#ffbf69"
      },
      "move": {
        "enable": true,
        "direction": "none",
        "speed": 0.8,
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      },
      "size": {
        "value": 2
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      }
  },
  "interactivity": {
      "events": {
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      }
  },
  "retina_detect": true
}

ReactDOM.render(
  <React.StrictMode>
    <Particles
          params={ParticlesParams} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


