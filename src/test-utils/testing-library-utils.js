import { render } from "@testing-library/react";
import { PlaylistContext } from "../store/PlaylistContext";


const customRender = (ui, { contextValue, ...options }) => {
  return render(
    <PlaylistContext.Provider value={contextValue}>
      {ui}
    </PlaylistContext.Provider>,
    options
  );
};

//re-export evertying - so you can import other functions from this file
export * from "@testing-library/react";

//override render method
export { customRender as render };
