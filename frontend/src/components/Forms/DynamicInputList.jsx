function DynamicInputList({
    arrayOfDatas,
    inputLabel,
    inputName,
    handleChangeArray,
    addInputBtn,
}) {
    return (
        <>
            <label htmlFor={inputName}>{inputLabel}</label>
            {arrayOfDatas.map((c, i) => (
                <input
                    key={i + inputLabel}
                    type="text"
                    name={inputName}
                    value={c}
                    onChange={(e) => handleChangeArray(e, i)}
                />
            ))}
            <button type="button" name={inputName} onClick={addInputBtn}>
                +
            </button>
        </>
    );
}
export default DynamicInputList;
