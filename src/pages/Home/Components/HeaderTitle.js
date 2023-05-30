import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const HeaderTitle = ({ title, exploreTitle = 'Explore' }) => (
    <div className="col-md-12">
        <div className="tf-heading style-2 wow fadeInUp !justify-start">
            <h4 className="heading text-4xl font-semibold">{title}</h4>
            <div className="load-more !absolute !right-0">
                <div className="btn-loadmore wow fadeInUp">
                    <Link to='/' className="tf-button loadmore style-4">{exploreTitle}</Link>
                </div>
            </div>
        </div>
    </div>
)

export default memo(HeaderTitle)