import {action, observable} from "mobx";
import Page from "./Page";

export default class Giphyloader {
    @observable searchPageNum = 0;
    @observable currentSearchPage: Page;
    @observable currentTrendingPage: Page;
    @observable searchPagesMaxNum = 0;
    @observable trendingPageNum = 0;
    @observable trendingPagesMaxNum = 0;
    @observable loading = false;
    currentSearchTerm = "";
    apiKey = "api_key=T0TrV6WnhVeyIHnMKkzL2KdQpQlu8eCJ";
    urlBaseSearch = "http://api.giphy.com/v1/gifs/search?"
    urlBaseTrending = "http://api.giphy.com/v1/gifs/trending?"

    @action newSearch(searchTerm: string, offset: number): void {
        this.searchPageNum = 0;
        this.search(searchTerm, offset);
    }

    @action newGetTrending(offset: number): void {
        this.trendingPageNum = 0;
        this.getTrending(offset);
    }

    @action search(searchTerm: string, offset: number): void {
        this.loading = true;
        this.currentSearchTerm = searchTerm;
        const currentPage = new Page();
        fetch(this.urlBaseSearch + "q=" + searchTerm + "&" + this.apiKey + "&offset=" + offset)
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.data.length - 1; i++) {
                    currentPage.addGif(json.data[i].title, json.data[i].images.original.url);
                }
                this.setMaxNum("search", json.pagination.total_count);
            })
            .then(() => this.loading = false);
        this.currentSearchPage = currentPage;
    }

    @action getTrending(offset: number): void {
        this.loading = true;
        const currentPage = new Page();
        fetch(this.urlBaseTrending + this.apiKey + "&offset=" + offset)
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.data.length - 1; i++) {
                    currentPage.addGif(json.data[i].title, json.data[i].images.original.url);
                }
                this.setMaxNum("trending", json.pagination.total_count);
            })
            .then(() =>  this.loading = false);
        this.currentTrendingPage = currentPage;
    }

    @action nextPage(searchOrTrending: string): void {
        if (searchOrTrending === "search") {
            this.searchPageNum += 25;
            if (this.searchPageNum > this.searchPagesMaxNum) {
                this.searchPageNum = this.searchPagesMaxNum;
            }
            this.search(this.currentSearchTerm, this.searchPageNum)
        } else {
            this.trendingPageNum += 25;
            if (this.trendingPageNum > this.trendingPagesMaxNum) {
                this.trendingPageNum = this.trendingPagesMaxNum;
            }
            this.getTrending(this.trendingPageNum);
        }
    }

    @action previousPage(searchOrTrending: string): void {
        if (searchOrTrending === "search") {
            this.searchPageNum -= 25;
            if (this.searchPageNum < 0) {
                this.searchPageNum = 0;
            }
            this.search(this.currentSearchTerm, this.searchPageNum)

        } else {
            this.trendingPageNum -= 25;
            if (this.trendingPageNum < 0) {
                this.trendingPageNum = 0;
            }
            this.getTrending(this.trendingPageNum);
        }
    }

    getCurrentPageNumber(searchOrTrending: string): number {
        if (searchOrTrending === "search") {
            return this.searchPageNum;
        } else {
            return this.trendingPageNum;
        }
    }

    getMaxPageNumber(searchOrTrending: string): number {
        if (searchOrTrending === "search") {
            return this.searchPagesMaxNum;
        } else {
            return this.trendingPagesMaxNum;
        }
    }

    @action setMaxNum(searchOrTrending: string, num: number): void {
        if (searchOrTrending === "search") {
            this.searchPagesMaxNum = num;
        } else {
            this.trendingPagesMaxNum = num;
        }
    }

    @action setPageNum(searchOrTrending: string, pageNum: number): void {
        const num = (pageNum - 1) * 25;
        if (searchOrTrending === "search") {
            if (num > this.searchPagesMaxNum) {
                this.searchPageNum = this.searchPagesMaxNum;
            } else if (num < 0) {
                this.searchPageNum = 0;
            } else {
                this.searchPageNum = num;
            }
            this.search(this.currentSearchTerm, this.searchPageNum);
            console.log(num);
        } else {
            if (num > this.trendingPagesMaxNum) {
                this.trendingPageNum = this.trendingPagesMaxNum;
            } else if (num < 0) {
                this.trendingPageNum = 0;
            } else {
                this.trendingPageNum = num;
            }
            this.getTrending(this.trendingPageNum);
        }
    }


}