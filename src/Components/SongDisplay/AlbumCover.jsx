import styled from "styled-components";

const Album = styled.div`
  align-self: center;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & h2 {
    text-align: center;
    color: #fefae0;
  }

  & img {
    width: 100%;
    height: auto;
    filter: ${(props) => (props.$iscorrect ? undefined : "blur(1.5rem);")};
  }

  @media (max-width: 600px) {
    max-width: 150px;
    height: 150px;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    max-width: 200px;
    height: 200px;
  }

  @media (min-width: 1025px) {
    width: 300px;
    height: 300px;
  }
`;

export default function AlbumCover({ isCorrect, currentSong }) {
  return (
    <Album
      $iscorrect={isCorrect}
      aria-label="Tv Poster"
      tabIndex="0"
      role="image"
    >
      {currentSong ? (
        <img src={currentSong.image} alt="tv poster" />
      ) : (
        <h2 tabIndex="0">retrieving poster...</h2>
      )}
    </Album>
  );
}
