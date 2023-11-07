function ModalContainer({close, children}) {
    return(
      <div className="modalContainer" onClick={close}>
        <div className="modal" onClick={e => e.stopPropagation()} >
            {children}
        </div>
      </div>  
    );
}

export default ModalContainer;