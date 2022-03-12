import PropTypes from 'prop-types'
import Button from './Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Header = ({title, onAdd, showAdd}) => { 
  
    return (
      <header className='header'>
          <div>
            <h1>{title}</h1>
            <AddCircleIcon onClick={onAdd}/>
            {/* <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} /> */}
          </div>
      </header>
    )
  }
  
  Header.defaultProps = {
    title: 'TBD'
  }
  
  Header.propTypes = {
    title: PropTypes.string.isRequired,
  }
  

  export default Header