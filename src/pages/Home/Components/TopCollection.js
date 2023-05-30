import logoDefault from 'assets/images/ranking/ranking-df.png'
import { useRedirect } from 'hooks'
import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getListCollection } from 'services/collection'
import style from './TopCollection.module.css'


const TopCollection = () => {

    const [data, setData] = useState([]);
    const [totalRows, setTotalRow] = useState(0)
    const { redirectToPage } = useRedirect()

    useEffect(() => {
        getData()
    }, [])

    const getData = useCallback(async () => {
        try {
            const response = await getListCollection();
            const { rows = [], total = 0 } = (response?.data || {});
            setData(rows)
            setTotalRow(total);
        } catch (ex) {

        }
    }, [])

    const renderLogo = (src) => {
        if (src && src.startsWith('https://'))
            return <img src={src} alt="Tocen - NFT Marketplace" />
        else
            return <img src={logoDefault} alt="Tocen - NFT Marketplace" />
    }

    return (
        <section className="tf-section tf-collection">
            <div className="tf-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tf-heading style-2 wow fadeInUp !justify-start">
                            <h4 className="heading text-4xl font-semibold">{'Top Collection'}</h4>
                            <div className="load-more !absolute !right-0">
                                <div className="btn-loadmore wow fadeInUp flex">
                                    <div id="item_category" className="dropdown mr-1">
                                        <Link to="#" className="btn-selector nolink ">Last 7 days</Link>
                                        <ul >
                                            <li><span>Last 3 days</span></li>
                                            <li className="active"><span>Last 7 days</span></li>
                                            <li><span>Last 14 days</span></li>
                                            <li><span>Last 21 days</span></li>
                                        </ul>
                                    </div>
                                    <div id="item_category" className="dropdown">
                                        <Link to="#" className="btn-selector nolink ">Last 7 days</Link>
                                        <ul >
                                            <li><span>Last 3 days</span></li>
                                            <li className="active"><span>Last 7 days</span></li>
                                            <li><span>Last 14 days</span></li>
                                            <li><span>Last 21 days</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-4">
                        <div className="table-ranking">
                            <div className="title-ranking">
                                <div className="col-ranking">#</div>
                                <div className="col-ranking">Collection</div>
                                <div className="col-ranking">Floor</div>
                                <div className="col-ranking">Sale (24H)</div>
                                <div className="col-ranking">Total Volume</div>
                                <div className="col-ranking">Owners</div>
                                <div className="col-ranking">Items</div>
                            </div>
                        </div>
                        <div className="table-ranking tf-filter-container">

                            {
                                data.map((idx, index) => (
                                    <div
                                        key={idx.id}
                                        className={`content-ranking tf-loadmore 3d anime music ${style.row} cursor-pointer`}
                                        onClick={() => redirectToPage(`collection/${idx.id}`)}
                                    >
                                        <div className="col-ranking">{(index + 1)}</div>
                                        <div className="col-ranking"><div className="image">
                                            {renderLogo(idx.logo)}
                                            <div className="icon"><i className="fas fa-check"></i></div></div> {idx.name}</div>
                                        <div className="col-ranking">${idx.floorVolume1d}</div>
                                        <div className="col-ranking">${idx.volume1d}</div>
                                        <div className="col-ranking">${idx.volume7d}</div>
                                        <div className="col-ranking">{idx.owners}</div>
                                        <div className="col-ranking">{idx.total_items}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-12 mt-8">
                            <div className="load-more">
                                <div className="btn-loadmore wow fadeInUp">
                                    <Link to='/' className="tf-button loadmore style-4">View All </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default memo(TopCollection)