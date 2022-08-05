const Button = ({ onFetch }) => {
  return (
    <button onClick={onFetch} type="button">
      Load more
    </button>
  );
};
export default Button;
