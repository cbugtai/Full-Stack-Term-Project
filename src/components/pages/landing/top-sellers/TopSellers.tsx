import type { Seller } from "@/types/sellerModel";
import { SellersListDisplay } from "@/components/common/sellers/sellersListDisplay/SellersListDisplay";
import "./TopSellers.css"

export default function TopSellers({ 
    sellers, 
    setSellers 
}: { 
    sellers: Seller[]; 
    setSellers: React.Dispatch<React.SetStateAction<Seller[]>> 
}) {
    return (
        <section className="top-sellers">
            <h2>Top Sellers By Rating</h2>

            <div className="top-sellers__list" role="region" tabIndex={0}>
                <SellersListDisplay 
                sellers={
                    sellers.sort((a, b) => b.rating - a.rating)
                    .slice(0, 9).filter(seller => !seller.isBlocked)} 
                setSellers={setSellers} />
            </div>

        </section>
    )
}

function RankingCss({index}: {index:number}){
    let ranking = `unranked` 

    if(index == 0){
        ranking = 'gold'
    }
    if(index == 1){
        ranking = 'silver'
    }
    if(index == 2){
        ranking = 'bronze'
    }
    return(
        <div className={ranking}>
            #{index +1}
        </div>
    )
}
