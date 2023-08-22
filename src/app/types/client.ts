export class Client{
    id: number;
    name: string;
    description: string;
    distance: number;
    average_rating: number;

    constructor(){
        this.id = 0;
        this.name = '';
        this.description = '';
        this.distance = 0;
        this.average_rating = 0;
    }
}