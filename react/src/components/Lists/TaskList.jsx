// TaskList.js
import React from 'react';
import { List } from "@material-tailwind/react";
import TaskListItem from './TaskListItem';

export default function TaskList({ tasks, ListItemComponent = TaskListItem }) {
    return (
        <List className="overflow-auto border-[1px] border-gray-300 p-3 m-3 text-xs md:text-md rounded-xl">
            {tasks && tasks.map((task, index) => (
                <ListItemComponent task={task} key={index} />
            ))}
        </List>
    );
}
