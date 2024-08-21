import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SongDisplay from "./SongDisplay";

const contextValue = {
  playlistName: "playlist name",
  tracks: [
    {
      name: "MOCKSHOW",
      image: "https://fakeimage",
      preview: "https://fakepreview",
    },
  ],
};

describe("AlbumCover", () => {
  test("loading text is displayed while waiting for current song", async () => {
    act(() => {
      render(<SongDisplay {...contextValue} />);
    });

    const loadingText = screen.getByText(/retrieving poster/i);
    expect(loadingText).toBeInTheDocument();
  });

  test("poster is initially rendered with blurred class", async () => {
    act(() => {
      render(<SongDisplay {...contextValue} />);
    });

    const image = screen.getByAltText(/tv poster/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle("filter:blur(1.5rem)");
  });
});

describe.skip("guessing flow", () => {
  test("poster is revealed & positive feedback displayed when correct guess is submitted", async () => {
    //setup
    act(() => {
      render(<SongDisplay {...contextValue} />);
    });
    const user = userEvent.setup();

    waitFor(async () => {
      //user types correct guess - MOCKSHOW
      const input = screen.getByRole("textbox", {
        name: /what\'s your guess\?/i,
      });
      await user.clear(input);
      await user.type(input, "MOCKSHOW");

      //user submits guess
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      //expect image to not be blurred
      const image = await screen.findByAltText("tv poster");
      expect(image).toBeInTheDocument();
      expect(image).not.toHaveStyle("filter:blur(1.5rem)");

      //expect "correct" feedback to be displayed
      const feedback = await screen.findByRole("paragraph", {
        name: /feedback/i,
      });
      expect(feedback).toHaveTextContent(/correct/i);
    });
  });

  test("poster remains blurred & negative feedback displayed when incorrect guess is submitted", async () => {
    //setup
    act(() => {
      render(<SongDisplay {...contextValue} />);
    });
    const user = userEvent.setup();

    waitFor(async () => {
      //user types incorrect guess
      const input = screen.getByRole("textbox", {
        name: /what\'s your guess\?/i,
      });
      await user.clear(input);
      await user.type(input, "INCORRECT-GUESS");

      //user submits guess
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      //expect image to be blurred
      const image = await screen.findByAltText("tv poster");
      expect(image).toBeInTheDocument();
      expect(image).toHaveStyle("filter:blur(1.5rem)");

      //expect "incorrect" feedback to be displayed
      const feedback = await screen.findByRole("paragraph", {
        name: /feedback/i,
      });
      expect(feedback).toHaveTextContent(/incorrect/i);
    });
  });
});

describe.skip("reveal", () => {
  test("clicking reveal button reveals the tv poster", async () => {
    //setup
    act(() => {
      render(<SongDisplay {...contextValue} />);
    });
    const user = userEvent.setup();

    //user clicks reveal button
    const revealBtn = screen.getByRole("button", { name: /reveal song/i });
    await user.click(revealBtn);

    //expect poster to not have blurred class
    const image = await screen.findByAltText("tv poster");
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveStyle("filter:blur(1.5rem)");
  });
});
