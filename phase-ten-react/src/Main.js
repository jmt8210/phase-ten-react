import Header from './Header'
// import Fab from '@mui/material/Fab'
// import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
function Main(){

  const currentUser = useSelector(state => state.currentUser)

  return (
    <>
      <Header/>
      Main
      <br/>
      {currentUser}
      <br/>
      {/* <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab> */}
    </>
  )
}

export default Main;