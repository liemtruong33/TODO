// src/App.tsx
import React from "react";
import TaskList from "./components/Tasklist";

const App: React.FC = () => {
  return (
    <div>
      <h1>To-Do List</h1>
      <TaskList />
    </div>
  );
};

export default App;
