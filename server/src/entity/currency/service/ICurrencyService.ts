import { GetCurrencyPriceResponse } from "@server/entity/currency/model/GetCurrencyPriceResponse";

export interface ICurrencyService {
    /**
     * Get all price information from cache
     * @returns GetCurrencyPriceResponse
     */
    getAllTickersAsync(): Promise<GetCurrencyPriceResponse[]>;
}
