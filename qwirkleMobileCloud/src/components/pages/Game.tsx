import { useScoreboard } from "../../hooks/useScoreboard";
import "./game.css"
import { useTurns } from "../../hooks/useTurns";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Game() {
    const { playersGame, activeIndex, incrementActiveIndex, finishSteps, decrementFinishSteps, startFinishSteps, finish } = useScoreboard();
    const { executeTurn, turns, undoLastTurn } = useTurns();
    const [points, setPoints] = useState<string>("");
    const focusRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        window.onbeforeunload = () => "";
    });

    useEffect(() => {
        if (playersGame.length == 0) {
            navigate("/");
        }
    }, [playersGame.length])

    useEffect(() => {
        finishSteps > 0 && setPoints("-");
        focusRef.current?.focus();
    }, [finishSteps]);

    const startFinish = () => {
        // TODO > 60
        if (turns.length > -1) {
            if (finishSteps <= -1 && confirm("Soll das Spiel wirklich abgeschlossen werden?")) {
                startFinishSteps();
            } else if (finishSteps === 0) {
                finish();
            }
        }
        focusRef.current?.focus();
    };

    const keyHandler = (e: KeyboardEvent) => {
        if (e.key === "f" || e.key === "F") {
            e.preventDefault();
            startFinish();
        }
        if (e.key === "b" || e.key === "B") {
            e.preventDefault();
            undoLastTurn();
        }
    };

    useEffect(() => {
        document.addEventListener("keypress", keyHandler);
        return () => {
            document.removeEventListener("keypress", keyHandler);
        };
    }, [turns, finishSteps]);

    const handlePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const num = Number(val);
        if (finishSteps <= -1) {
            if ((num >= 0 && num <= 84) || val === "" || val === "0") {
                setPoints(e.target.value);
            }
        } else {
            if ((num >= -6 && num <= -1) || val === "-") {
                setPoints(e.target.value);
            }
        }
    };

    const sendTurn = (e: any) => {
        e.preventDefault();
        const num = Number(points);
        if (points !== "" && (num >= 0 && num < 85 && finishSteps <= -1) || (finishSteps > 0 && num >= -6 && num < 0)) {
            setPoints("");
            incrementActiveIndex();
            decrementFinishSteps();
            executeTurn(playersGame[activeIndex], num);
        } else {
            if (finishSteps <= -1) {
                setPoints("");
            } else {
                setPoints("-");
            }
        }
    };

    return (
        <div>
            <table className="game" cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Pkt.</th>
                        <th>Max.</th>
                    </tr>
                </thead>
                <tbody>
                    {playersGame.slice()
                            .sort((a, b) => b.gameBiggestTurn - a. gameBiggestTurn)
                            .sort((a, b) => b.gamePoints - a. gamePoints)
                            .map((p, index) => (
                        <tr key={index}>
                            {/* style={{"borderRadius": "var(--border-radius)", "overflow": "hidden", "backgroundColor": "white"}} */}
                            <td className={index % 2 === 0 ? "game-name brighter" : "game-name"}>{p.name}</td>
                            <td className={index % 2 === 0 ? "game-points brighter" : "game-points"}>{p.gamePoints}</td>
                            <td className={index % 2 === 0 ? "game-points-turn brighter" : "game-points-turn"}>{p.gameBiggestTurn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="control">
                <button className="back" onClick={undoLastTurn}>↩</button>
                <button className="finish" onClick={startFinish}>✓</button>
            </div>

            {finishSteps !== 0 &&
                <table className="adder">
                    <tbody>
                        <tr>
                            <td className="name">
                                {playersGame[activeIndex]?.name}:
                            </td>
                            <td className="game-points">
                                <form onSubmit={e => sendTurn(e)}>
                                    <input id="points" value={points} inputMode="numeric" autoFocus ref={focusRef} autoComplete="off" onChange={handlePoints}></input>
                                </form>
                            </td>
                            <td className="add">
                                <button className="add" onClick={sendTurn}>+</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }

        </div>
    )
}
