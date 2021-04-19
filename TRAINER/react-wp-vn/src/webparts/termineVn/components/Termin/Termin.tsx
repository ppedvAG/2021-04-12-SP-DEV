import * as React from "react";

export default function Termin(propsInFkn: { datum: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) {
    return (
        <li>
            <h2>{propsInFkn.datum}</h2>
            <p>{propsInFkn.title}</p>
        </li>
    );
}