import { GetCurrencyPriceResponse } from "@server/entity/currency/model/GetCurrencyPriceResponse";
import { CurrencyType } from '@server/entity/currency/model/CurrencyType';

/**
 * Fetch API from Cryptonator
 */
export interface ICryptonatorConnectionService {
    /**
     * Get price information from Cryptonator by ticker
     * @returns GetCurrencyPriceResponse
     * @throws HTTPRequestError: Failed to connect Cryptonator
     */
    getTickerAsync(type: CurrencyType): Promise<GetCurrencyPriceResponse>

    /**
     * Get price information of all CurrencyType from Cryptonator
     * @returns GetCurrencyPriceResponse
     * @throws HTTPRequestError: Failed to connect Cryptonator
     */
    getAllTickerAsync(): Promise<GetCurrencyPriceResponse[]>

}
