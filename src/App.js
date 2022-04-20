import "./App.css";
import Navbar from "./components/Navbar";
import WordDefinitionsAPI from "./components/WordDefinitionsAPI";
import { AlertProvider } from "./components/context/alert/AlertContext";

function App() {
  return (
    <>
      <Navbar />
      <AlertProvider>
        <WordDefinitionsAPI />
      </AlertProvider>
    </>
  );
}

export default App;
