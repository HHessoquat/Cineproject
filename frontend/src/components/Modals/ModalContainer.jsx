function ModalContainer({close, modalClass, children}) {
    return(
      <div className="modalContainer" onClick={close}>
        <div className={`modal ${modalClass ? modalClass : ""}`} onClick={e => e.stopPropagation()} role="dialog" >
            {children}
        </div>
      </div>  
    );
}

export default ModalContainer;