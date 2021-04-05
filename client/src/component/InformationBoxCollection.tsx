import { CurrencyService } from "../service/CurrencyService";
import { Component } from "react";
import InformationBox from './InformationBox';
import { GetCurrencyPriceResponse } from '../model/GetCurrencyPriceResponse';
import { CurrencyType } from "../model/CurrencyType";
import './InformationBox.scss';

export default class InformationBoxCollection extends Component<{}, { data: GetCurrencyPriceResponse[] }> {
    public readonly refreshRate: number = 30000;

    public timer?: NodeJS.Timeout;

    public constructor(props: {}) {
        super(props);
        this.state = { data: [] };
    }

    public async componentDidMount() {
        await this.loadData();
        this.timer = setInterval(() => { this.loadData() }, this.refreshRate);
    }

    public async componentWillUnmount() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }

    private async loadData() {
        const res = await CurrencyService.getAllTickerAsync();
        this.setState({
            data: res,
        });
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