import { GetCurrencyPriceResponse } from "@server/entity/currency/model/GetCurrencyPriceResponse";
import { CurrencyType } from '@server/entity/currency/model/CurrencyType';

export interface ICurrencyService {
    /**
     * Get price information from cache
     * @returns GetCurrencyPriceResponse
     */
    getTickerAsync(type: CurrencyType): Promise<GetCurrencyPriceResponse>;
}
