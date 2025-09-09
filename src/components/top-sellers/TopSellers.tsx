import type { JSX } from "react";
import sellers from "./sellers_list.json"
import type { Seller } from "./sellerModel"
import "./TopSellers.css"

export default function TopSellers() {
    return (
        <>
            <main>
                <ListDisplay sellers={sellers}/>
            </main>
        </>
    )
}

function ListDisplay({sellers}: {sellers:Seller[]}) {
    const topSellersList: JSX.Element[] = [];

    //sorts the sellers list by descending rating
    const sortedSellers = [...sellers].sort((b,a) => (a.rating - b.rating));

    sortedSellers.forEach((seller, index) => {
        topSellersList.push(
            <SellerCard 
            seller={seller}
            index={index}
            key={index} 
            />
        )
    });

    return (
        <section className="top-sellers">
            <h2>Top Sellers By Rating:</h2>
            <div className="top-sellers__list">
                {topSellersList}
            </div>
        </section>
    );
}

function SellerCard({ seller, index }: { seller: Seller, index: number }) {
    return (
        <div className="seller-card">
            <img src={seller.photo} alt="Seller Avatar" width="50" height="50" />
            <div className="seller-name">
                {seller.username}
            </div>
            <div className="seller-rating">
                Trustworthiness Rating: {seller.rating}/100
            </div>
            <div className="seller-sold">
                {seller.completed_sales} Completed Sales
            </div>
            <div className="seller-rank">
                #{index+1}
            </div>
        </div>
    );
}