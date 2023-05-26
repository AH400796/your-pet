import styled from 'styled-components';

export const Burger = styled.div`
  z-index: 100;
  @media (min-width: 1279px) {
    display: none;
  } 
`;

// backdrop
export const Box = styled.div`
  display: none;

  @media (max-width: 1279px) {
    display: inherit;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform cubic-bezier(0.39, 0.575, 0.565, 1);
    flex-flow: column;
    background-color: ${props => props.theme.colors.white};
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    padding: 22px 20px 22px 20px;
    z-index: 99;
    position: fixed;       
  }
`;
export const BoxNav = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  padding-bottom: 219px;

  @media screen and (${props => props.theme.media.md}){
    padding-top: 160px;
  }
`;
export const BoxUser = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 82px;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    display: none;
  }
  @media (min-width: 1279px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;