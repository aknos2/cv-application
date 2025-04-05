import { useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { addRow, deleteRow } from "./AddDeleteRows";

export default function DegreesSection() {
    const [degreeRows, setDegreeRows] = useState([]);

    return (
        <div className="container">
            <h2>Degrees</h2>

            <div className="fill degrees">
                <label htmlFor="degrees-0">Degrees (if any applicable): </label>
                <Button type="button" className="add-btn" onClick={() => addRow(setDegreeRows, degreeRows)} aria-label="add more" text="+"/>
            </div>

            {degreeRows.map((id) => (
                <div key={id} className="fill degrees">
                    <CustomInput
                        label="Degree:"
                        type="text"
                        id={`degrees-${id}`}
                        name={`degrees-${id}`}
                        aria-required="false"
                    />
                    <Button aria-label="delete" onClick={() => deleteRow(setDegreeRows, degreeRows, id)} text="x"/>
                </div>
            ))}

            <Button text="Save" aria-label="save"/>
        </div>
    );
}
