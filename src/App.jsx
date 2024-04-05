import CurrentLocation from "./CurrentLocation";
import Forecast from "./Forecast";
import "./App.css";
function App() {
  return (
    <>
      <main>
        <div className="Container">
          <CurrentLocation />
          <Forecast />
        </div>
      </main>
    </>
  );
}

export default App;
