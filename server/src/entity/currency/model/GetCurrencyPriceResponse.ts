import { CurrencyInformation } from './CurrencyInformation';

export interface GetCurrencyPriceResponse {
    ticker: CurrencyInformation,
    timestamp: number,
    success: boolean,
    error: string,
}
