function DynamicInputList({
    arrayOfDatas,
    inputLabel,
    inputName,
    handleChangeArray,
    addInputBtn,
    removeInputBtn
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
            <div>
                <button className="addInputBtn" type="button" name={inputName} onClick={addInputBtn}>
                    +
                </button>
                <button className="addInputBtn" type="button" name={inputName} onClick={removeInputBtn}>
                    -
                </button>
            </div>
        </>
    );
}
export default DynamicInputList;
