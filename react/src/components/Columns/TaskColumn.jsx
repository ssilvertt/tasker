import React, { useContext } from "react";
import Task from "../Task";

function TaskColumn({ title, id, tasks }) {
    return (
        <div className="w-full md:w-1/4 bg-task-grey p-4 rounded shadow mx-2">
            <h2 className="font-semibold mb-2">{title}</h2>
            <div id={id} className="space-y-2">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
    
}

export default TaskColumn;
