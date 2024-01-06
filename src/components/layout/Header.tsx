import styled from "@emotion/styled";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo>Realtime-Air</HeaderLogo>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  position: fixed;
  padding: 1rem 0 0 1rem;
  z-index: 5;
`;

const HeaderLogo = styled.h4`
  color: #fff;
  font-size: 2em;
`;
