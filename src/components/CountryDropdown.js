import { useEffect, useState } from 'react';

import SelectOption from './SelectOption';

const CountryDropdown = (props) => {
    const {image} = props;
    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://openexchangerates.org/api/currencies.json');
            const responseData = await response.json();
            let result = await Object.keys(responseData).map((key) => [key, responseData[key]]);
            await setCountryData(result);
        };

        fetchCountries();

    }, []);

    const countryList = countryData.map((country) => (
        <SelectOption key={country[0]} value={country[0]} text={country[1]} initial={props.initial} />
    ));

    const country = image.slice(0,2).toLowerCase();
    const imageUrl = `https://flagcdn.com/w40/${country}.png`;
    const imageAlt = `${country} flag`;

    return (
        <>
            <img src={imageUrl} className="currency-convertor__country-image" alt={imageAlt} />
            <select className="currency-convertor__country"
                    id={props.id}
                    onChange={props.changeHandler}
                    defaultValue={"GBP"}>
                {countryList}
            </select>
        </>
    )
};

export default CountryDropdown;
