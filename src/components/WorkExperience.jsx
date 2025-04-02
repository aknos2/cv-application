import Button from "./Button";

export default function WorkSection() {
    return (
        <div className="container">
            <h2>Work Experience</h2>
            <div className="fill company-name">
                <label htmlFor="company-name">Company Name: </label>
                <input type="text" name="company-name" id="company-name"/>
            </div>
            <div className="fill position-title">
                <label htmlFor="position-title">Position:  </label>
                <input type="text" name="position-title" id="position-title"/>
            </div>
            <div className="fill study-date">
                <label htmlFor="date-from">From: </label>
                <input type="date" name="date-from" id="date-from" />
                <label htmlFor="date-to">To: </label>
                <input type="date" name="date-to" id="date-to" />
            </div>
            <div className="fill duties">
                <label htmlFor="duties">Main duties performed:</label>
                <textarea name="duties" id="duties"></textarea>
            </div>
            <Button text="Add"/>
        </div>
    )
}