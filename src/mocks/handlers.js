import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http//localhost:5174", () => {
    return HttpResponse.json({
      playlistName: "playlist name",
      tracks: [
        {
          name: "show name",
          image: "https://image",
          preview: "https://image",
        },
        {
          name: "show name",
          image: "https://image",
          preview: "https://image",
        },
        {
          name: "show name",
          image: "https://image",
          preview: "https://image",
        },
      ],
    });
  }),
];
