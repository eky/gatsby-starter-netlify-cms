import LanguageSwitcherControl from './LanguageSwitcherControl';
import ObjectWithLanguageSwitcherControl from './ObjectWithLanguageSwitcherControl';

const Widget = (opts = {}) => ({
  name: 'language-switcher',
  LanguageSwitcherControl,
  ...opts,
});

export { Widget, LanguageSwitcherControl, ObjectWithLanguageSwitcherControl };
