import {
  Cog6ToothIcon as Cog6ToothIconOutline,
  UserIcon as UserIconOutline,
  HomeIcon as HomeIconOutline,
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleIconOutline,
  PencilIcon as PencilIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  BellIcon as BellIconOutline,
  EnvelopeIcon as EnvelopeIconOutline,
  PencilSquareIcon as PencilSquareIconOutline,
  TrashIcon as TrashIconOutline,
  XCircleIcon as XCircleIconOutline,
  EllipsisVerticalIcon as EllipsisVerticalIconOutline,
  HeartIcon as HeartIconOutline,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconOutline,
  ArrowPathIcon as ArrowPathIconOutline,
  CalendarDaysIcon as CalendarDaysIconOutline,
  ListBulletIcon as ListBulletIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  UsersIcon as UsersIconOutline,
  CheckBadgeIcon as CheckBadgeIconOutline,
  EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconOutline,
  HandThumbDownIcon as HandThumbDownIconOutline,
  FaceFrownIcon as FaceFrownIconOutline,
  UserPlusIcon as UserPlusIconOutline,
  SpeakerXMarkIcon as SpeakerXMarkIconOutline,
  NoSymbolIcon as NoSymbolIconOutline,
  PresentationChartBarIcon as PresentationChartBarIconOutline,
  CodeBracketIcon as CodeBracketIconOutline,
  FlagIcon as FlagIconOutline,
} from '@heroicons/react/24/outline'
import {
  Cog6ToothIcon as Cog6ToothIconSolid,
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleIconSolid,
  PencilIcon as PencilIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  BellIcon as BellIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
  TrashIcon as TrashIconSolid,
  XCircleIcon as XCircleIconSolid,
  EllipsisVerticalIcon as EllipsisVerticalIconSolid,
  HeartIcon as HeartIconSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
  ArrowPathIcon as ArrowPathIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  ListBulletIcon as ListBulletIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UsersIcon as UsersIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
  EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
  FaceFrownIcon as FaceFrownIconSolid,
  UserPlusIcon as UserPlusIconSolid,
  SpeakerXMarkIcon as SpeakerXMarkIconSolid,
  NoSymbolIcon as NoSymbolIconSolid,
  PresentationChartBarIcon as PresentationChartBarIconSolid,
  CodeBracketIcon as CodeBracketIconSolid,
  FlagIcon as FlagIconSolid,
} from '@heroicons/react/24/solid'

import tailwindConfig from '@/../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

export type HeroIcon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string
    titleId?: string
  } & React.RefAttributes<SVGSVGElement>
>
export enum sideBarListNames {
  HOME = 'Home',
  EXPLORE = 'Explore',
  NOTIFICATIONS = 'Notifications',
  MESSAGES = 'Messages',
  LISTS = 'Lists',
  BOOKMARKS = 'Bookmarks',
  COMMUNITIES = 'Communities',
  VERIFIED = 'Verified',
  PROFILE = 'Profile',
  MORE = 'More',
  CONNECT = 'Connect',
  MONETIZATION = 'Monetization',
  CREATOR_STUDIO = 'Creator Studio',
  PROFESSIONAL_TOOLS = 'Professional Tools',
  SETTINGS_AND_SUPPORT = 'Settings and Support',
  LOGOUT = 'Logout',
  NOTHING = 'Nothing',
  TEST = 'TEST',
}

export enum BottomNavBarListNames {
  HOME = 'Home',
  SEARCH = 'Search',
  NOTIFICATIONS = 'Notifications',
  MAIL = 'Mail',
}

export enum BottomActionDialogListNames {
  EDIT = 'Edit',
  DELETE = 'Delete',
  CANCEL = 'Cancel',
  NOTHING = 'Nothing',
}

export const ICONS = {
  OUTLINE: {
    SETTINGS: Cog6ToothIconOutline,
    USER: UserIconOutline,
    HOME: HomeIconOutline,
    LOGOUT: ArrowLeftOnRectangleIconOutline,
    POST: PencilIconOutline,
    SEARCH: MagnifyingGlassIconOutline,
    NOTIFICATIONS: BellIconOutline,
    MAIL: EnvelopeIconOutline,
    EDIT: PencilSquareIconOutline,
    DELETE: TrashIconOutline,
    CANCEL: XCircleIconOutline,
    MORE: EllipsisVerticalIconOutline,
    LIKE: HeartIconOutline,
    COMMENT: ChatBubbleLeftEllipsisIconOutline,
    SHARE: ArrowPathIconOutline,
    DATE: CalendarDaysIconOutline,
    LISTS: ListBulletIconOutline,
    BOOKMARK: BookmarkIconOutline,
    COMMUNITY: UsersIconOutline,
    VERIFIED: CheckBadgeIconOutline,
    MORE_CIRCLE: EllipsisHorizontalCircleIconOutline,
    // for more menu
    THUMB_DOWN: HandThumbDownIconOutline,
    SAD_FACE: FaceFrownIconOutline,
    ADD_USER: UserPlusIconOutline,
    MUTE: SpeakerXMarkIconOutline,
    BLOCK: NoSymbolIconOutline,
    STATS: PresentationChartBarIconOutline,
    EMBED: CodeBracketIconOutline,
    REPORT: FlagIconOutline,
  },
  SOLID: {
    SETTINGS: Cog6ToothIconSolid,
    USER: UserIconSolid,
    HOME: HomeIconSolid,
    LOGOUT: ArrowLeftOnRectangleIconSolid,
    POST: PencilIconSolid,
    SEARCH: MagnifyingGlassIconSolid,
    NOTIFICATIONS: BellIconSolid,
    MAIL: EnvelopeIconSolid,
    EDIT: PencilSquareIconSolid,
    DELETE: TrashIconSolid,
    CANCEL: XCircleIconSolid,
    MORE: EllipsisVerticalIconSolid,
    LIKE: HeartIconSolid,
    COMMENT: ChatBubbleLeftEllipsisIconSolid,
    SHARE: ArrowPathIconSolid,
    DATE: CalendarDaysIconSolid,
    LISTS: ListBulletIconSolid,
    BOOKMARK: BookmarkIconSolid,
    COMMUNITY: UsersIconSolid,
    VERIFIED: CheckBadgeIconSolid,
    MORE_CIRCLE: EllipsisHorizontalCircleIconSolid,
    // for more menu
    THUMB_DOWN: HandThumbDownIconSolid,
    SAD_FACE: FaceFrownIconSolid,
    ADD_USER: UserPlusIconSolid,
    MUTE: SpeakerXMarkIconSolid,
    BLOCK: NoSymbolIconSolid,
    STATS: PresentationChartBarIconSolid,
    EMBED: CodeBracketIconSolid,
    REPORT: FlagIconSolid,
  },
}

export const SERVER_BASE_URL = 'http://127.0.0.1:3000'
export const IMAGE_UPLOAD_URL = 'http://127.0.0.1:3000/upload'

export const TAILWIND_CONFIG = resolveConfig(tailwindConfig) as any

export type SCREEN_VARIANTS = 'SM' | 'MD' | 'LG' | 'XL'
export const SCREENS = {
  SM: TAILWIND_CONFIG.theme.screens.sm,
  MD: TAILWIND_CONFIG.theme.screens.md,
  LG: TAILWIND_CONFIG.theme.screens.lg,
  XL: TAILWIND_CONFIG.theme.screens.xl,
}
