import { Message } from "./message";
import { User } from "./user";

export interface Conversation {
    id: number;
    initiator_id: number;
    recipient_id: number;
    created_at: string;
    updated_at: string;

    last_message: Message;
    unread_messages_count: number;

    the_other_user: User;

    messages: Message[];
}