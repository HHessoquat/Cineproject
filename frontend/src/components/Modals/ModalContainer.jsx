function ModalContainer({close, modalClass, children}) {
    return(
      <div className="modalContainer" onClick={close}>
        <div className={`modal ${modalClass}`} onClick={e => e.stopPropagation()} >
            {children}
        </div>
      </div>  
    );
}

export default ModalContainer;