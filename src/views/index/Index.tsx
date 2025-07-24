import { type FC } from 'react'

import { Stack, Title, Typography } from '@mantine/core'

import { Links } from '~/components/Links/Links'
import { indexViewTitle } from '~/views/index/lib'

import styles from './Index.module.css'

const email = 'mail@grawl.ru'

export const IndexView: FC = () => (
	<Stack className={styles.root}>
		<Stack className={styles.text}>
			<Title className={styles.title}>{indexViewTitle}</Title>
			<Typography>
				<a href={`mailto:${email}`}>{email}</a>
			</Typography>
		</Stack>
		<Links />
	</Stack>
)
