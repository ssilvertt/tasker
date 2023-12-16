// utils.js

export function filterTasksByPriority(tasks, priority) {
    return tasks.filter((task) => task.priority === priority);
}

export function getMessage(
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks
) {
    if (highPriorityTasks.length > 0) {
        return "Hey, let's tackle the high priority tasks first!";
    } 
    else {
        return "No tasks available. Why not start a new one?";
    }
}
