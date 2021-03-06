import { Component } from "react";
import './InformationBox.scss';
import { GetCurrencyPriceResponse } from '../model/GetCurrencyPriceResponse';

export default class InformationBox extends Component<{ name: string, data: GetCurrencyPriceResponse | null }, {}> {

    public constructor(props: { name: string, data: GetCurrencyPriceResponse | null }) {
        super(props);
        this.state = {};
    }

    render() {
        const { name, data } = this.props;

        const price = (data && data.ticker) ? `$${data.ticker.price}` : "Error";
        const volume = (data && data.ticker && data.ticker.volume) ? data.ticker.volume : "-";

        let change, changeColor;
        if (data && data.ticker && data.ticker.change) {
            change = data.ticker.change;
            changeColor = parseInt(change) > 0 ? "green" : "red";
        } else {
            change = "-";
            changeColor = "gray";
        }

        return (
            <div className="currency">

                <div className="name">
                    {name}
                </div>

                <div className="price">
                    {price}
                </div>

                <div className="others">
                    <div className="volume">
                        <div className="label">
                            volume:
                        </div>
                        {volume}
                    </div>
                    <div className="change">
                        <div className="label">
                            change:
                        </div>
                        <span style={{ color: changeColor }}>
                            {change}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}