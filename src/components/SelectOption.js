const SelectOption = (props) => {

    const {value, text, initial} = props;
    const selected = value === initial ? 'selected' : '';

    return (
        <option value={value} selected={selected}>{value} / {text}</option>
    )
};

export default SelectOption;
