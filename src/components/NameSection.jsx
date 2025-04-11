import { useEffect, useState } from "react";
import "../styles/form.css";
import Button from "./Button";
import CustomInput from "./CustomInput";
import { useFormSave } from "./useFormSave";

export default function NameSection({ onSave, initialData }) {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    initialData?.phoneNumber || "",
  );
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
      setEmail(initialData.email || "");
      setPhoneNumber(initialData.phoneNumber || "");
    }
  }, [initialData]);

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
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
      newErrors.firstName = "First name accepts only letters and no space";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(lastName)) {
      newErrors.lastName = "Last name accepts only letters and no space";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return !Object.values(newErrors).some((error) => error);
  };

  const { savedData, isEditing, showForm, showErrors, handleSaveButton } =
    useFormSave(null, validateForm);

  const [isSaved, setIsSaved] = useState(false);

  const onSaveClick = (e) => {
    const formData = { firstName, lastName, email, phoneNumber };
    handleSaveButton(e, formData);

    if (validateForm()) {
      onSave(formData);

      setIsSaved(true);
    }

    if (isEditing && savedData) {
      setFirstName(savedData.firstName);
      setLastName(savedData.lastName);
      setEmail(savedData.email);
      setPhoneNumber(savedData.phoneNumber);
      setIsSaved(false);
    }
  };

  return (
    <div className={`container ${isSaved ? "saved" : ""}`}>
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
              autocomplete="given-name"
            />
            <CustomInput
              label="Last Name:"
              id="last-name"
              name="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              showError={showErrors}
            />
          </div>
          <div className="fill email">
            <CustomInput
              label="Email: "
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              showError={showErrors}
              autocomplete="off"
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
                if (value === "" || /^[\d-]+$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
              placeholder="12345678901"
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
                <p>
                  <span className="highlight-word">First Name</span>:{" "}
                  {savedData.firstName}
                </p>
                <p>
                  <span className="highlight-word">Last Name</span>:{" "}
                  {savedData.lastName}
                </p>
              </div>
              <div>
                <p>
                  <span className="highlight-word">Email</span>:{" "}
                  {savedData.email}
                </p>
                <p>
                  <span className="highlight-word">Phone</span>:{" "}
                  {savedData.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        )
      )}
      <Button onClick={onSaveClick} text={isEditing ? "Edit" : "Save"} />
    </div>
  );
}
