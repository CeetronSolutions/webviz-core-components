// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

global.ResizeObserver = require("resize-observer-polyfill");

configure({ adapter: new Adapter() });
