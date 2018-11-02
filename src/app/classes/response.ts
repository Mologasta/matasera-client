import { PaginationInterface } from '../interfaces/pagination.interface';

export class ResponseModel <T> {
    data: T;
    pagination: PaginationInterface;
}
