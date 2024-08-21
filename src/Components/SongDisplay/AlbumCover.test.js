import { render, screen } from "@testing-library/react";
import AlbumCover from "./AlbumCover";

describe.skip("AlbumCover", () => {
  test("loading text is displayed while waiting for current song", () => {
    render(<AlbumCover />);
    const loadingText = screen.getByText(/retrieving poster/i);
    expect(loadingText).toBeInTheDocument();
  });

  test("poster rendered with blurred class when isCorrect is false", async () => {
    const currentSong = {
      name: "show name",
      image: "https://image",
      preview: "https://image",
    };

    render(<AlbumCover isCorrect={false} currentSong={currentSong} />);

    const image = screen.getByAltText("tv poster");
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle("filter:blur(1.5rem)");
  });

  test("poster rendered without blurred class when isCorrect is true", () => {
    const currentSong = {
      name: "show name",
      image: "https://image",
      preview: "https://image",
    };

    render(<AlbumCover isCorrect={true} currentSong={currentSong} />);

    const image = screen.getByAltText("tv poster");
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveStyle("filter:blur(1.5rem)");
  });
});
