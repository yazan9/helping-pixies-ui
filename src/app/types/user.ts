export class User{
    id: number = 0;
    email: string = '';
    name: string = '';
    phone: string = '';
    created_at: string = '';
    updated_at: string = '';
    user_type: string = 'client';
    password: string = '';
    latitude: string = '';
    longitude: string = '';
    profile_image_url: string = '';
    address: string = '';
    description: string = '';
    average_rating: number = 0;
    ratings_count: number = 0;
    time_zone: string = '';

    constructor(){}
}