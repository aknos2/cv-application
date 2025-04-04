function CustomInput({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  id, 
  name, 
  placeholder, 
  error, 
  showError = false,
}) {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    onChange ({
      target: {
        value: newValue,
        name,
        id,
      },
    })
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleInputChange}
          style={{ width: '100%' }}
          aria-invalid={showError && error ? true : false}
          placeholder={placeholder}
        />
        {showError && error && <spam className="error-message">{error}</spam>}

    </>
  );
}

export default CustomInput;
