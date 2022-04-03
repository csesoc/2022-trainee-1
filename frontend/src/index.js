import React from 'react';
import ReactDOM from 'react-dom';
import Particles from "react-tsparticles";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

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
        "value": "#ade8f4"
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
    <App />
    <Particles params={ParticlesParams} />
  </React.StrictMode>,
  document.getElementById('root')
);


