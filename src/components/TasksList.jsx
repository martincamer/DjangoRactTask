import { getAllTask } from '../api/tasks.api';
import { useEffect, useState } from 'react';
import { TaskCard } from './TaskCard';

export const TasksList = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		async function loadTasks() {
			const res = await getAllTask();
			setTasks(res.data);
		}

		loadTasks();
	}, []);
	return (
		<div className="grid grid-cols-3 gap-3">
			{tasks.map(task => (
				<TaskCard
					task={task}
					key={task.id}
				/>
			))}
		</div>
	);
};
