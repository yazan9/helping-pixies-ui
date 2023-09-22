import { User } from "./user";

export interface Message{
    id?: number;
    conversation_id?: number;
    user_id?: number;
    content: string;
    created_at?: string;
    updated_at?: string;
    sender?:string;
    is_system_message?: boolean;

    the_other_user?: User;

    assigned_profile_image_url?: string;
    assigned_initials?: string;
}