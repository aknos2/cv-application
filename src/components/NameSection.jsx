import { useState } from 'react'
import '../styles/form.css'
import Button from './Button'
import CustomInput from './CustomInput';
import { useFormSave } from './useFormSave';

export default function NameSection() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

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

    const {
        savedData,
        isEditing,
        showForm,
        showErrors,
        handleSaveButton
    } = useFormSave(null, validateForm);

    const onSaveClick = (e) => {       
        const formData = {firstName, lastName, email, phoneNumber};
        handleSaveButton(e, formData);
        
        if (isEditing && savedData) {
            setFirstName(savedData.firstName);
            setLastName(savedData.lastName);
            setEmail(savedData.email);
            setPhoneNumber(savedData.phoneNumber);
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
            <Button onClick={onSaveClick} text={isEditing ? "Edit" : "Save"}/>
    </form>
    );
}