"use client"; // This is a client component 👈🏽
import { FaPlus } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {}
const BookShelf: React.FC<Props> = ({}) => {
  const [inputText, setInputText] = useState<string>();
  const [booksData, setBooksData] = useState<object[]>([]);

  useEffect(() => {
    const bookItems = localStorage.getItem("booksData");
    if (bookItems && bookItems.length > 0) {
      let books = JSON.parse(bookItems);
      setBooksData(books);
    } else {
    }
  }, [inputText]);

  const cardColors = [
    {
      bgColor: "#2E2E39",
      headColor: "#90E2CF",
      txtColor: "white",
    },
    {
      bgColor: "#142139",
      headColor: "#F4ADAD",
      txtColor: "white",
    },
    {
      bgColor: "#173038",
      headColor: "#C6FCA6",
      txtColor: "white",
    },
    {
      bgColor: "#33293B",
      headColor: "#F5C5E9",
      txtColor: "white",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center bg-[url('/img/bg-gradient.png')]">
      <div className="w-[90%] my-6 min-h-[75vh] h-auto bg-white rounded-xl">
        {/* Search bar */}
        <div className="flex flex-col w-2/4 items-center mx-auto">
          <div
            className="mt-6"
            style={{
              color: "transparent !important",
              opacity: 0.999,
            }}
          >
            <p
              className="text-[42px] font-bold text-center"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("/img/applemusicgradient.png")`,
                backgroundSize: "100%",
                backgroundClip: "text",
              }}
            >
              My Book Shelf
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="p-[20px] mt-12 flex gap-4 flex-wrap justify-start max-h-[400px] overflow-y-auto scroll2 slide-up-fade-in">
          {booksData &&
            booksData.length > 0 &&
            booksData.map((bookData: any, idx) => {
              return (
                <div key={idx} className="flip-card min-h-[250px] h-auto">
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front rounded-2xl p-4 flex justify-center items-center flex-col gap-6 text-center"
                      style={{
                        backgroundColor:
                          cardColors[
                            Math.floor(Math.random() * (3 - 1 + 1) + 1)
                          ].bgColor,
                      }}
                    >
                      {/* Title */}
                      <p
                        className="text-[32px] font-bold"
                        style={{
                          color:
                            cardColors[
                              Math.floor(Math.random() * (3 - 1 + 1) + 1)
                            ].headColor,
                        }}
                      >
                        {bookData.title}
                      </p>
                      {/* Year */}
                      <p className="text-[24px] text-white font-bold">
                        {bookData.first_publish_year}
                      </p>
                    </div>
                    <div
                      className="flip-card-back rounded-2xl p-6 text-left"
                      style={{
                        backgroundColor: cardColors[0].bgColor,
                      }}
                    >
                      {/* Author */}

                      <p
                        className="text-[36px]  font-bold"
                        style={{
                          color:
                            cardColors[
                              Math.floor(Math.random() * (3 - 1 + 1) + 1)
                            ].headColor,
                        }}
                      >
                        {bookData.author_name}
                      </p>

                      <p className="text-[24px] text-white font-bold">
                        lng: {bookData.language[0]}
                      </p>
                      <p className="text-[24px] text-white font-bold">
                        {bookData.publisher[0]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default BookShelf;
