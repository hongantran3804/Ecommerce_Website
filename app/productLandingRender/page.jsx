import ProductLandingRender from '@components/ProductLandingRender'
import { pageCategories } from '@utils/utils'
import React from 'react'
const page = () => {
  return (
    <ProductLandingRender pageCategories={pageCategories} />
  )
}

export default page