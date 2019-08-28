import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import styles from '../components/all.sass'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import { LanguageSwitcherControl } from './widgets/LanguageSwitcher/';

import { FullNameControl,  FullNamePreview } from './widgets/FullName';
import { defaultLanguage, languages } from '../locale/languageConfig';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewStyle(styles)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

CMS.registerWidget('fullname', FullNameControl, [ FullNamePreview ]);
LanguageSwitcherControl.defaultProps = {
  defaultLanguage,
  languages,
};
CMS.registerWidget('language-switcher', LanguageSwitcherControl);
