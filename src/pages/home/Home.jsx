import "../../style/SmartBasketCard.css";
import "../../App.css";

import offerData from "../../data/offerData";

import HeroSlider from "../../components/heroslider/HeroSlider";
import OfferCard from "../../components/cards/OfferCard";
import ServicesOffer from "../../components/servicesOffer/ServicesOffer";
import BannerSlider from "../../components/bannerslider/BannerSlider";

import HomeCategories from "../../components/home/HomeCategories";
import TodaysDeals from "../../components/home/TodaysDeals";
import SmartBasket from "../../components/home/SmartBasket";
import BestSeller from "../../components/home/BestSeller";
import Testimonials from "../../components/home/Testimonials";
import Newsletter from "../../components/home/Newsletter";

function Home() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[90%]">
        <HeroSlider />

        <HomeCategories />

        <TodaysDeals />

        <SmartBasket />

        <BestSeller />

        {/* Offers */}
        <div className="p-3 my-5">
          <div className="bg-gray-100 rounded-xl p-5">
            <h1 className="font-semibold text-gray-700 text-xl">
              Offers & Deals
            </h1>

            <div className="offer-container">
              {offerData.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="p-2 my-5">
          <div className="bg-gray-100 rounded-xl p-5">
            <ServicesOffer />
          </div>
        </div>

        <BannerSlider />

        <Testimonials />

        <Newsletter />
      </div>
    </div>
  );
}

export default Home;
