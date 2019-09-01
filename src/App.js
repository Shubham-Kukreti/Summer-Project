import React,{Component} from 'react';
import './App.css';
import Header from './Header';
import Middle from './Middle';
import Footer from './Footer';
import MiddleLeft from './MiddleLeft';
import Welcome from './Welcome';
class App extends Component {
  render(){
  return (
   <div className="App">
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
