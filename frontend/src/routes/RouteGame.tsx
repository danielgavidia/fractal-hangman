import Game from "../components/Game";
// import { useLocation } from "react-router-dom";

const RouteGame = () => {
    // const location = useLocation();
    // const { word } = location.state || {};

    return (
        <div className="p-4 flex justify-center">
            <Game />
        </div>
    );
};

export default RouteGame;
