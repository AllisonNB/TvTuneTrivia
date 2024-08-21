import { render, screen } from "../test-utils/testing-library-utils";
import Playlists from "./Playlists";

const contextValue = {
  playlistName: "playlist name",
  tracks: [
    {
      name: "show name",
      image: "https://fakeimage",
      preview: "https://fakepreview",
    },
  ],
};

describe("playlist sidebar", () => {
  test("displays title of playlist from API call", async () => {
    render(<Playlists />, { contextValue });
    const playlistTitle = await screen.findByRole("listitem");
    expect(playlistTitle).toHaveTextContent("playlist name");
  });
});
