import { useState } from "react";

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  function handleSave() {
    onChange({
      ...task,
      text: editedText,
    });
    setIsEditing(false);
  }

  function handleCheckboxChange() {
    onChange({
      ...task,
      done: !task.done,
    });
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
