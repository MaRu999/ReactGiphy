import {action, observable} from "mobx";
import Gif from "./Gif";


export default class Page {
        @observable gifs: Gif[] = [];

        @action addGif(title: string, url: string): void {
                this.gifs.push(new Gif(title, url));
        }
}