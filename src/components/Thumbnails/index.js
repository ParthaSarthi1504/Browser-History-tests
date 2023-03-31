import './index.css'

const Thumbnails = props => {
  const {imgDetails, clickingThumbnailImg} = props

  const {id, thumbnailUrl} = imgDetails

  const clickImg = () => {
    clickingThumbnailImg(id)
  }

  return (
    <li className="li-row">
      <button type="button" onClick={clickImg}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}

export default Thumbnails
