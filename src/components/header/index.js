import { HeaderWrapper } from "./style";
import Logo from "logo.svg";

const Header = ({ user }) => {
  return (
    <HeaderWrapper>
      <div>Hi, {user.username || user.email}. Welcome to movie hub</div>
      <img alt="logo" src={Logo} />
    </HeaderWrapper>
  );
};

export default Header;
