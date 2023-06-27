export class Track{
    constructor(id: number, title: string, path: string, album: string, artist: string) {
        this.Id = id;
        this.Title = title;
        this.Path = path;
        this.Album = album;
        this.Artist = artist;
    }
    Id: number;
    Title: string;
    Path: string;
    Album: string;
    Artist: string;
}