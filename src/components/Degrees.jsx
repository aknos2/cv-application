import { useState } from "react";
import Button from "./Button";

export default function DegreesSection() {
    const [degreeRows, setDegreeRows] = useState([]);

    function addDegreeRow() {
        setDegreeRows([...degreeRows, crypto.randomUUID()]);
    }

    function deleteDegreeRow(id) {
        setDegreeRows(degreeRows.filter(degreeId => degreeId !== id));
    }

    return (
        <div className="container">
            <h2>Degrees</h2>
            <div className="fill degrees">
                <label htmlFor="degrees-0">Degrees (if any applicable): </label>
                <Button className="add-btn" onClick={addDegreeRow} aria-label="add more" text="+"/>
            </div>

            {degreeRows.map((id) => (
                <div key={id} className="fill degrees">
                    <label htmlFor={`degrees-${id}`}>Degree: </label>
                    <input type="text" name={`degrees-${id}`} id={`degrees-${id}`} />
                    <Button aria-label="delete" onClick={() => deleteDegreeRow(id)} text="x"/>
                </div>
            ))}

            <Button text="Save" aria-label="save"/>
        </div>
    );
}
