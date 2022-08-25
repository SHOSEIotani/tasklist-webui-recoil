import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import style from "./app.module.scss";

type Task = {
  id: string;
  name: string;
  done: boolean;
}

const tasksState = atom<Task[]>({
  key: "tasksState",
  default: []
});

const App = () => {
  const [name, setName] = useState<string>("");
  const [tasks, setTasks] = useRecoilState(tasksState);

  useEffect(() => {
    console.log("tasks", tasks);
  });

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={(v) => setName(v.target.value)} />
        <button
          onClick={() => setTasks([...tasks, {id: Math.random().toString(), name, done: false}])}>タスク追加
        </button>
      </div>
      <div>
        {tasks.map(task => (
          <div key={task.id} style={{display: "flex"}}>
            <input type="checkbox" checked={task.done} onChange={() => {
              const tmpTasks = [...tasks];
              tmpTasks.forEach((t, index) => {
                if (t.id === task.id) {
                  const tmpTask = {...task};
                  tmpTask.done = !tmpTask.done;
                  tmpTasks[index] = tmpTask;
                }
              });
              setTasks(tmpTasks);
            }} />
            <p className={style.taskName}>
              {task.name}
            </p>
            <button className={style.removeButton} onClick={() => {
              const tmpTasks = [...tasks].filter((t, index) => {
                return t.id !== task.id;
              });
              setTasks(tmpTasks);
            }}>削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
