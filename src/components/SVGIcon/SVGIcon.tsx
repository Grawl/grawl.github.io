import { type FC } from 'react'

import type { IconProps } from '@tabler/icons-react/dist/esm/types'
import { clsx } from 'clsx'

import styles from './SVGIcon.module.css'

export type SVGIconProps = { mono?: boolean }

export const SVGIcon: FC<
	{ Icon: FC<IconProps> } & IconProps & SVGIconProps
> = ({ Icon, mono = true, className, ...rest }) => (
	<Icon
		className={clsx(styles.icon, className, mono && styles.mono)}
		{...rest}
	/>
)
