import katex from "katex";
import {MathExpression} from "mathjs";
import * as math from "mathjs";
import React from "react";

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

export default Math;