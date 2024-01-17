import { useEffect } from "react";
import "./frames.css"
import orange from "../../assets/o2.png";
import blue from "../../assets/b2.png";
import green from "../../assets/g2.png";
import pink from "../../assets/p2.png";
import yellow from "../../assets/y2.png";
import red from "../../assets/r2.png";
import qwirkle from "../../assets/logo2_trans.png";

export function withFrames<P extends JSX.IntrinsicAttributes>(
  Component1: React.ComponentType<P>,
) {
    function WithRoot(props: P) {

        useEffect(() => {
            window.onbeforeunload = () => "";
        });

        return (
            <main>
                <div className="horizontal" style={{ transform: window.innerWidth > 1000 ? "scale(2)" : 'scale(1)' }}>
                    <div className="logos-left">
                        <img src={orange} alt="orange logo" />
                        <img src={green} alt="green logo" />
                        <img src={blue} alt="blue logo" />
                    </div>
                    <div className="vertical">
                        <div className="header">
                            <img src={qwirkle} alt="Qwirkle Scoreboard logo" />
                            {/* <h1>Scoreboard</h1> */}
                        </div>
                        <div className="test">
                            <Component1 {...props}/>
                        </div>
                    </div>
                    <div className="logos-right">
                        <img src={red} alt="red logo" />
                        <img src={yellow} alt="yellow logo" />
                        <img src={pink} alt="pink logo" />
                    </div>
                </div>
            </main>
        );
    }

  return WithRoot;
}