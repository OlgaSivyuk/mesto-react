function ImagePopup (){
  return (
  <>
  <div className="popup popup_type_photo">
    <div className="popup__photo-body">
      <img className="popup__photo-url" src="." alt=""/>
      <h3 className="popup__photo-name"></h3>
      <button type="button" className="popup__close-popup" aria-label="Закрыть фото место"></button>
    </div>
  </div>
  
  </>
  )
}

export default ImagePopup;