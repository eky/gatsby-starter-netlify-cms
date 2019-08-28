import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CMS from 'netlify-cms-app';
import { Map, List } from 'immutable';

import ObjectControl from './ObjectWithLanguageSwitcherControl';

class LanguageSwitcherControl extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: props.defaultLanguage,
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(selectedLanguage) {
    this.setState({ selectedLanguage });
  }

  render () {
    const {
      forID,
      classNameWrapper,
      languages,
    } = this.props;
    const {
      selectedLanguage,
    } = this.state;

    const LanguageSelectControl = CMS.getWidget('select').control;

    return (
      <div className={classNameWrapper}>
        <LanguageSelectControl
          value={selectedLanguage}
          onChange={this.handleLanguageChange}
          forID={`${forID}-LanguageSelectControl`}
          classNameWrapper={classNameWrapper}
          field={Map({ options: List(languages) })}
        />
        <ObjectControl language={selectedLanguage} {...this.props} />
      </div>
    );
  }
}

LanguageSwitcherControl.propTypes = {
  forID: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
};

export default LanguageSwitcherControl;
