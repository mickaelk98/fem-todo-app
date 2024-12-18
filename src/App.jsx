import logo from "./assets/images/icon-sun.svg";
import cross from "./assets/images/icon-cross.svg";

function App() {
  return (
    <main className="main">
      <div className="container">
        <div className="head">
          <h1>Todo</h1>
          <img src={logo} alt="logo" />
        </div>
        <form className="add-todo" action="">
          <div className="circle"></div>
          <input type="text" placeholder="Create new todo..." />
        </form>
        <div className="todo-container">
          <div className="todo-item">
            <div>
              <div className="circle"></div>
              <p>Read for 1 hour</p>
            </div>
            <img src={cross} alt="cross" />
          </div>
          <div className="todo-item">
            <div>
              <div className="circle"></div>
              <p>10 minutes meditations</p>
            </div>
            <img src={cross} alt="cross" />
          </div>
          <div>
            <p>5 items left</p>
            <p>Clear Completed</p>
          </div>
        </div>
        <ul className="todo-filter">
          <li>All</li>
          <li>Active</li>
          <li>Completed</li>
        </ul>
        <p className="dndText">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;
