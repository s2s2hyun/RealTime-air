import styled from "@emotion/styled";

const Footer = () => {
  return (
    <FooterWarpper>
      <FooterTitle>Copyright © 2024 Donghyun. All rights reserved.</FooterTitle>
    </FooterWarpper>
  );
};

export default Footer;

const FooterWarpper = styled.div`
  position: fixed;
  bottom: 2vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const FooterTitle = styled.p`
  color: #fff;
  font-size: 1em;
`;
