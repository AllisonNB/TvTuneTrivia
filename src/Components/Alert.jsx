import { styled } from "styled-components";

const AlertContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  padding: 1rem;
  background-color: white;
  z-index: 1000;
  border-radius: 10px;

  & h1 {
    text-align: center;
  }

  & button {
    margin-top: 2%;
    background-color: #264653;
    color: white;
    border: 2px solid #264653;
    border-radius: 5px;
    font-weight: 600;
    font-size: 1.2rem;
  }

  & button:hover {
    background-color: #e76f51;
    border: 2px solid #e76f51;
  }
`;

const Alert = ({ hideAlert }) => {
  return (
    <AlertContainer>
      <h1>Important</h1>
      <p>
        This website originally used spotify&#8217;s 30s audio preview. Spotify
        no longer offers this and I am reworking this website to utilize
        Spotify's Webplayback SDK instead.
      </p>
      <button onClick={hideAlert}>Okay</button>
    </AlertContainer>
  );
};

export default Alert;
