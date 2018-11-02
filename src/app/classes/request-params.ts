import { PAGINATION_PARAMETERS } from '../app.constants';

export class RequestParams {
    limit: number;
    offset: number;
    search: string;
    order: string;
    isVerified: boolean;
    isBlocked: boolean;
    field: string;
    qualification?: number;
    preference?: number;

    constructor(params?) {
        this.limit = params && params.limit ? params.limit :  PAGINATION_PARAMETERS.LIMIT;
        this.offset = params && params.offset ? params.offset :  PAGINATION_PARAMETERS.OFFSET;
        this.search = params && params.search ? params.search :  '';
        this.order = params && params.order ? params.order :  'DESC';
        this.isVerified = params && params.isVerified ? params.isVerified : false;
        this.field = 'createdAt';
        this.isBlocked = false;
    }
}
