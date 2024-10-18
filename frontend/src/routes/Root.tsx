import { Link, Outlet } from "react-router-dom";

const Root = () => {
	return (
		<div className="bg-neutral-content h-screen w-full flex flex-col justify-center items-center">
			<div className="navbar flex bg-neutral text-neutral-content p-6 fixed top-0 w-full left-0 z-10">
				<div className="flex-1">
					<Link to="/home">Fractal Hangman</Link>
				</div>
				<div>
					<Link to="/home">Home</Link>
				</div>
			</div>
			<div className="pt-20 p-2 h-full w-5/6 max-w-screen-sm">
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
