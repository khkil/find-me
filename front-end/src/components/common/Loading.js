import Loader from 'react-loader-spinner'

const style = {
 
  'marginLeft': '47%',
  'marginTop': '20%',

}

const Loading = ({ loading }) => {
  if(loading){
    return (
      <Loader
        style={style}
        className="test"
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        //timeout={3000} //3 secs
      />
    )
  }else {
    return ''
  }
  
}
export default Loading;