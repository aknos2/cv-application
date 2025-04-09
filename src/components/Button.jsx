export default function Button({ 
    color = "var(--button-font-color)", 
    backgroundColor = "var(--button-background-color)",
    text = "Save", 
    type = "submit", 
    ariaLabel = "Save", 
    onClick, 
    id = "",
    className = "",
    tabIndex
}) {
    const buttonStyle = {
        color: color,
        backgroundColor: backgroundColor  
    };

    return (
        <button 
            style={buttonStyle} 
            type={type} 
            aria-label={ariaLabel} 
            onClick={onClick}
            id={id}
            className={className}
            tabIndex={tabIndex}  
        >
            {text}
        </button>
    );
}