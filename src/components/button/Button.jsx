import s from './Button.module.css';

const Button = ({ onFetch }) => {
  return (
    <button className={s.button} onClick={onFetch} type="button">
      Load more
    </button>
  );
};
export default Button;
