import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandX,
} from '@tabler/icons-react'
import { type Icon } from '@tabler/icons-react/dist/esm/types'

import { IconDevTo, IconTelegram } from '~/components/Icons/Icons'

type Link = {
	href: `https://${string}`
	title: string
	Icon: Icon
}

export const links: Link[] = [
	{
		href: 'https://t.me/grawlcore',
		title: 'Telegram',
		Icon: IconTelegram,
	},
	{
		href: 'https://x.com/grawlcore',
		title: 'X / Twitter',
		Icon: IconBrandX,
	},
	{
		href: 'https://github.com/grawl',
		title: 'GitHub',
		Icon: IconBrandGithub,
	},
	{
		href: 'https://dev.to/grawl',
		title: 'dev.to',
		Icon: IconDevTo,
	},
	{
		href: 'https://ru.linkedin.com/in/grawl',
		title: 'LinkedIn',
		Icon: IconBrandLinkedin,
	},
]
