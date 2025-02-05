import { useReducer } from "react";
import AddTask from "./AddTask.jsx";
import TaskList from "./TaskList.jsx";

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(taskreducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  function taskreducer(tasks, action) {
    switch (action.type) {
      case "added": {
        return [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            done: false,
          },
        ];
      }

      case "changed": {
        return tasks.map((task) => {
          if (task.id === action.task.id) {
            return action.task;
          } else {
            return task;
          }
        });
      }

      case "deleted": {
        return tasks.filter((task) => task.id !== action.id);
      }
      default: {
        throw Error("Unknown Action" + action.type);
      }
    }
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
