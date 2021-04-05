import { BaseService } from "@server/common/service/BaseService";
import { CurrencyType } from "@server/entity/currency/model/CurrencyType";
import { GetCurrencyPriceResponse } from "../model/GetCurrencyPriceResponse";
import { ICryptonatorConnectionService } from "./ICryptonatorConnectionService";
import { LogService } from '@server/entity/log/service/LogService';
import { HttpResponseError } from '@server/application/error/HttpResponseError';

import fetch from "node-fetch";


class Service extends BaseService implements ICryptonatorConnectionService {
    public async getTickerAsync(type: CurrencyType) {
        const response = await fetch(`https://api.cryptonator.com/api/ticker/${type}`);

        if (response.ok) {
            const result: GetCurrencyPriceResponse = await response.json();
            return result;
        } else {
            throw new HttpResponseError(response);
        }
    }

    public async getAllTickerAsync(): Promise<GetCurrencyPriceResponse[]> {
        const promises = [];
        for(const type of Object.values(CurrencyType)){
            if(type) {
                promises.push(
                    this.getTickerAsync(type)
                    .then((res) => {
                        if(!res.success) {
                            LogService.error(`Cryptonator GET ${type}`, res.error);
                        }
                        return res;
                    })
                    .catch((err) => {
                        LogService.error("Cryptonator", `Error connecting Cryptonator: ${err.message}`);
                        return { success: false, error: err.message};
                    })
                );
            }
        }
        
        const result = await Promise.all(promises);
        return result.filter(x => x.success);
    }
}

export const CryptonatorConnectionService: ICryptonatorConnectionService = new Service();
