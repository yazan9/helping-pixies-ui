export class Provider{
    id: number;
    name: string;
    description: string;
    distance: number;
    average_rating: number;
    profile_image_url: string;
    ratings_count: number;

    constructor(){
        this.id = 0;
        this.name = '';
        this.description = '';
        this.distance = 0;
        this.average_rating = 0;
        this.profile_image_url = '';
        this.ratings_count = 0;
    }
}