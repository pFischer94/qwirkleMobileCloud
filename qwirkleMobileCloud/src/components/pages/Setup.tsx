import { useEffect, useRef, useState } from "react";
import { useScoreboard } from "../../hooks/useScoreboard";
import { useNavigate } from "react-router-dom";
import { Player } from "../../redux/slicer";

export function Setup() {
    const { playersGame, insertPlayer, deletePlayer, swapPlayer, isRunning, setIsRunning } = useScoreboard();
    const [hasInput, setHasInput] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");
    const focusRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const addNewPlayer = () => {
        if (playersGame.findIndex(p => p.name.toLowerCase() === newPlayerName.toLowerCase()) == -1) {
            insertPlayer({
                name: newPlayerName.charAt(0).toUpperCase() + newPlayerName.substring(1),
                gamePoints: 0,
                turns: 0,
                gameBiggestTurn: 0,
            });
        }
    }

    const handleNewPlayerInput = () => {
        if (newPlayerName.length > 0) {
            addNewPlayer();
            setNewPlayerName("");
        }
        setHasInput(!hasInput);
        setNewPlayerName(""); 
    }
    
    const handleAddNewPlayerButton = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        handleNewPlayerInput();
        focusRef.current?.focus();
    }

    const startGame = () => {
        handleNewPlayerInput();
        if (playersGame.length > 1) {
            setIsRunning(true);
            navigate("/game");
        }
    }

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === "+") {
                e.preventDefault();
                handleNewPlayerInput();
            }
            var nameInput = focusRef.current;
            let inputIsFocused: boolean = (document.activeElement === nameInput);
            if (e.key === "#" || (!inputIsFocused && (e.key === "s" || e.key === "S") /* && !hasInput */ )) {
                e.preventDefault();
                startGame();
            }
        };
        document.addEventListener("keypress", keyHandler);

        return () => {
          document.removeEventListener("keypress", keyHandler);
        };
    }, [ /* hasInput */ , isRunning, newPlayerName, document.activeElement]);

    const deselect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, player: Player) => {
        e.preventDefault();
        deletePlayer(player);
        focusRef.current?.focus();
    }

    const up = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault();
        swapPlayer(index);
        focusRef.current?.focus();
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="button"></th>
                        <th className="name">Spieler:in</th>
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
                            {/* {hasInput && */}
                                <form onSubmit={handleAddNewPlayerButton} className="cursor">
                                    <input name="name" id="name" type="text" autoComplete="off" autoFocus ref={focusRef} placeholder="Name" 
                                            value={newPlayerName} onChange={e => setNewPlayerName(e.currentTarget.value)}></input>
                                </form>
                            {/* } */}
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