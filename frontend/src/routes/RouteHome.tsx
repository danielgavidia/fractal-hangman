import { useNavigate } from "react-router-dom";

const RouteHome = () => {
	const navigate = useNavigate();
	return (
		<div>
			<button onClick={() => navigate("/game")}>Go to game</button>
		</div>
	);
};

export default RouteHome;
