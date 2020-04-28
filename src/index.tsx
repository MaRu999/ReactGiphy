import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from "./components/App";
import Giphyloader from "./model/Giphyloader";

export const loader = new Giphyloader();

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App loader={loader}/>, wrapper) : false;
