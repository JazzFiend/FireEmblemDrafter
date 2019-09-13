import React, { Component } from 'react';
import './Dropdown.css';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: props.defaultText,
      list: props.dropdownItems,
    };
  }

  toggleListOpen() {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
    }));
  }

  selectItem(id, list) {
    const { onClick } = this.props;
    this.setState({
      listOpen: false,
      headerTitle: list[id].title,
    });
    onClick(id);
  }

  render() {
    const { listOpen, headerTitle, list } = this.state;
    return (
      <div className="dd-wrapper">
        <div
          className="dd-header"
          role="listbox"
          tabIndex={0}
          onClick={() => this.toggleListOpen()}
          onKeyPress={() => this.toggleListOpen()}
        >
          <div className="dd-header-title" data-testid="dropdown">{headerTitle}</div>
        </div>
        {listOpen && (
          <ul className="dd-list">
            {list.map(
              (item) => (
                <li
                  data-testid="dropdown-item"
                  className="dd-list-item"
                  key={item.title}
                  role="option"
                  aria-selected={item.title === headerTitle}
                  onClick={() => this.selectItem(item.id, list)}
                  onKeyPress={() => this.selectItem(item.id, list)}
                >
                  {item.title}
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    );
  }
}

Dropdown.propTypes = {
  defaultText: PropTypes.string,
  dropdownItems: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

Dropdown.defaultProps = {
  defaultText: 'default text',
  dropdownItems: [],
  onClick: () => {},
};

export default Dropdown;
