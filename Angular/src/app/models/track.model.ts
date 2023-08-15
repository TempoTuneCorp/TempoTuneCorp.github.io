export class Track{
    constructor(id: number, title: string, path: string, album: string, artist: string, time: string, favorite: boolean) {
        this.Id = id;
        this.Title = title;
        this.Path = path;
        this.Album = album;
        this.Artist = artist;
        this.Time = time;
        this.Favorite = favorite;
    }
    Id: number;
    Title: string;
    Path: string;
    Album: string;
    Artist: string;
    Time: string;
    Favorite: boolean;

    
}