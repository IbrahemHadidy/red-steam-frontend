import { FilterTitle } from '@enums/search';

import type { FilterState } from '@custom-types/search';

export default function getFilterTypeFromTitle(title: FilterTitle): keyof FilterState {
  switch (title) {
    case 'Preference':
      return 'preferences';
    case 'Tag':
      return 'tags';
    case 'Feature':
      return 'features';
    case 'Developer':
      return 'developers';
    case 'Publisher':
      return 'publishers';
    case 'OS':
      return 'os';
    case 'Language':
      return 'languages';
    default:
      return 'price';
  }
}
