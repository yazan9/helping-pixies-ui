export class User{
    id: number = 0;
    email: string = '';
    name: string = '';
    phone: string = '';
    created_at: string = '';
    updated_at: string = '';
    user_type: number = 0;
    password: string = '';

    constructor() {
        this.id = 0;
        this.email = '';
        this.name = '';
        this.phone = '';
        this.created_at = '';
        this.updated_at = '';
        this.user_type = 0;
        this.password = '';
    }
}