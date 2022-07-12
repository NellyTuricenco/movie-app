import style from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={style.container}>
      <h1 className={style.title}>Movie aplication</h1>
    </header>
  );
};

export default Header;
