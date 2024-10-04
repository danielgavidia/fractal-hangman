import { useParams } from "react-router-dom";
import Game from "../components/Game";

const RouteGame = () => {
    const { id } = useParams<{ id: string }>();
    console.log(`Route Home Id: ${id}`)

    if (!id) {
        return <div>Error: No game ID provided</div>;
    }
    return (
        <div className="p-4 flex justify-center h-full">
            <Game id={id} />
        </div>
    );
};

export default RouteGame;
