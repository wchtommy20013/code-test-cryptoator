import { BaseService } from "@server/common/service/BaseService";
import { GetCurrencyPriceResponse } from '@server/entity/currency/model/GetCurrencyPriceResponse';
import { CryptonatorConnectionService } from "./CryptonatorConnectionService";
import { ICurrencyCacheService } from './ICurrencyCacheService';
import { EventManager } from "@server/application/event/EventManager";
import { LogService } from '@server/entity/log/service/LogService';
import { CacheManager } from '@server/application/cache/CacheManager';

class Service extends BaseService implements ICurrencyCacheService {
    public constructor() {
        super();
        EventManager.register("SHOULD_REFRESH", this.updateTickerAsync);
    }

    public async getAllTickersAsync(): Promise<GetCurrencyPriceResponse[]> {
        const res = await CacheManager.get<GetCurrencyPriceResponse[]>(`currency_info`, async () => {
            return CryptonatorConnectionService.getAllTickerAsync();
        });
        return res;
    }

    public async updateTickerAsync(): Promise<GetCurrencyPriceResponse[]> {
        LogService.log("Cryptonator", "Refresh");
        return CacheManager.update<GetCurrencyPriceResponse[]>(`currency_info`, async () => {
            return CryptonatorConnectionService.getAllTickerAsync();
        });
    }
}

export const CurrencyCacheService: ICurrencyCacheService = new Service();
