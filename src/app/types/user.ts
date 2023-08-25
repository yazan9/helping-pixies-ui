export class User{
    id: number = 0;
    email: string = '';
    name: string = '';
    phone: string = '';
    created_at: string = '';
    updated_at: string = '';
    user_type: string = '';
    password: string = '';
    latitude: string = '';
    longitude: string = '';
    profile_image_url: string = '';

    constructor() {
        this.id = 0;
        this.email = '';
        this.name = '';
        this.phone = '';
        this.created_at = '';
        this.updated_at = '';
        this.user_type = 'client';
        this.password = '';
        this.latitude = '';
        this.longitude = '';
    }
}