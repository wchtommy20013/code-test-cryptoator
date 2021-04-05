import fetch from "node-fetch";
import { BaseService } from '../service/BaseService';
import { GetCurrencyPriceResponse } from '@server/entity/currency/model/GetCurrencyPriceResponse';
import { CurrencyType } from '../model/CurrencyType';


class Service extends BaseService {
    public async getAllTickerAsync(): Promise<GetCurrencyPriceResponse[]> {
        const response = await fetch(`${this.endpoint}/ticker/`);

        if (response.ok) {
            const result: GetCurrencyPriceResponse[] = await response.json();
            return result;
        } else {
            return [];
            // throw new HttpResponseError(response);
        }
    }

    public getCurrencyType() {
        return Object.keys(CurrencyType);
    }
}

export const CurrencyService: Service = new Service();
