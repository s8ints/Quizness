import { configure } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
afterEach(cleanup);
// Pages load on demand, which can take a moment the first time on a busy machine.
configure({ asyncUtilTimeout: 5000 });
