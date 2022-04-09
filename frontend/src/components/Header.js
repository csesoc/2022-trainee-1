import PropTypes from 'prop-types'
import AddTaskIcon from '@mui/icons-material/AddTask';
import "./Header.css";

const Header = ({title, onAdd, showAdd}) => { 

    return (
      <header className='header'>
          <div>
            <AddTaskIcon className="task-button" onClick={onAdd} fontSize="large"/>
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