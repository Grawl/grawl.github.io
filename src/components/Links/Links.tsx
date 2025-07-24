import { type FC } from 'react'

import { ActionIcon } from '@mantine/core'

import { links } from '~/lib/constants'

import styles from './Links.module.css'

export const Links: FC = () => (
	<div className={styles.root}>
		{links.map(({ href, title, Icon }) => (
			<ActionIcon
				key={href}
				component='a'
				href={href}
				title={title}
				target='_blank'
				radius='xl'
				variant='subtle'
				color='currentColor'
				className={styles.actionIcon}
			>
				<Icon />
			</ActionIcon>
		))}
	</div>
)
