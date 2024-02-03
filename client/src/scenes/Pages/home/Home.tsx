import Subscribe from './Subscribe'
import MainCarousel from './MainCarousel'
import { TwoProductSortedList } from './TwoProductSortedList'
import { IOriginItem } from '../../../types/data'
import { useAppSelector } from '../../../../hook'
import { CollaborationHome } from './CollaborationHome'
import { Divider } from '../../global/Divider'
import { AboutHome } from './AboutHome'

function Home() {
  const items: IOriginItem[] = useAppSelector(state => state.origins.originItems)
  const homeItemsId = useAppSelector(state => state.home.homeItemsId)
  return (
    <div className='home'>
      <MainCarousel />
      <div className='container'>
        <Divider />
        {items && <TwoProductSortedList title={'Abstract Origin Work'} items={items} sort={'abstract'} firstItemId={homeItemsId?.firstOfAbstract} secondItemId={homeItemsId?.secondOfAbstract} />}
        <Divider />
        {items && <TwoProductSortedList title={'Nude Origin Work'} items={items} sort={'nude'} firstItemId={homeItemsId?.firstOfNude} secondItemId={homeItemsId?.secondOfNude} />}
        <Divider />
        {items && <TwoProductSortedList title={'Others Origin Work'} items={items} sort={'others'} firstItemId={homeItemsId?.firstOfOthers} secondItemId={homeItemsId?.secondOfOthers} />}
        <Divider />
        <AboutHome />
        <Divider />
        <CollaborationHome />
        <Divider />
        <Subscribe />
        <Divider />
      </div>
    </div>
  )
}

export default Home
