import { useEffect, useState } from "react";
import { useScoreboard } from "../../hooks/useScoreboard";
import { useNavigate } from "react-router-dom";
import { Player } from "../../redux/slicer";

export function Setup() {
    const { playersGame, insertPlayer, deletePlayer, swapPlayer, isRunning, setIsRunning, finish } = useScoreboard();
    const [hasInput, setHasInput] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");
    const navigate = useNavigate();

    // TODO const addNewPlayer

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === "+") {
                // TODO addNewPlayer by "+"
                e.preventDefault();
                setHasInput(!hasInput);
                setNewPlayerName(""); 
            }
            if ((e.key === "s" || e.key === "S") && !hasInput) {
                e.preventDefault();
                if (isRunning) {
                    finish();
                } else {
                    startGame();
                }
            }
        };
        document.addEventListener("keypress", keyHandler);

        return () => {
          document.removeEventListener("keypress", keyHandler);
        };
    }, [hasInput, isRunning]);

    const deselect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, player: Player) => {
        e.preventDefault();
        deletePlayer(player);
    }

    const up = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault();
        swapPlayer(index);
    }
    
    function handleAddNewPlayerButton(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (hasInput) {
            if (newPlayerName.length > 0) {
                // TODO use addNewPlayer
                if (playersGame.filter(p => p.name === newPlayerName).length === 0) {
                    insertPlayer({
                        name: newPlayerName,
                        gamePoints: 0,
                        turns: 0,
                        gameBiggestTurn: 0,
                    });
                }
                setNewPlayerName("");
                setHasInput(false);
            } else {
                setHasInput(false);
            }
        } else {
            setHasInput(true);
        }
    }

    const startGame = () => {
        setIsRunning(true);
        navigate("/game");
    }
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="button"></th>
                        <th className="name">Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {playersGame.map((p, index) => (
                        <tr key={index}>
                            <td><button onClick={(e) => deselect(e, p)}>✕</button></td>
                            <td className={index % 2 !== 0 ? "name brighter" : "name"}>{p.name}</td>
                            <td>{index > 0 && <button onClick={(e) => up(e, index)}>{"↑"}</button>}</td>
                        </tr>
                    ))}

                    <tr>
                        <td></td>
                        <td>
                            {hasInput &&
                                <form onSubmit={handleAddNewPlayerButton}>
                                    <input name="name" id="name" type="text" autoComplete="off" autoFocus placeholder="Name" 
                                            value={newPlayerName} onChange={e => setNewPlayerName(e.currentTarget.value)}></input>
                                </form>
                            }
                        </td>
                        <td><button onClick={handleAddNewPlayerButton}>+</button></td>
                    </tr>

                </tbody>
            </table>

            <div className="start">
                {playersGame.length > 1 && <button className="start" onClick={startGame}>Spiel starten</button>}
            </div>

        </div>
    )
}