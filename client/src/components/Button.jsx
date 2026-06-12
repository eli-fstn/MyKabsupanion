function Button({text, BGColor, width, height, onClick}) {
    return(
        <button onClick={onClick} className={`text-white px-6 py-2 rounded-md font-bold text-[1rem] active:scale-95 transition-transform duration-100 ${BGColor} ${width} ${height}`}>{text}</button>
    );
}

export default Button