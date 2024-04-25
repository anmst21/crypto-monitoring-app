"use client";
import CardHeader from "./CardHeader";
import BiggestMovers from "./BiggestMovers";
import classNames from "classnames";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  formatName,
  formatPrice,
  formatChangePercent,
  formatBigDollars,
} from "@/utils";

export interface CryptoItemProps {
  changePercent: number;
  changePrice: number;
  marketCap: number;
  price: number;
  priceAvg200: number;
  priceAvg50: number;
  symbol: string;
  volume: number;
  yearHigh: number;
  yearLow: number;
}

export type Cards = CryptoItemProps[] | [];
const baseUrl =
  "https://crypto-app-test-9eac940fe09e.herokuapp.com/main_page/volume";

export const textClass = (direction: boolean | null) =>
  classNames({
    "text-green-600": direction,
    "text-grey-600": direction === null,
    "text-red-600": !direction && direction !== null,
    "inline-block": true,
  });

export default function Cards() {
  const [cards, setCards] = useState<Cards>([]);
  const [page, setPage] = useState<number>(1);

  const fetchCryptoData = async (page: number) => {
    const limit = 15;
    const offset = (page - 1) * limit;
    const url = `${baseUrl}?limit=${limit}&offset=${offset}`;

    try {
      const { data } = await axios.get<CryptoItemProps[]>(url);
      console.log(data);
      setCards(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setCards([]);
    }
  };

  useEffect(() => {
    fetchCryptoData(page);
  }, [page]);

  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-row  ">
      <div className="w-3/4 pt-10">
        <CardHeader />
        {cards &&
          cards.map((item: CryptoItemProps) => (
            <div
              key={item.symbol}
              className="mb-10 flex flex-row justify-between"
            >
              <div className="flex-1 flex justify-center">
                <h1 className="inline-block">{formatName(item.symbol)}</h1>
              </div>
              <div className="flex-1 flex justify-center">
                <p className="inline-block">{formatPrice(item.price)}</p>
              </div>
              <div className="flex-1 flex justify-center">
                <p
                  className={textClass(
                    formatChangePercent(item.changePercent).direction
                  )}
                >
                  {formatChangePercent(item.changePercent).price}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <p className="inline-block">
                  {formatBigDollars(item.marketCap)}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <p className="inline-block">{formatBigDollars(item.volume)}</p>
              </div>
            </div>
          ))}
        <div className="flex flex-row justify-center gap-4 mt-4 mb-10 font-semibold">
          <button onClick={handlePrevPage}>Back</button>
          <p className="font-normal">{page}</p>
          <button onClick={handleNextPage}>Forward</button>
        </div>
      </div>
      <BiggestMovers />
    </div>
  );
}
