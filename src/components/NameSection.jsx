import { useState } from 'react'
import '../styles/form.css'
import Button from './Button'
import CustomInput from './CustomInput';

export default function NameSection() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [savedData, setSavedData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });
    const [showErrors, setShowErrors] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\d+$/;
        return phoneRegex.test(phone);
    };

    const validateName = (firstName) => {
        const firstNameRegex = /^[a-zA-Z]{2,20}$/;
        return firstNameRegex.test(firstName);
    }


    const validateForm = () => {
        const newErrors = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        };

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }
    
        if (!phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!validatePhoneNumber(phoneNumber)) {
            newErrors.phoneNumber = "Phone number should contain only digits";
        }

        if (!firstName) {
            newErrors.firstName = "First name is required";
        } else if (!validateName(firstName)) {
            newErrors.firstName = "First name accepts only letters and no space"
        }

        if (!lastName) {
            newErrors.lastName = "Last name is required";
        } else if (!validateName(lastName)) {
            newErrors.lastName = "Last name accepts only letters and no space"
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return !Object.values(newErrors).some(error => error);
    };

    function handleSaveButton(e) {       
        e.preventDefault(); 
        
        if (!isEditing) {
            setShowErrors(true);

            const isValid = validateForm();
            if (!isValid) {
                return;
            }

            // We're in "Save" mode - save the data and switch to view mode
            setSavedData({
                firstName,
                lastName,
                email,
                phoneNumber
            });
            setShowForm(false); // Hide form, show saved data
            setIsEditing(true); // Next button click will be "Edit"
            setErrors(false);
        } else {
            // We're in "Edit" mode - switch back to form view with saved values
            setShowForm(true); // Show form again
            setIsEditing(false); // Next button click will be "Save"
            
            // Load the saved values into the form fields
            if (savedData) {
                setFirstName(savedData.firstName);
                setLastName(savedData.lastName);
                setEmail(savedData.email);
                setPhoneNumber(savedData.phoneNumber);
            }
        }
    }


    return (
        <form className="container">
            {showForm ? (
                <>
                <div className="fill name">
                <CustomInput 
                    label="First Name:"
                    id="first-name"
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={errors.firstName}
                    showError={showErrors}
                    required
                />
                <CustomInput 
                    label="Last Name:"
                    id="last-name"
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={errors.lastName}
                    showError={showErrors}
                    required
                />
            </div>
            <div className="fill password">
                <CustomInput
                    label="Email: "
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    showError={showErrors}
                />
            </div>
            <div className="fill phone-number">
                <CustomInput
                    label="Phone Number: "
                    type="tel"
                    id="phone-number" 
                    name="phone-number"
                    value={phoneNumber}
                    error={errors.phoneNumber}
                    showError={showErrors}
                    //filter letters or space
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[\d-]+$/.test(value)) {
                            setPhoneNumber(value);
                        }
                    }}
                    placeholder="123-4567-8901"
                    required
                />
            </div>
            </>
        ) : (
            savedData && (
                <div className="saved-data-container">
                    <h3>Saved Information</h3>
                    <div className="saved-info name-section">
                        <div>
                            <p>First Name: {savedData.firstName}</p>
                            <p>Last Name: {savedData.lastName}</p>
                        </div>
                        <div>
                            <p>Email: {savedData.email}</p>
                            <p>Phone: {savedData.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            )
        )}
            <Button onClick={handleSaveButton} text={isEditing ? "Edit" : "Save"}/>
    </form>
    );
}