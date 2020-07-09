import React, { Component } from 'react';
import './Dropdown.css';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      defaultText: props.defaultText,
      headerTitle: props.defaultText,
    };
  }

  toggleListOpen() {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
    }));
  }

  showOpenList() {
    const { dropdownItems } = this.props;
    const { listOpen, headerTitle } = this.state;

    return (
      listOpen && (
        <ul className="dd-list">
          {dropdownItems.map(
            (item) => (
              <li
                data-testid="dropdown-item"
                className="dd-list-item"
                key={item.title}
                role="option"
                aria-selected={item.title === headerTitle}
                onClick={() => this.selectItem(item.id, dropdownItems)}
                onKeyPress={() => this.selectItem(item.id, dropdownItems)}
              >
                {item.title}
              </li>
            ),
          )}
        </ul>
      )
    );
  }

  selectItem(id, list) {
    const { onClick, restoreDefaultOnClick } = this.props;
    const { defaultText } = this.state;
    const newTitle = (restoreDefaultOnClick) ? defaultText : list[id].title;

    this.setState({
      listOpen: false,
      headerTitle: newTitle,
    });
    onClick(id);
  }

  render() {
    const { headerTitle } = this.state;
    return (
      <div className="dd-wrapper">
        <div
          className="dd-header"
          role="listbox"
          tabIndex={0}
          onClick={() => this.toggleListOpen()}
          /* TODO: Fix up the Key Press stuff on dropdowns */
          onKeyPress={() => this.toggleListOpen()}
        >
          <div className="dd-header-title" data-testid="dropdown">{headerTitle}</div>
        </div>
        {this.showOpenList()}
      </div>
    );
  }
}

Dropdown.propTypes = {
  defaultText: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  restoreDefaultOnClick: PropTypes.bool,
};

Dropdown.defaultProps = {
  dropdownItems: [],
  onClick: () => {},
  restoreDefaultOnClick: true,
};

export default Dropdown;
