import { User } from '../classes/user';
import { Tokens } from './tokens.interface';

export interface SessionModel {
    profile: User;
    credentials: Tokens;
}
