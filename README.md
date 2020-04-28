# README

## Regarding the index.html
The index.html in the dist-folder is the "true" index.

## Usage
The number of gifs displayed is 25, because that is the number the giphy api delivers per fetch when left to default.
Simply Enter a search term and hit enter to start a search.
The prev and next button go back/forward a page.
You can also enter the desired page number in the input box for the current page (at the bottom between prev and next).
Hitting enter will take you to the desired page.

For trending, simply enter the trending-tab with the respective button in the ui and the respective images will be loaded. If you wish to reload (to get the newest gifs), hit the reload button.

Please keep in mind that the gifs can take a bit to load before showing up.

## Giphy bugs
The Giphy API has a bug that can occur when a large offset (that is however still in legal range) is used. For this application, this means entering a huge page number for the current page.
An example: the trending tab yields a total of 4023 pages of results. You start on page one and enter 3000 as the page you wish to go to. This will lead to an empty page. It will also screw with the application, since the allowed maximum will be set to 1. 
If you get stuck in that situation, enter 1 as value for the current page and hit enter. This will take you back to the first page and everything will work properly again.
The reason why this seems to screw the application over is because the returned pagination object (which has the total count of gifs and is used to calculate the number of pages) will have a total_count of zero (which translate to a maximum of one page in the application.) 
Since I this is annoying, I removed the maximum for the input. 
The Giphy bug still happens, bout you can enter a lower offset like this (e.g. 20) and get back to pages displaying gifs. This leads to another small bug: 
entering a number higher than the allowed one will display this higher number in the current page, but the number in the background will still be the correct one (You can see this if you click prev, which will take you to a page one lower than the maximum number). Please note that because of the Gipby-bug, this only becomes an issue when the total number of pages is low (25, for example).

This is also the same reason clicking the next button when this bug occurs will take you back to the first page (the new highest page number is one, so that's where you are taken).
Since those bugs are a result of the Giphy API not working correctly, there is not much that can be done about them.

Another interesting quirk of the giphy api is the fact that the last pages are often empty from gifs. This is not a problem with this application, but with the information the Giphy API supplies. (It may have something to do with the dozens of different gif-urls the api supplies).