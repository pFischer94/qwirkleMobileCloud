import { useEffect, useState } from "react";
import { useScoreboard } from "../hooks/useScoreboard";
import { useNavigate } from "react-router-dom";

export function Setup() {
    const { playersGame, insertPlayer, isRunning, setIsRunning, finish } = useScoreboard();
    const [hasInput, setHasInput] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");
    const navigate = useNavigate();

    const startGame = () => {
        setIsRunning(true);
        navigate("/game");
    }

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
    }, [hasInput]);
    
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
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {playersGame.map((p, index) => (
                        <tr key={index}>
                            <td><button>✕</button></td>
                            <td className="name">{p.name}</td>
                            <td>{index > 0 && <button>{"↑"}</button>}</td>
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
                {playersGame.length > 1 && !isRunning && <button>Spiel starten</button>}
            </div>

        </div>
    )
}