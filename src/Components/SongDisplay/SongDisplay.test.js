import { render, screen, act } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import SongDisplay from "./SongDisplay";




// ************************************************************************************
// The issue I am running into is related to finding the poster. It seems that only the first test can find the poster element and then any subseqent tests that are supposed to find the poster, are unable to. If run only one test suite and skip the rest, then the first test in that suite passes. So the issue seems to do something with finding the poster multiple times across these different tests.
// ************************************************************************************


//this test suite only passes if these two tests are written in this order. Not sure why the order would be impacting the abilty for these tests to pass. I tried using findBy... vs. getBy..., which didn't seem to make a difference.  
describe("AlbumCover", () => {
  test("poster is initially rendered with blurred class", async () => {
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
    act(() => {
      render(<SongDisplay />, { contextValue });
    });

    const image = await screen.findByAltText(/tv poster/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle("filter:blur(1.5rem)");
  });

  test("loading text is displayed while waiting for current song", async () => {
    const contextValue = {
      playlistName: null,
      tracks: [
        {
          name: null,
          image: null,
          preview: null,
        },
      ],
    };
    act(() => {
      render(<SongDisplay />, { contextValue });
    });

    const loadingText = screen.getByText(/retrieving poster/i);
    expect(loadingText).toBeInTheDocument();
  });
});


//I tried using waitFor here, but it was causing false positives. The first test in this suite passes if the above test suite is skipped.I tried using findBy... vs. getBy..., which didn't seem to make a difference.  
describe("guessing flow", () => {
  test("poster is revealed & positive feedback displayed when correct guess is submitted", async () => {
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

    //setup
    act(() => {
      render(<SongDisplay />, { contextValue });
    });
    const user = userEvent.setup();

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
    const image = await screen.findByAltText(/tv poster/i);
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveStyle("filter:blur(1.5rem)");

    //expect "correct" feedback to be displayed
    const feedback = await screen.findByRole("paragraph", {
      name: /feedback/i,
    });
    expect(feedback).toHaveTextContent(/correct/i);
  });

  test("poster remains blurred & negative feedback displayed when incorrect guess is submitted", async () => {
    //setup
    act(() => {
      render(<SongDisplay {...contextValue} />);
    });
    const user = userEvent.setup();

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
    const image = await screen.findByAltText(/tv poster/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle("filter:blur(1.5rem)");

    //expect "incorrect" feedback to be displayed
    const feedback = await screen.findByRole("paragraph", {
      name: /feedback/i,
    });
    expect(feedback).toHaveTextContent(/incorrect/i);
  });
});


//this test passes if the tests above are skipped
describe("reveal", () => {
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
    const image = await screen.findByAltText(/tv poster/i);
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveStyle("filter:blur(1.5rem)");
  });
});
