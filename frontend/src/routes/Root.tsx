import { Link, Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="bg-neutral-content">
            <div className="navbar flex bg-neutral text-neutral-content p-6">
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
