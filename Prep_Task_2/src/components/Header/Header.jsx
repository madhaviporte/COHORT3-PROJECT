
import { PlusCircle } from 'lucide-react';
import './Header.scss';

function Header({ onAddTask }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">T</span>
        <h1>TaskBoard</h1>
      </div>

      <button
        type="button"
        className="header__add-button"
        onClick={onAddTask}
      >
        <PlusCircle size={18} />
        Add Task
      </button>
    </header>
  );
}

export default Header;
