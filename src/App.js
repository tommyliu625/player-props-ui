import './App.css';
import { HomePage } from './ui/HomePage';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function App() {
  return (
    // <ChakraProvider>
      <div className="App">
        <HomePage />
      </div>
    // </ChakraProvider>
  );
}

export default App;
