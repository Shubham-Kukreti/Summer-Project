import React,{Component} from 'react';
import './App.css';
import Header from './Header';
import Middle from './Middle';
import Footer from './Footer';
import MiddleLeft from './MiddleLeft';
import Welcome from './Welcome';
import Particles from 'react-particles-js';
class App extends Component {
  render(){
  return (
   <div className="App">
      {/* <Particles 
      params={{
        "particles": {
            "number": {
                "value": 50
            },
            "size": {
                "value": 3
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                }
            }
        }
    }}
      /> */}
      <Welcome />
      <Header />
      <div id="middlePart">
     <MiddleLeft />
     <Middle />
      </div>
      <Footer />

    </div>
  );
  }
}

export default App;
