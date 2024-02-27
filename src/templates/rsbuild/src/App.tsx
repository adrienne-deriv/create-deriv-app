import derivLogo from "./static/deriv-logo.svg";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <a href="https://deriv.com" target="_blank">
        <img src={derivLogo} className="w-[100px] h-[100px]" alt="Deriv logo" />
      </a>
      <h1 className="text-5xl font-bold">Deriv V2</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}

export default App;
