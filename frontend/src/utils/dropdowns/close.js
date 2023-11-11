function closeDropDownOnBlur (ref, closeCallback) {
    
    const closeDropDown = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            closeCallback();
            document.removeEventListener('mousedown', closeDropDown)
        }
    }
    document.addEventListener('mousedown',closeDropDown);
}
export default closeDropDownOnBlur