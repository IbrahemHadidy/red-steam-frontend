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
  Username = 'username',
  Email = 'email',
  Country = 'country',
  Verified = 'isVerified',
  Admin = 'isAdmin',
  CreatedAt = 'createdAt',
}

/**
 * Enum representing available admin types.
 */
export const enum AdminType {
  Developer = 'Developer',
  Publisher = 'Publisher',
  Feature = 'Feature',
  Tag = 'Tag',
  Language = 'Language',
  Review = 'Review',
  Offer = 'Offer',
  CreateOffer = 'CreateOffer',
}

/**
 * Enum representing available game admin types.
 */
export const enum GameAdminType {
  Create = 'Create',
  Update = 'Update',
}

export const enum CurrentGameAdminPage {
  Basic = 'Basic',
  Companies = 'Companies',
  Thumbnails = 'Thumbnails',
  Media = 'Media',
  Pricing = 'Pricing',
  Specifications = 'Specifications',
  SystemRequirements = 'SystemRequirements',
  AdditionalInfo = 'AdditionalInfo',
  Preview = 'Preview',
}

/**
 * Enum representing available game media change statuses.
 */
export const enum GameMediaChangeStatus {
  Added = 'Added',
  Deleted = 'Deleted',
  Unchanged = 'Unchanged',
}
