export const PAGINATION_PARAMETERS = {
    LIMIT: 15,
    OFFSET: 0
};

export const API_ROUTES = {
    SESSIONS: '/admins/sessions',
    RIDERS: '/admins/riders',
    REQUESTS: '/admins/riders/requests',
    DRIVERS: '/admins/drivers',
    FEES: '/admins/riders/fee',
    ADMIN: '/admins/me'
};

export const QUALIFICATION_GROUPS = [
    {
        name: 'Regular',
        qualifications: [
            {value: '1', viewValue: 'All regular'},
            {value: '2', viewValue: 'Drive children'},
            {value: '3', viewValue: 'Need some assistance'}
        ]
    },
    {
        name: 'Medical',
        qualifications: [
            {value: '4', viewValue: 'All medical'},
            {value: '5', viewValue: 'Folding wheelchair'},
            {value: '6', viewValue: 'Electric wheelchair'},
            {value: '7', viewValue: 'Advanced medical needs'}
        ]
    }
];

export const RIDER_PREFERENCES = [
    {value: '1', viewValue: 'Elder passengers'},
    {value: '2', viewValue: 'Folding wheelchair'},
    {value: '3', viewValue: 'Electric wheelchair'},
    {value: '4', viewValue: 'Advanced medical needs'}
];
