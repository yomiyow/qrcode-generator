function Button({ type = 'button', children, onDownload }) {
  return (
    <button
      className={`
        border-2 border-green-600 rounded 
        bg-green-500 hover:bg-green-600
        px-4 py-0.5
        text-base text-white
      `}
      onClick={onDownload}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
