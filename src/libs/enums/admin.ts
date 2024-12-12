/**
 * Enum representing the direction of sorting.
 */
export const enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Enum representing available sorting options.
 */
export const enum UserSortOption {
  USERNAME = 'username',
  EMAIL = 'email',
  COUNTRY = 'country',
  VERIFIED = 'isVerified',
  ADMIN = 'isAdmin',
  CREATED_AT = 'createdAt',
}

/**
 * Enum representing available admin types.
 */
export const enum AdminType {
  DEVELOPER = 'DEVELOPER',
  PUBLISHER = 'PUBLISHER',
  FEATURE = 'FEATURE',
  TAG = 'TAG',
  LANGUAGE = 'LANGUAGE',
  REVIEW = 'REVIEW',
  OFFER = 'OFFER',
  CREATE_OFFER = 'CREATE_OFFER',
}

/**
 * Enum representing available game admin types.
 */
export const enum GameAdminType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export const enum CurrentGameAdminPage {
  BASIC = 'BASIC',
  COMPANIES = 'COMPANIES',
  THUMBNAILS = 'THUMBNAILS',
  MEDIA = 'MEDIA',
  PRICING = 'PRICING',
  SPECIFICATIONS = 'SPECIFICATIONS',
  SYSTEM_REQUIREMENTS = 'SYSTEM_REQUIREMENTS',
  ADDITIONAL_INFO = 'ADDITIONAL_INFO',
  PREVIEW = 'PREVIEW',
}

/**
 * Enum representing available admin list items.
 */
export const enum AdminListItem {
  FEATURE = 'FEATURE',
  COMPANY = 'COMPANY',
  TAG = 'TAG',
  LANGUAGE = 'LANGUAGE',
  REVIEW = 'REVIEW',
  GAME = 'GAME',
  OFFER = 'OFFER',
  CREATE_OFFER = 'CREATE_OFFER',
}

/**
 * Enum representing available game media change statuses.
 */
export const enum GameMediaChangeStatus {
  ADDED = 'ADDED',
  DELETED = 'DELETED',
  UNCHANGED = 'UNCHANGED',
}
