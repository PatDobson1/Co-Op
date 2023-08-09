import { useState } from 'react';

import CountryDropdown from './components/CountryDropdown';
import './App.css';
import SwitchLogo from './switch.svg';

let countdown;

function App() {

    const [showConversion, setShowConversion] = useState(false);
    const [amount, setAmount] = useState(100);
    const [amountError, setAmountError] = useState({
        'status': false,
        'errorMessage': ''
    });
    const [targetAmount, setTargetAmount] = useState(0);
    const [origin, setOrigin] = useState("GBP");
    const [target, setTarget] = useState("EUR");
    const [conversionError, setConversionError] = useState(false);
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(60);

    const fetchRates = async (countryCode) => {
        clearInterval(countdown);
        const requiredRateUrl = "https://api.exchangerate-api.com/v4/latest/" + countryCode;
        const response = await fetch(requiredRateUrl);
        if (!response.ok) {
            setConversionError(true);
            return;
        }
        const rates = await response.json();
        if (typeof rates.rates[target] === 'undefined') {
            setConversionError(true);
            return;
        }
        const converted = amount * rates.rates[target];
        setTargetAmount(converted.toFixed(2));
        setShowConversion(true);
        startTimer();
    }

    const switchHandler = () => {
        const newTarget = origin;
        const newOrigin = target;
        document.getElementById('origin').value = newOrigin;
        document.getElementById('target').value = newTarget;
        setOrigin(newOrigin);
        setTarget(newTarget);
        reset();
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        reset();
    };

    const handleOriginChange = (e) => {
        setOrigin(e.target.value);
        reset();
    };

    const handleTargetChange = (e) => {
        setTarget(e.target.value);
        reset();
    };

    const reset = () => {
        setAmountError({
            'status': false,
            'errorMessage': ''
        })
        clearInterval(countdown);
        setShowConversion(false);
    }

    const handleConversion = () => {
        if (isNaN(amount)) {
            setAmountError({
                'status': true,
                'errorMessage': 'is not a valid number'
            });
            return;
        }
        if (amount <= 0) {
            setAmountError({
                'status': true,
                'errorMessage': 'is not a valid number, please enter a number greater than 0'
            });
            return;
        }
        setConversionError(false);
        fetchRates(origin);
    };

    const startTimer = () => {
        let sec = 0;
        let min = 10;
        setMinutes(min);
        setSeconds(sec);
        countdown = setInterval(function(){
            if (sec == 0) {
                min--;
                setMinutes(min);
                sec = 60;
            }
            if (min == 0 && sec == 1) {
                clearInterval(countdown);
                setShowConversion(false);
            }
            sec--;
            setSeconds(sec);
        }, 1000);
    }


    return (
        <div className="currency-convertor">
            <div className="currency-convertor__amount">
                <label htmlFor="amount" className="currency-convertor__amount-label">Amount</label>
                <input  type="text"
                        name="amount"
                        id="amount"
                        className="currency-convertor__amount-input"
                        onChange={handleAmountChange}
                        defaultValue="100" />
                <button className="currency-convertor__amount--switch" onClick={switchHandler}><img src={SwitchLogo} /></button>
                {amountError.status &&
                    <p className="currency-convertor__input--error">{amount} {amountError.errorMessage}</p>
                }
            </div>
            <CountryDropdown changeHandler={handleOriginChange} initial="GBP" id="origin" image={origin} />
            <CountryDropdown changeHandler={handleTargetChange} initial="EUR" id="target" image={target} />
            {showConversion && !conversionError &&
                <div className="currency-convertor__output">
                    <div className="currency-convertor__output-conversion">{amount} {origin} is equivalent to {targetAmount} {target}</div>
                    <div className="currency-convertor__output-counter">
                        <span className="currency-convertor__output-counter--title">Expires in:</span>
                        <span className="currency-convertor__output-counter--minutes">{minutes}'</span>
                        <span className="currency-convertor__output-counter--seconds">{seconds}"</span>
                    </div>
                </div>
            }
            {conversionError &&
                <div className="currency-convertor--error">
                    <p>Sorry, there has been an error in conversion</p>
                </div>
            }
            <button className="currency-convertor__button" onClick={handleConversion}>Convert</button>

        </div>
    );

};

export default App;

// <img src="https://flagcdn.com/w40/hm.png" />
