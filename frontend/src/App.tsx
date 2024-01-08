import List from "./List";
import Spinner from "./Spinner";

function App() {
  return (
    <div className="d-flex flex-column">
      <h1 className="mx-auto my-3">Welcome Spinners!</h1>
      <div className="d-flex flex-wrap m-auto">
        <List />
      </div>
    </div>
  );
}

export default App;
