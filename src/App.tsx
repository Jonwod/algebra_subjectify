import React, {useState} from 'react';
import './App.css';
import * as math from 'mathjs';
import katex from 'katex';
import {MathExpression} from "mathjs";
import Math from "./Math";

const operations = ['-', '+', '*', '/'] as const;
type Operation = typeof operations[number];

function App() {
    const target_var = 'y';
    const rhs = "2xy - x^2";
    const lhs = "(3/2)x^2";

    const [pendingOperation, setPendingOperation] = useState<null | Operation>(null);
    const [operand, setOperand] = useState("");

    return (
        <div className="App">
            <p className="instruction">Make {target_var} the subject</p>
            <p className="equation">
                <Math.Equation lhs={lhs} rhs={rhs}/>
            </p>
            <div className='buttonRow'>
                {operations.map((operation) => (
                    <div
                        className={"operatorButton" + (operation === pendingOperation ? ' pending' : '')}
                        onClick={() => setPendingOperation(operation)}
                    >
                        <Math.Latex>{operation}</Math.Latex>
                    </div>
                ))}
            </div>
            <input type="text" value={operand} onChange={(event) => setOperand(event.target.value)}
                   onKeyDown={(event) => {
                       if (event.code === "Enter") {
                           setOperand("");
                           setPendingOperation(null);
                           console.log("FDSJKLJKALFJLKSAFJASFLKJA");
                       }
                   }}/>
        </div>
    );
}

export default App;
