import {User} from './user';

export class Deal {
    sender: User;
    created_at: string;
    sender_id: number;
    receiver: User;
    receiver_id: number;
    amount: number;
    type: string;
    password: string;
}
