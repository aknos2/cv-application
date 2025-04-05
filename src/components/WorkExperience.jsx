import { useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";

export default function WorkSection() {
    const [companyName, setCompanyName] = useState("");
    const [positionTitle, setPositionTitle] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [duties, setDuties] = useState("");

    return (
        <div className="container">
            <h2>Work Experience</h2>

            <div className="fill company-name">
                <CustomInput
                    label="Company Name:"
                    type="text"
                    id="company-name"
                    name="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
            </div>

            <div className="fill position-title">
                <CustomInput
                    label="Position:"
                    type="text"
                    id="position-title"
                    name="position-title"
                    value={positionTitle}
                    onChange={(e) => setPositionTitle(e.target.value)}
                />
            </div>

            <div className="fill study-date">
                <CustomInput
                    label="From:"
                    type="date"
                    id="date-from"
                    name="date-from"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
                <CustomInput
                    label="To:"
                    type="date"
                    id="date-to"
                    name="date-to"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                />
            </div>

            <div className="fill duties">
                <label htmlFor="duties">Main duties performed:</label>
                <textarea
                    name="duties"
                    id="duties"
                    value={duties}
                    onChange={(e) => setDuties(e.target.value)}
                />
            </div>

            <Button />
            <Button text="+" id="add-btn"/>
        </div>
    );
}
