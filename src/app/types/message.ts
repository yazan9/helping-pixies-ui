import { User } from "./user";

export interface Message{
    id?: number;
    conversation_id?: number;
    user_id?: number;
    content: string;
    created_at?: string;
    updated_at?: string;

    the_other_user?: User;
}