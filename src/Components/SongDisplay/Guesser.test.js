import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Guesser from "./Guesser";

describe.skip("Guesser", () => {
  test("user submitting incorrect guess triggers display of incorrect feedback", async () => {
    //isCorrect value is stored in parent and passed back to guesser component. Couldn't write test at the parent level as there appears to be a compatibility issue between vitest & react-player package
    const props = {
      isCorrect: false,
      setIsCorrect: vi.fn(),
      currentSong: { name: "mock", image: "fakeImg", preview: "fakePreview" },
    };
    render(<Guesser {...props} />);

    const user = userEvent.setup();

    //user types incorrect TV name
    const input = screen.getByRole("textbox", {
      name: /what\'s your guess\?/i,
    });
    await user.clear(input);
    await user.type(input, "incorrect guess");

    //user submits guess
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    //expect "incorrect" feedback to appear in document
    const feedback = await screen.findByRole("paragraph", {
      name: /feedback/i,
    });
    expect(feedback).toHaveTextContent(/incorrect/i);
  });

  test("user submitting correct guess triggers display of correct feedback", async () => {
    //isCorrect value is stored in parent and passed back to guesser component. Couldn't write test at the parent level as there appears to be a compatibility issue between vitest & react-player package
    const props = {
      isCorrect: true,
      setIsCorrect: vi.fn(),
      currentSong: {
        name: "mockShow",
        image: "fakeImg",
        preview: "fakePreview",
      },
    };
    render(<Guesser {...props} />);

    const user = userEvent.setup();

    //user types correct TV name
    const input = screen.getByRole("textbox", {
      name: /what\'s your guess\?/i,
    });
    await user.clear(input);
    await user.type(input, "mockShow");

    //user submits guess
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    //expect "correct" feedback to appear in document
    const feedback = await screen.findByRole("paragraph", {
      name: /feedback/i,
    });
    expect(feedback).toHaveTextContent(/correct/i);
  });

  test("reveal button shows tv poster....and tv show name????", () => {});
});
