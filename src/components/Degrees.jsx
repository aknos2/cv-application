import { useState } from "react";
import CustomInput from "./CustomInput";
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
                <Button type="button" className="add-btn" onClick={addDegreeRow} aria-label="add more" text="+"/>
            </div>

            {degreeRows.map((id) => (
                <div key={id} className="fill degrees">
                    <CustomInput
                        label="Degree:"
                        type="text"
                        id={`degrees-${id}`}
                        name={`degrees-${id}`}
                    />
                    <Button aria-label="delete" onClick={() => deleteDegreeRow(id)} text="x"/>
                </div>
            ))}

            <Button text="Save" aria-label="save"/>
        </div>
    );
}
