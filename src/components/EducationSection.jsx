import { useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";

export default function EducationSection() {
    const [schoolName, setSchoolName] = useState("");
    const [studyField, setStudyField] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    return (
        <form className="container">
            <h2>Education</h2>

            <div className="fill school-name">
                <CustomInput
                    label="School Name:"
                    type="text"
                    id="school-name"
                    name="school-name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                />
            </div>

            <div className="fill study-field">
                <CustomInput
                    label="Field:"
                    type="text"
                    id="study-field"
                    name="study-field"
                    value={studyField}
                    onChange={(e) => setStudyField(e.target.value)}
                />
            </div>

            <div className="fill study-date">
                <CustomInput
                    label="From:"
                    type="month"
                    id="date-from"
                    name="date-from"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
                <CustomInput
                    label="To:"
                    type="month"
                    id="date-to"
                    name="date-to"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                />
            </div>

            <Button text="+" id="add-btn"/>
            <Button />

        </form>
    );
}
