import { Link } from 'react-router-dom';

export const Navigation = () => {
	return (
		<div className="flex justify-between py-3">
			<Link
				className="font-bold text-3xl mb-4"
				to={'/tasks'}
			>
				<h1 className="text-white">Tasks App</h1>
			</Link>
			<button className="bg-indigo-500 px-3 py-2 rounded-lg text-white hover:bg-indigo-900 transition-all">
				<Link to={'/tasks-create'}>Create Task</Link>
			</button>
		</div>
	);
};
