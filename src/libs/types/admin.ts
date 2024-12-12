import type { Direction, UserSortOption } from '@enums/admin';
import type { Company } from '@interfaces/company';
import type { Feature } from '@interfaces/feature';
import type { Game } from '@interfaces/game';
import type { Language } from '@interfaces/language';
import type { Review } from '@interfaces/review';
import type { Tag } from '@interfaces/tag';

/**
 * Type representing the configuration for sorting users in the admin panel.
 */
export type UserSortConfig = { key: UserSortOption; direction: Direction };

/**
 * Type representing the configuration for sorting items in the admin panel.
 */
export type ItemSortConfig = { key: string; direction: Direction };

/**
 * Type representing the search query parameters for users in the admin panel.
 */
export type SearchQuery = { [key: string]: string };

/**
 * Type representing a list item in the admin panel.
 */
export type AdminListItem = Feature | Company | Tag | Language | Review | Game;
