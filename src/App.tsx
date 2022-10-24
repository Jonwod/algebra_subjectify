import React, {useState} from 'react';
import './App.css';
import * as math from 'mathjs';
import katex from 'katex';
import {MathExpression} from "mathjs";

const operations = ['-', '+', '*', '/'] as const;
type Operation = typeof operations[number];

namespace Math {
    export const Latex = ({children} : {children: string}) => (
        <span
            dangerouslySetInnerHTML={{__html: katex.renderToString(children)}}
        />
    );

    export const Expression = ({children} : {children: MathExpression}) => (
        <Latex>{math.parse(children).toTex()}</Latex>
    );

    export const Equation = ({lhs, rhs}:  {lhs: MathExpression, rhs: MathExpression}) => (
        <div style={{width: "100%", height: "100%"}}>
            <Expression>{lhs}</Expression>
            <Latex>=</Latex>
            <Expression>{rhs}</Expression>
        </div>
    );
}





function App() {
    const target_var = 'y';
    const rhs = "2xy - x^2";
    const lhs = "(3/2)x^2";

    const [pendingOperation, setPendingOperation] = useState<null | Operation>(null);

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
                        dangerouslySetInnerHTML={{__html: katex.renderToString(operation)}}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
