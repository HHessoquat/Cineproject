const handleChange = (e, setFormData, setErrorMsg) => {
        const { name, value } = e.target;
        console.log('passe')
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErrorMsg([]);
    }
    
export default handleChange