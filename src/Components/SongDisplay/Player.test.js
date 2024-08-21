import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Player from "./Player";

describe.skip("Player", () => {
  test("user pressing play button triggers player", async () => {
    const props = {
      currentSong: { name: "mock", image: "fakeImg", preview: "fakePreview" },
      player: { url: "mockurl", isPlaying: false, volume: 0.5 },
    };
    render(<Player {...props} />);
    const user = userEvent.setup;

    const button = screen.getByRole("button", { name: /play song/i });
  });
});
