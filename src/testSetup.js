import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

//API mock before all tests
beforeAll(() => server.listen());

//reset after each test
afterEach(() => server.resetHandlers());

//close server after all tests completed
afterAll(() => server.close());
