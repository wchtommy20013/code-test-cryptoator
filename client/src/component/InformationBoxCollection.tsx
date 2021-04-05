import { CurrencyService } from "../service/CurrencyService";
import { Component } from "react";
import InformationBox from './InformationBox';
import { GetCurrencyPriceResponse } from '@server/entity/currency/model/GetCurrencyPriceResponse';

import './InformationBox.scss';
import { CurrencyType } from "../model/CurrencyType";

export default class InformationBoxCollection extends Component<{}, { data: GetCurrencyPriceResponse[] }> {

    public constructor(props: {}) {
        super(props);
        this.state = { data: [] };
    }

    public async componentDidMount() {
        try {
            const res = await CurrencyService.getAllTickerAsync();
            this.setState({
                data: res,
            });
        } catch (e) {

        }
    }

    render() {
        const children = [];

        for (const type of Object.keys(CurrencyType)) {
            const match = this.state.data.filter(x => x.ticker?.base === (CurrencyType as any)[type]);
            if (match.length > 0) {
                children.push((<InformationBox key={type} name={type} data={match[0]}></InformationBox>))
            } else {
                children.push((<InformationBox key={type} name={type} data={null}></InformationBox>))
            }
        }

        return (
            <div className="container">
                <div className="header">
                    <p>
                        Cryptocurrency Realtime Price
                    </p>
                </div>
                <div className="parent">
                    {children}
                </div>
            </div>
        );
    }
}