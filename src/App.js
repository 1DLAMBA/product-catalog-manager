import logo from './logo.svg';
import './App.css';
import Tables from './components/table';
import { ApiProvider } from './services/apiContext';



function App() {
  return (
    <div className="App">
      <ApiProvider>
        < Tables />
      </ApiProvider>
    </div>
  );
}

export default App;
