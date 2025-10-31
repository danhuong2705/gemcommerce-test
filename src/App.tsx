import { ValueControl } from "./components/ValueControl";

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-96 bg-neutral-800 p-4 rounded-lg flex items-center justify-center">
        <ValueControl />
      </div>
    </div>
  );
};

export default App;
