/*
Class 'Currency' represent the models of currency pairs details.
The key 'name' is the name of currency pairs.
The key 'bid' is the purchasing price from trader to investor.
The key 'ask' is the selling price from trader to investor.
The key 'time' is the price of the moment.
*/
export class Currency {
    name: string;
    bid: number;
    ask: number;
    time: string;
}