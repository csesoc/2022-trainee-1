import PropTypes from 'prop-types'
import AddTaskIcon from '@mui/icons-material/AddTask';

const Header = ({title, onAdd, showAdd}) => { 

    return (
      <header className='header'>
          <div>
            <h1>{title}</h1>
            <AddTaskIcon onClick={onAdd}/>
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