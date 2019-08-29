import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CMS from 'netlify-cms-app';
import { Map } from 'immutable';

import ObjectControl from './ObjectWithLanguageControl';

class LanguageSwitcherControl extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: props.field.get('defaultLanguage'),
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
      field,
    } = this.props;
    const {
      selectedLanguage,
    } = this.state;
    const languages = field.get('languages');

    const SelectControl = CMS.getWidget('select').control;

    return (
      <div className={classNameWrapper}>
        <SelectControl
          value={selectedLanguage}
          onChange={this.handleLanguageChange}
          forID={`${forID}-LanguageSelectControl`}
          classNameWrapper={classNameWrapper}
          field={Map({ options: languages })}
        />
        <ObjectControl language={selectedLanguage} {...this.props} />
      </div>
    );
  }
}

LanguageSwitcherControl.propTypes = {
  forID: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string.isRequired,
  field: ImmutablePropTypes.contains({
    defaultLanguage: PropTypes.string.isRequired,
    languages: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
  }),
};

export default LanguageSwitcherControl;
