/*
Class 'favours' represent the models of favourite currency pairs for a 
specific user and remarks of it.
The key 'login' is the user loginID.
The key 'currencyName' and 'remarks' represent as its meaning.
*/
export class favours {
    login: string;
    currencyName: string;
    remarks: string;
}