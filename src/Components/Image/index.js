import './index.css'

const Image = props => {
  const {imageDetails, checkTheMatch} = props
  const {thumbnailUrl, imageUrl} = imageDetails
  const onClickImage = () => {
    checkTheMatch(imageUrl)
  }
  return (
    <li>
      <button className="button" onClick={onClickImage} type="button">
        <img className="thumbnails" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default Image
