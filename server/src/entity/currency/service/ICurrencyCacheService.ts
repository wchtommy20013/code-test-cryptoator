import { GetCurrencyPriceResponse } from "@server/entity/currency/model/GetCurrencyPriceResponse";
import { CurrencyType } from '@server/entity/currency/model/CurrencyType';

/**
 * Simplified cache service
 * TODO: 1. make a seperate CDN project to further improve the load time
 * TODO: 2. use Redis instead of node-cache
 */
export interface ICurrencyCacheService {
    /**
     * Get price information from cache
     * @returns GetCurrencyPriceResponse
     */
    getTickerAsync(type: CurrencyType): Promise<GetCurrencyPriceResponse>;
}
