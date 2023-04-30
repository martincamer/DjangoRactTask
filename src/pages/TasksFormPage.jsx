import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const TasksFormPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const navigate = useNavigate();
	const params = useParams();

	const onSubmit = handleSubmit(async data => {
		if (params.id) {
			await updateTask(params.id, data);
			toast.success('Tarea Actualizada', {
				position: 'bottom-right',
				style: {
					background: '#101010',
					color: '#ffff',
				},
			});
		} else {
			await createTask(data);
			toast.success('Tarea creada', {
				position: 'bottom-right',
				style: {
					background: '#101010',
					color: '#ffff',
				},
			});
		}
		navigate('/tasks');
	});

	useEffect(() => {
		async function loadTask() {
			if (params.id) {
				const {
					data: { title, description },
				} = await getTask(params.id);
				setValue('title', title);
				setValue('description', description);
			}
		}
		loadTask();
	}, []);

	return (
		<div className="max-w-xl mx-auto">
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="title"
					{...register('title', { required: true })}
					className="bg-zinc-700 p-3 rounded-lg block w-full mb-3 text-white"
				/>

				{errors.title && <span>title is required</span>}

				<textarea
					rows={'3'}
					placeholder={'Description'}
					{...register('description', { required: true })}
					className="bg-zinc-700 p-3 rounded-lg block w-full mb-3 text-white"
				></textarea>

				{errors.description && <span>description is required</span>}

				<button className="bg-indigo-500 px-3 py-2 rounded-lg text-white hover:bg-indigo-900 transition-all block w-full">
					Save
				</button>
			</form>

			{params.id && (
				<div className="flex justify-end">
					<button
						className="bg-red-400 px-3 py-2 rounded-lg text-white hover:bg-red-900 transition-all mt-3 block w-full"
						onClick={async () => {
							const accepted = window.confirm('Estas seguro');
							if (accepted) {
								await deleteTask(params.id);

								toast.success('Tarea Eliminada', {
									position: 'bottom-right',
									style: {
										background: '#101010',
										color: '#ffff',
									},
								});

								navigate('/tasks');
							}
						}}
					>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};
