import React, { useContext } from "react";
import TaskContext from "../contexts/TaskContext";
import TaskColumn from "../components/Columns/TaskColumn";

export default function Tasks() {
    const { state } = useContext(TaskContext);

    const sortTasksByPriority = (tasks) => {
        return tasks.sort((a, b) => {
            const priorityOrder = ['high', 'medium', 'low'];
            return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        });
    }

    const notStartedTasks = sortTasksByPriority(state.filter(task => task.state === 'not_started'));
    const inProgressTasks = sortTasksByPriority(state.filter(task => task.state === 'in_progress'));
    const doneTasks = sortTasksByPriority(state.filter(task => task.state === 'done'));

    return (
        <div className="flex flex-col md:flex-row justify-center items-start h-auto font-montserrat mt-[30px]">
            <TaskColumn title="Not Started" id="not_started" tasks={notStartedTasks}/>
            <TaskColumn title="In Progress" id="in_progress" tasks={inProgressTasks}/>
            <TaskColumn title="Done" id="done" tasks={doneTasks}/>
        </div>
    );
    
}
