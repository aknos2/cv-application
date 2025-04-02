export default function CustomInput({label, type ="text", value, onChange}) {
    return (
        <div>
          <label>{label}</label>
          <input
            type={type}
            value={value}
            onChange={onChange}
          />
        </div>
      );
  }