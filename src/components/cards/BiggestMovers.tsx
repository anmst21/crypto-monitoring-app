"use client";
import { useState, useEffect } from "react";
import { Cards, CryptoItemProps, textClass } from ".";
import axios from "axios";
import { formatName, formatPrice, formatChangePercent } from "@/utils";

const url =
  "https://crypto-app-test-9eac940fe09e.herokuapp.com/main_page/biggest_movers";
export default function BiggestMovers() {
  const [cards, setCards] = useState<Cards>([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get<CryptoItemProps[]>(url);
      console.log("data movers", data);
      setCards(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setCards([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1  bg-teal-100 pt-10 pl-4 pr-6">
      <p className="mb-5 flex flex-row justify-between font-semibold inline-block">
        Biggest Movers
      </p>
      <div>
        {cards &&
          cards.map((item: CryptoItemProps) => (
            <div
              key={item.symbol}
              className="mb-10 flex flex-row justify-between align-center"
            >
              <div className="flex-1 flex   items-center">
                <h1>{formatName(item.symbol)}</h1>
              </div>
              <div className="align-end">
                <div className="flex-1 flex justify-center">
                  <p className="inline-block">
                    {formatPrice(item.changePercent)}
                  </p>
                </div>
                <div className="flex-1 flex justify-end">
                  <p
                    className={textClass(
                      formatChangePercent(item.price).direction
                    )}
                  >
                    {formatChangePercent(item.price).price}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
