import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import ShopBG from "../assets/Shop/bg-breadcrumb.webp";
import { ChevronDown, Check } from "lucide-react";
import { IoIosStarOutline } from "react-icons/io";
import products from "../data/products";
import ProductListCard from "../data/ProductListCard";
import ProductCard from "../data/ProductCard";

import Footer from "./Footer";

import Floral from "../assets/Home/Beginner/Beginner-back_540x.webp";
import Geometric from "../assets/Home/Tiger-Aloe/Tiger-aloe-pink_600x.webp";
import Plaid from "../assets/Home/Pease-lily/Pease-lily-black-360x.webp";
import Striped from "../assets/Home/Philippine/Philippine-Back-540x.webp";

import Tiger from "../assets/Home/Tiger-Aloe/tiger-green-360x.png";
import Beginner from "../assets/Home/Beginner/Beginner-front_540x1.webp";
import Ruby from "../assets/Home/rubby-rubber/Rubby-rubber_540x.webp";

//grid icons
import { BiGridVertical, BiSolidGrid } from "react-icons/bi";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

const Shop = () => {
  const filterSectionStyle = {
    // Subtract the header height

    top: "300px",
  };

  const MAX_PRICE = 153;
  const MIN_PRICE = 0;
  const [openCollection, setOpenCollection] = useState(true);
  const [openAvailability, setOpenAvailability] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openSize, setOpenSize] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [openColor, setOpenColor] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [openFeature, setOpenFeature] = useState(true);

  //right side
  const [layout, setLayout] = useState("grid3");

  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });

  const [price, setPrice] = useState({
    min: 0,
    max: 153,
  });

  //use refs to measure content height for smooth transition
  const collectionRef = useRef(null);
  const availabilityRef = useRef(null);
  const priceRef = useRef(null);
  const sizeRef = useRef(null);
  const colorRef = useRef(null);
  const featureRef = useRef(null);

  const [heights, setHeights] = useState({
    collection: "auto",
    availability: "auto",
    price: "auto",
    size: "auto",
    color: "auto",
    feature: "auto",
  });

  //update heights when sections open/close
  useEffect(() => {
    const updateHeights = () => {
      setHeights({
        collection: openCollection
          ? `${collectionRef.current?.scrollHeight}px`
          : "0px",
        availability: openAvailability
          ? `${availabilityRef.current?.scrollHeight}px`
          : "0px",
        price: openPrice ? `${priceRef.current?.scrollHeight}px` : "0px",
        size: openSize ? `${sizeRef.current?.scrollHeight}px` : "0px",
        color: openColor ? `${colorRef.current?.scrollHeight}px` : "0px",
        feature: openFeature ? `${featureRef.current?.scrollHeight}px` : "0px",
      });
    };
    updateHeights();
  }, [
    openCollection,
    openAvailability,
    openPrice,
    openSize,
    openColor,
    openFeature,
  ]);

  const [activeThumb, setActiveThumb] = useState(null); // min or max

  const resetAvailability = () => {
    setAvailability({ inStock: false, outOfStock: false });
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: checked }));
  };

  const resetPrice = () => {
    setPrice({ min: 0, max: 153 });
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), price.max - 1);
    setPrice((prev) => ({ ...prev, min: value }));
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), price.min + 1);
    setPrice((prev) => ({ ...prev, max: value }));
  };

  const resetSize = () => {
    setSelectedSize(null);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const resetColor = () => {
    setSelectedColor(null);
  };

  const allColors = [
    { name: "Black", value: "#000000", count: 5 },
    { name: "Blue", value: "#0057FF", count: 3 },
    { name: "Floral", image: Floral, count: 2 },
    { name: "Geometric", image: Geometric, count: 1 },
    { name: "Grey", value: "#999999", count: 1 },
    { name: "Orange", value: "#FF7A00", count: 1 },
    { name: "Pink", value: "#FFB6C1", count: 5 },
    { name: "Plaid", image: Plaid, count: 2 },
    { name: "Red", value: "#FF0000", count: 2 },
    { name: "Striped", image: Striped, count: 1 },
    { name: "White", value: "#FFFFFF", count: 2 },
  ];

  const feature = [
    { name: "Tiger Aloe", image: Tiger, price: 150 },
    { name: "The Beginner Set", image: Beginner, price: 130 },
    { name: "Ruby Rubber Tree", image: Ruby, price: 90, DiscountPrice: 51 },
  ];

  const visibleColors = showAll ? allColors : allColors.slice(0, 5);

  //Right side

  return (
    <Layout className="relative ">
      <img
        src={ShopBG}
        alt="Shop Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <h1 className="flex items-center justify-center h-[300px] font-librebaskerville text-6xl  text-black ">
        Products
      </h1>

      {/* Left side product details */}
      <div className="container flex mx-auto ">
        <div
          className="w-[25%] bg-white px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8"
          style={filterSectionStyle}
        >
          {/*collection */}
          <div className="flex flex-col my-4 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenCollection(!openCollection);
              }}
              className="text-2xl flex justify-between font-librebaskerville mb-4"
            >
              Collections
              <span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openCollection ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>
            <div
              ref={collectionRef}
              style={{
                maxHeight: heights.collection,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openCollection && (
                <ul className="space-y-3 font-poppins pb-2">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-green-800">
                      Air Purifying
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-green-800">
                      Ceramic Pots
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-green-800">
                      Herb Seeds
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-green-800">
                      Indoor Plants
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* Availability */}
          <div className="flex flex-col my-4 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenAvailability(!openAvailability);
              }}
              className="text-2xl flex justify-between font-librebaskerville mb-4"
            >
              Availability
              <span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openAvailability ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            {/* Reset button show only when checkbox is ticked */}
            {openAvailability &&
              (availability.inStock || availability.outOfStock) && (
                <button
                  onClick={resetAvailability}
                  className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
                >
                  Reset
                </button>
              )}

            <div
              ref={availabilityRef}
              style={{
                maxHeight: heights.availability,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openAvailability && (
                <ul className="space-y-3 font-poppins">
                  <li className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={availability.inStock}
                      onChange={handleCheckBoxChange}
                      className="hover:text-black cursor-pointer"
                    />
                    <label
                      htmlFor="inStock"
                      className="text-gray-500 hover:text-green-800 cursor-pointer"
                    >
                      In Stock
                    </label>
                  </li>
                  <li className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="outOfStock"
                      name="outOfStock"
                      checked={availability.outOfStock}
                      onChange={handleCheckBoxChange}
                      className="hover:text-black cursor-pointer"
                    />
                    <label
                      htmlFor="outOfStock"
                      className="text-gray-500 hover:text-green-800 cursor-pointer"
                    >
                      Out of Stock
                    </label>
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* Price */}
          <div className="flex flex-col my-8 cursor-pointer">
            <h2
              onClick={() => {
                setOpenPrice(!openPrice);
              }}
              className="text-2xl flex justify-between font-librebaskerville mb-4"
            >
              Price
              <span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openPrice ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            {/* Reset button show only when price is change */}
            {openPrice && (price.min !== 0 || price.max !== 153) && (
              <button
                onClick={resetPrice}
                className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
              >
                Reset
              </button>
            )}

            <div
              ref={priceRef}
              style={{
                maxHeight: heights.price,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openPrice && (
                <div className="flex flex-col gap-4">
                  <label className=" text-gray-500 text-sm font-librebaskerville">
                    Price: ${price.min.toFixed(2)} — ${price.max.toFixed(2)}
                  </label>

                  <div className="w-full relative h-8">
                    {/* Track */}
                    <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-gray-300 rounded"></div>

                    {/* Active range */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-1 bg-black rounded"
                      style={{
                        left: `${(price.min / MAX_PRICE) * 100}%`,
                        right: `${100 - (price.max / MAX_PRICE) * 100}%`,
                      }}
                    ></div>

                    {/* Min Thumb */}
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      value={price.min}
                      onChange={handleMinChange}
                      onMouseDown={() => setActiveThumb("min")}
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer "
                      style={{ zIndex: activeThumb === "min" ? 20 : 10 }}
                    />

                    {/* Visual Min Thumb */}
                    <div
                      className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 "
                      style={{ left: `${(price.min / MAX_PRICE) * 100}%` }}
                    ></div>

                    {/* Max Thumb */}
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      value={price.max}
                      onChange={handleMaxChange}
                      onMouseDown={() => setActiveThumb("max")}
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer "
                      style={{ zIndex: activeThumb === "max" ? 20 : 10 }}
                    />

                    {/* Visual Max Thumb */}
                    <div
                      className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 "
                      style={{ left: `${(price.max / MAX_PRICE) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Size */}
          <div className="flex flex-col my-8 cursor-pointer">
            <button
              onClick={() => {
                // Handle dropdown toggle
                setOpenSize(!openSize);
              }}
              className="text-xl flex justify-between font-librebaskerville mb-4"
            >
              Size
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openSize ? "-rotate-180" : ""
                }`}
              />
            </button>

            {/* reset size button */}
            {openSize && selectedSize && (
              <button
                onClick={resetSize}
                className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
              >
                Reset
              </button>
            )}

            <div
              ref={sizeRef}
              style={{
                maxHeight: heights.size,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openSize && (
                <div className="flex gap-4  mt-2">
                  <button
                    onClick={() => handleSizeChange("30")}
                    className={`py-2 px-4 border hover:border-black rounded-full ${
                      selectedSize === "30"
                        ? "border-black bg-gray-200"
                        : "border-gray-400"
                    }`}
                  >
                    30{" "}
                    <span className="text-gray-500 text-sm font-poppins items-center justify-center">
                      cm
                    </span>
                  </button>
                  <button
                    onClick={() => handleSizeChange("50")}
                    className={`py-2 px-4 border hover:border-black rounded-full ${
                      selectedSize === "50"
                        ? "border-black bg-gray-200"
                        : "border-gray-400"
                    }`}
                  >
                    50{" "}
                    <span className="text-gray-500 text-sm font-poppins items-center justify-center">
                      cm
                    </span>
                  </button>
                  <button
                    onClick={() => handleSizeChange("60")}
                    className={`py-2 px-4  border hover:border-black rounded-full ${
                      selectedSize === "60"
                        ? "border-black bg-gray-200"
                        : "border-gray-400"
                    }`}
                  >
                    60{" "}
                    <span className="text-gray-500 text-sm font-poppins items-center justify-center">
                      cm
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Color */}
          <div className="flex flex-col my-4 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenColor(!openColor);
                setTimeout(() => {
                  setHeights((prev) => ({
                    ...prev,
                    color: openColor
                      ? "0px"
                      : `${colorRef.current?.scrollHeight}px`,
                  }));
                });
              }}
              className="text-2xl flex justify-between font-librebaskerville mb-4"
            >
              Color
              <span className="transition-transform duration-300">
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openColor ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            {/* Reset button show only when checkbox is ticked */}
            {openColor && selectedColor && (
              <button
                onClick={resetColor}
                className="self-start text-gray-600 mb-4 font-poppins text-sm border-b-2 border-gray-700 hover:text-red-700 "
              >
                Reset
              </button>
            )}

            <div
              ref={colorRef}
              style={{
                maxHeight: heights.color,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              {openColor && (
                <>
                  <div className="pb-2">
                    {visibleColors.map((color) => (
                      <div
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className="flex items-center justify-between cursor-pointer group my-2"
                      >
                        <div className="flex items-center gap-2 ">
                          {color.image ? (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                              <img
                                src={color.image}
                                alt={color.name}
                                loading="lazy"
                                className="object-cover w-full h-full"
                              />
                              {selectedColor === color.name && (
                                <Check className="absolute inset-0 m-auto  bg-black opacity-50 text-white w-8 h-8" />
                              )}
                            </div>
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer group-hover:opacity-80"
                              style={{ backgroundColor: color.value }}
                            >
                              {/* selected color show tick */}
                              {selectedColor === color.name && (
                                <Check
                                  size={24}
                                  className={`${
                                    color.value === "#FFFFFF"
                                      ? "text-black"
                                      : "text-white"
                                  }`}
                                />
                              )}
                            </div>
                          )}
                          <span className="text-sm font-poppins text-gray-700 hover:text-gray-950">
                            {color.name}
                          </span>
                        </div>

                        {/* right side count */}
                        <span
                          className={`text-sm px-2 py-0.5 rounded-full ${
                            selectedColor === color.name
                              ? "bg-green-900 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {color.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/*view more  */}
                  {allColors.length > 5 && (
                    <button
                      onClick={() => {
                        setShowAll(!showAll);
                        setTimeout(() => {
                          setHeights((prev) => ({
                            ...prev,
                            color: `${colorRef.current?.scrollHeight}px`,
                          }));
                        }, 10);
                      }}
                      className="text-sm mt-1 text-black hover:text-gray-500 w-full"
                    >
                      {showAll ? "- View More" : "+ View More"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Feature Product */}
          <div className="flex flex-col my-8 cursor-pointer">
            <h2
              onClick={() => {
                // Handle dropdown toggle
                setOpenFeature(!openFeature);
              }}
              className="text-2xl flex justify-between font-librebaskerville mb-4"
            >
              Feature Product
              <span className="transition-transform duration-300">
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openFeature ? "-rotate-180" : ""
                  }`}
                />
              </span>
            </h2>

            <div
              ref={featureRef}
              style={{
                maxHeight: heights.feature,
                transition: "max-height 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              {openFeature &&
                feature.map((item, index) => (
                  <div key={item.name} className="flex flex-col mt-4">
                    <div className="flex items-center ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-22 h-28  object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="ml-4 flex flex-col gap-2 ">
                        <div className="flex text-gray-400 ">
                          <IoIosStarOutline />
                          <IoIosStarOutline />
                          <IoIosStarOutline />
                          <IoIosStarOutline />
                          <IoIosStarOutline />
                        </div>
                        <h3 className="text-xl font-librebaskerville cursor-pointer">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-librebaskerville">
                          {item.DiscountPrice ? (
                            <>
                              <span className="line-through text-xs text-gray-500">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-gray-800 ml-1 text-sm">
                                ${item.DiscountPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-800 text-sm">
                                $ {item.price.toFixed(2)}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    {index !== feature.length - 1 && (
                      <div className="flex items-center justify-center h-px w-full mt-4 bg-gray-400" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right side product image */}
        <div className="w-[75%] bg-white px-6 py-8">
          <div className="flex flex-col px-6">
            <div className="flex items-center justify-between mb-6 ">
              <p className="text-sm text-gray-500">
                {" "}
                you've viewed 9 of 10 products
              </p>
              <div className="flex items-center gap-2">
                <div className=" p-2 flex items-center justify-center gap-2 border border-gray-500">
                  <HiOutlineBars3
                    onClick={() => setLayout("list")}
                    className={`text-2xl cursor-pointer ${
                      layout === "list" ? "text-black" : "text-gray-400"
                    }`}
                  />
                  <BiGridVertical
                    onClick={() => setLayout("grid")}
                    className={`text-2xl cursor-pointer  ${
                      layout === "grid" ? "text-black" : "text-gray-400"
                    }`}
                  />
                  <BiSolidGrid
                    onClick={() => setLayout("grid3")}
                    className={`text-2xl cursor-pointer  ${
                      layout === "grid3" ? "text-black" : "text-gray-400"
                    }`}
                  />
                  <TfiLayoutGrid4Alt
                    onClick={() => setLayout("grid4")}
                    className={`text-2xl cursor-pointer  ${
                      layout === "grid4" ? "text-black" : "text-gray-400"
                    }`}
                  />
                </div>

                <div className=" h-full w-full flex items-center justify-center relative">
                  <select className="p-3  self-start border border-gray-500 items-center text-sm font-librebaskerville cursor-pointer">
                    <option value="FeaturedFilter">Featured</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
              </div>
            </div>

            {/* product images */}
            <div
              className={
                layout === "list"
                  ? "flex flex-col gap-6"
                  : layout === "grid"
                  ? "grid grid-cols-2 gap-6"
                  : layout === "grid3"
                  ? "grid grid-cols-3 gap-6"
                  : "grid grid-cols-4 gap-6"
              }
            >
              {products.map((product) => (
                <div key={product.id}>
                  {layout === "list" ? (
                    <div>
                      <ProductListCard product={product} />
                    </div>
                  ) : (
                    <ProductCard product={product} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default Shop;
