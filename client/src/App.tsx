import { MapInstanceProvider } from "./contexts/MapInstanceProvider";

function App() {
  return (
    <div className="mx-auto flex flex-col gap-6 items-center justify-center">
      <MapInstanceProvider />
    </div>
  );
}

export default App;
