import { useSellers } from "../../../../hooks/useSellers";
import type { SellerDto as Seller} from "../../../../../../../shared/types/seller-terms"
import "./TopSellers.css"

export default function TopSellers() {

    const { sellers } = useSellers([], (s: Seller) => !s.isBlocked)

    const topSellers = [...sellers]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    return (
        <section className="top-sellers">
            <h2>Top Sellers By Rating</h2>

            <div className="top-sellers__list" role="region" tabIndex={0}>
                {topSellers.map((seller, index) => (
                    <div className="seller-card" key={seller.id}>
                        <img
                            src={seller.photo ?? "/placeholder-avatar.png"}
                            alt="Seller Avatar"
                            width={50}
                            height={50}
                        />

                        <div className="seller-name">{seller.username}</div>

                        <div className="seller-rating">
                            Rating: {seller.rating}%
                        </div>

                        <div className="seller-sales">
                            {seller.completedSales} Completed Sales
                        </div>

                        <div className={`rank-badge rank-${index}`}>
                            #{index + 1}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}