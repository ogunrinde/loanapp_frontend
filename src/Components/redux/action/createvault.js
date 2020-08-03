import {  
    AVAILABLEFUND,
    REQUESTAMOUNT,
    INTEREST,
    LOANTENOR,
    BORROWER,
    OTHERS

} from './constants';

export function Createvault_availablefund(data)
{
    return { type: AVAILABLEFUND, data}
}

export function Createvault_requestamount(data)
{
    return { type: REQUESTAMOUNT, data };
}

export function Createvault_interest(data)
{
    return { type: INTEREST, data };
}

export function Createvault_loantenor(data)
{
    return { type: LOANTENOR, data };
}

export function Createvault_borrower(data)
{
    return { type: BORROWER, data};
}

export function Createvault_others(data)
{
    return { type: OTHERS, data };
}