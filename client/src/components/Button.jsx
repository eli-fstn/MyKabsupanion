function Button({ text, BGColor, typography, dimensions, padding, shadow, margin, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-md active:scale-95 transition-transform duration-100 ${BGColor} ${typography} ${dimensions} ${padding} ${shadow} ${margin}`}>{text}</button>
  );
}

export default Button