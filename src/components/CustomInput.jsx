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
      <label htmlFor={id}><span className='highlight-word'>{label}</span></label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleInputChange}
          style={{ width: '100%' }}
          aria-required="true"
          aria-invalid={showError && error ? true : false}
          placeholder={placeholder}
        />
        {showError && error && <span className="error-message">{error}</span>}

    </>
  );
}

export default CustomInput;
