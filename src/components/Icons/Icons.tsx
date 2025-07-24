import { type FC } from 'react'

import { type Icon, type IconProps } from '@tabler/icons-react/dist/esm/types'
import { clsx } from 'clsx'
import Telegram from 'evil-icons/assets/icons/ei-sc-telegram.svg?react'

import { SVGIcon, type SVGIconProps } from '~/components/SVGIcon/SVGIcon'

import DevTo from './assets/devto.svg?react'

import styles from './Icons.module.css'

const makeIcon =
	(icon: Icon, makeClassName?: string): FC<IconProps & SVGIconProps> =>
	({ className, ...props }) => (
		<SVGIcon
			Icon={icon}
			className={clsx(className, makeClassName)}
			{...props}
		/>
	)

export const IconTelegram = makeIcon(Telegram, styles.telegram)
export const IconDevTo = makeIcon(DevTo)
