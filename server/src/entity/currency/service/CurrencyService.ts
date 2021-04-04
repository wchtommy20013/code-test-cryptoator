import { BaseService } from "@server/common/service/BaseService";
import { GetCurrencyPriceResponse } from '@server/entity/currency/model/GetCurrencyPriceResponse';
import { CurrencyCacheService } from './CurrencyCacheService';
import { ICurrencyService } from './ICurrencyService';

class Service extends BaseService {
    public async getAllTickersAsync(): Promise<GetCurrencyPriceResponse[]> {
        return CurrencyCacheService.getAllTickersAsync();
    }
}

export const CurrencyService: ICurrencyService = new Service();
