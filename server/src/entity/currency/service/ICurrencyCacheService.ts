import { GetCurrencyPriceResponse } from "@server/entity/currency/model/GetCurrencyPriceResponse";

/**
 * Simplified cache service
 * TODO: 1. make a seperate CDN project to further improve the load time
 * TODO: 2. use Redis instead of node-cache
 */
export interface ICurrencyCacheService {
    /**
     * Get all price information from cache
     * @returns GetCurrencyPriceResponse
     */
    getAllTickersAsync(): Promise<GetCurrencyPriceResponse[]>;
}
