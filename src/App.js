import './App.css';
import CurrencyExchanger from './containers/CurrencyExchanger/CurrencyExchanger'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Switch>              
            <Route path="/" exact component ={CurrencyExchanger} />  
        </Switch>
    </div>
  );
}

export default App;
