import { PAGINATION_PARAMETERS } from '../app.constants';

export class RequestParams {
    limit: number;
    offset: number;
    search: string;

    constructor(params?) {
        this.limit = params && params.limit ? params.limit :  PAGINATION_PARAMETERS.LIMIT;
        this.offset = params && params.offset ? params.offset :  PAGINATION_PARAMETERS.OFFSET;
        this.search = params && params.search ? params.search :  '';
    }
}
