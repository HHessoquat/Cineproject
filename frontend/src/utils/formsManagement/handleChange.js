const handleChange = (e, setFormData, setErrorMsg) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErrorMsg([]);
    }
    
export default handleChange