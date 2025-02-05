import { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");

  function handleAddTask() {
    if (text.trim() === "") return; // 빈 문자열 추가 방지
    onAddTask(text);
    setText(""); // 입력 필드 초기화
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
}
