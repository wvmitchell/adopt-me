import { createRoot } from "react-dom";
import Pet from "./Pet";

const App = function () {
  return(
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Luna" animal="Dog" breed="Havanese" />
      <Pet name="Apollo" animal="Dog" breed="Mutt" />
      <Pet name="Hudson" animal="Dog" breed="Lab" />
    </div>
  )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
