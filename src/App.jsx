import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { TasksFormPage, TasksPage } from './pages/index';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<BrowserRouter>
			<div className="bg-zinc-800 w-full h-[100vh]">
				<div className="container mx-auto">
					<Navigation />
					<Routes>
						<Route
							path="/"
							element={<Navigate to={'/tasks'} />}
						/>
						<Route
							path="/tasks"
							element={<TasksPage />}
						/>

						<Route
							path="/tasks-create"
							element={<TasksFormPage />}
						/>
						<Route
							path="/tasks/:id"
							element={<TasksFormPage />}
						/>
					</Routes>
					<Toaster />
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
