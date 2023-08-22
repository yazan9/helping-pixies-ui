import { Client } from "./client";
import { Provider } from "./provider";

export class Booking{
    id: number;
    start_at: string;
    provider_id: number;
    frequency: string;
    status: string;
    rate: number;
    comments: string;
    provider: Provider;
    client: Client;

    constructor(){
        this.id = 0;
        this.start_at = '';
        this.provider_id = 0;
        this.frequency = '';
        this.status = '';
        this.rate = 0;
        this.comments = '';
        this.provider = new Provider();
        this.client = new Client();
    }
}