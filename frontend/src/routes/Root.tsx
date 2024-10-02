import { Link, Outlet } from "react-router-dom";

const Root = () => {
	return (
		<div>
			<div className="navbar flex bg-neutral text-secondary">
				<div className="flex-1">
					<Link to="/home">Fractal Hangman</Link>
				</div>
				<div>
					<Link to="/home">New Game</Link>
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default Root;
