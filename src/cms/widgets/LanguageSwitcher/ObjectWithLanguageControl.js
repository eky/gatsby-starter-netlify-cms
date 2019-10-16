// Forked from: https://github.com/netlify/netlify-cms/blob/ccef446d72f96fa8d8db9bf2d0be5633eff79979/packages/netlify-cms-widget-object/src/ObjectControl.js
// Added language prop and removed object container sytle
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ClassNames } from '@emotion/core';
import { Map, List } from 'immutable';

const styleStrings = {
  nestedObjectControl: `
    padding: 6px 14px 14px;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `,
};

export default class ObjectWithLanguageControl extends React.Component {
  componentValidate = {};

  static propTypes = {
    onChangeObject: PropTypes.func.isRequired,
    onValidateObject: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),
    field: PropTypes.object,
    forID: PropTypes.string,
    classNameWrapper: PropTypes.string.isRequired,
    forList: PropTypes.bool,
    controlRef: PropTypes.func,
    editorControl: PropTypes.func.isRequired,
    resolveWidget: PropTypes.func.isRequired,
    clearFieldErrors: PropTypes.func.isRequired,
    fieldsErrors: ImmutablePropTypes.map.isRequired,
    metadata: PropTypes.any,
    language: PropTypes.string,
  };

  static defaultProps = {
    value: Map(),
  };

  /*
   * Always update so that each nested widget has the option to update. This is
   * required because ControlHOC provides a default `shouldComponentUpdate`
   * which only updates if the value changes, but every widget must be allowed
   * to override this.
   */
  shouldComponentUpdate() {
    return true;
  }

  validate = () => {
    const { field } = this.props;
    let fields = field.get('field') || field.get('fields');
    fields = List.isList(fields) ? fields : List([fields]);
    fields.forEach(field => {
      if (field.get('widget') === 'hidden') return;
      this.componentValidate[field.get('name')]();
    });
  };

  controlFor(field, key) {
    const {
      value,
      onChangeObject,
      onValidateObject,
      clearFieldErrors,
      metadata,
      fieldsErrors,
      editorControl: EditorControl,
      controlRef,
      language,
    } = this.props;

    if (
      field.get('widget') === 'hidden'
      || field.get('language') !== language
    ) {
      return null;
    }
    const fieldName = field.get('name');
    const fieldValue = value && Map.isMap(value) ? value.get(fieldName) : value;

    return (
      <EditorControl
        key={key}
        field={field}
        value={fieldValue}
        onChange={onChangeObject}
        clearFieldErrors={clearFieldErrors}
        fieldsMetaData={metadata}
        fieldsErrors={fieldsErrors}
        onValidate={onValidateObject}
        processControlRef={controlRef && controlRef.bind(this)}
        controlRef={controlRef}
      />
    );
  }

  renderFields = (multiFields, singleField) => {
    if (multiFields) {
      return multiFields.map((f, idx) => this.controlFor(f, idx));
    }
    return this.controlFor(singleField);
  };

  render() {
    const { field, forID, forList } = this.props;
    const multiFields = field.get('fields');
    const singleField = field.get('field');

    if (multiFields || singleField) {
      return (
        <ClassNames>
          {({ css, cx }) => (
            <div
              id={forID}
              className={cx({
                [css`
                  ${styleStrings.nestedObjectControl}
                `]: forList,
              })}
            >
              {this.renderFields(multiFields, singleField)}
            </div>
          )}
        </ClassNames>
      );
    }

    return <h3>No field(s) defined for this widget</h3>;
  }
}