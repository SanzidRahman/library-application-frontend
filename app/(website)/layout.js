import MegaNavbar from '@/components/megaNavbar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div><MegaNavbar />{children}</div>
    )
}

export default layout