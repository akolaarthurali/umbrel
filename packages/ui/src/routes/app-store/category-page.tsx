import {useParams} from 'react-router-dom'

import {useUmbrelTitle} from '@/hooks/use-umbrel-title'
import {ConnectedAppStoreNav} from '@/modules/app-store/app-store-nav'
import {categoryDescriptionsKeyed, Categoryish} from '@/modules/app-store/constants'
import {AppsGridFaintSection} from '@/modules/app-store/discover/apps-grid-section'
import {useAvailableApps} from '@/providers/available-apps'

export default function CategoryPage() {
	return (
		<>
			<ConnectedAppStoreNav />
			<CategoryContent />
		</>
	)
}

function CategoryContent() {
	const {categoryishId} = useParams<{categoryishId: Categoryish}>()
	const {appsGroupedByCategory, apps, isLoading} = useAvailableApps()

	useUmbrelTitle(categoryishId ? categoryDescriptionsKeyed[categoryishId].label() : '')

	// Probably invalid url param
	if (!categoryishId) return null
	if (isLoading) return null

	const categoryId = categoryishId === 'discover' || categoryishId === 'all' ? null : categoryishId

	const filteredApps = categoryId ? appsGroupedByCategory[categoryId] : apps
	const title = categoryDescriptionsKeyed[categoryishId].label()

	return <AppsGridFaintSection title={title} apps={filteredApps} />
}
