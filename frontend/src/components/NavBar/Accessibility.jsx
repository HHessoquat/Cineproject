import { useState, useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEyeLowVision} from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/ModalContainer';

function Accessibility() {
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    const [isDyslexiaOn, setIsDyslexiaOn] = useState(JSON.parse(localStorage.getItem('isDyslexiaOn')) || false);
    const [isBigFontOn, setIsBigFontOn] = useState(JSON.parse(localStorage.getItem('isBigFontOn')) || false);
    
    useEffect(()=> {
        const body = document.getElementsByTagName("body");
        if (isDyslexiaOn) {
            body[0].classList.add("dyslexia");
        } else {
            body[0].classList.remove("dyslexia");
        }
        localStorage.setItem('isDyslexiaOn', JSON.stringify(isDyslexiaOn));
    }, [isDyslexiaOn]);
    
    useEffect(()=> {
        const body = document.getElementsByTagName("body");
        if (isBigFontOn) {
            body[0].classList.add("bigFont");
        } else {
            body[0].classList.remove("bigFont");
        }
        localStorage.setItem('isBigFontOn', JSON.stringify(isBigFontOn));
    }, [isBigFontOn]);
    console.log(isBigFontOn);
    const modalContent = () => {
        return (
            <>
                <label>
                    <input type="checkbox" id="dyslexia" checked={isDyslexiaOn} onChange={() => setIsDyslexiaOn(!isDyslexiaOn)} />
                    <div className={`enableDyslexia accessibilityBtn ${isDyslexiaOn ? 'checked' : ""}`}>mettre une Police adapté à la dyslexie</div>
                </label>
                <label>
                    <input type="checkbox" id="bigFont" checked={isBigFontOn} onChange={() => setIsBigFontOn(!isBigFontOn)} />
                    <div className={`enableBigFont accessibilityBtn ${isBigFontOn ? 'checked' : ""}`}>Agrandir les textes</div>
                </label>
            </>
        )
    }
    
    function displayAccessibility() {
        setIsAccessibilityOpen(!isAccessibilityOpen);
    }
    
    
    return(
        <>
            <button onClick={displayAccessibility} className="NavBarDropDownButton">
                <FontAwesomeIcon icon={faEyeLowVision} style={{fontSize: "2em"}} />
            </button>
            
            {
                isAccessibilityOpen ? <Modal close={displayAccessibility} modalClass="accessibilityOptions"> {modalContent()} </Modal> : ""
            }
        </>
    )
}
export default Accessibility;