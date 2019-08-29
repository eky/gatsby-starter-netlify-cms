import LanguageSwitcherControl from './LanguageSwitcherControl';
import ObjectWithLanguageControl from './ObjectWithLanguageControl';

const Widget = (opts = {}) => ({
  name: 'language-switcher',
  LanguageSwitcherControl,
  ...opts,
});

export { Widget, LanguageSwitcherControl, ObjectWithLanguageControl };
