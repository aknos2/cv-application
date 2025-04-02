import Button from "./Button";

export default function EducationSection() {
    return (
        <div className="container">
            <h2>Education</h2>
            <div className="fill school-name">
                <label htmlFor="school-name">School Name: </label>
                <input type="text" name="school-name" id="school-name"/>
            </div>
            <div className="fill study-field">
                <label htmlFor="study-field">Field:  </label>
                <input type="text" name="study-field" id="study-field"/>
            </div>
            <div className="fill study-date">
                <label htmlFor="date-from">From: </label>
                <input type="month" name="date-from" id="date-from" />
                <label htmlFor="date-to">To: </label>
                <input type="month" name="date-to" id="date-to" />
            </div>
            <Button text="Add" />
        </div>
    )
}