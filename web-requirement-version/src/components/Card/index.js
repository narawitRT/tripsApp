import styled from 'styled-components';

const Card = styled.div`
  border: 0px;
  margin-bottom: 0px;
  padding: 75px 0px;

  @media only screen and (max-width: 870px) {
    border-left: none;
    border-right: none;
    padding: 75px 15px;
  }
`;

export default Card;