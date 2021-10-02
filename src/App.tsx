import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
