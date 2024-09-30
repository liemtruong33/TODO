// src/components/TaskList.tsx
import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

// Define GraphQL query to get tasks
const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

// Define GraphQL mutation to create a task
const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      completed
    }
  }
`;

const TaskList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  const handleAddTask = async () => {
    const title = prompt("Enter task title");
    if (title) {
      await createTask({ variables: { title } });
    }
  };

  return (
    <div>
      <ul>
        {data.tasks.map((task: any) => (
          <li key={task.id}>
            {task.title} {task.completed ? "(Completed)" : ""}
          </li>
        ))}
      </ul>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskList;
