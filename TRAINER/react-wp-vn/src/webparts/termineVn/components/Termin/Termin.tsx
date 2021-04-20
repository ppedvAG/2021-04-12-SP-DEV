import * as React from "react";
import { ITermin } from "../../TermineVnWebPart";

export default function Termin(propsInFkn: ITermin) {
    return (
        <li>
            {/* <h2>{typeof propsInFkn.Datum}</h2>// string */}
            <h2>{(propsInFkn.Datum as Date).toLocaleDateString()}</h2>
            <p>{propsInFkn.Title}</p>
        </li>
    );
}