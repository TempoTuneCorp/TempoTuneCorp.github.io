export class Track{
    constructor(title: string, path: string, album: string, artist: string) {
        this.Title = title;
        this.Path = path;
        this.Album = album;
        this.Artist = artist;
    }
    Title: string;
    Path: string;
    Album: string;
    Artist: string;
}