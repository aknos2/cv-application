export default function Button({ 
    color = "var(--button-font-color)", 
    backgroundColor = "var(--button-background-color)",
    text = "Save", 
    type = "button", 
    ariaLabel = "Save", 
    onClick 
}) {
    const buttonStyle = {
        color: color,
        "background-color": backgroundColor
    };

    return (
        <button 
            style={buttonStyle} 
            type={type} 
            aria-label={ariaLabel} 
            onClick={onClick}
        >
            {text}
        </button>
    );
}
