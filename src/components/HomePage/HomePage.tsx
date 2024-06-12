"use client"; // This is a client component 👈🏽
import { FaPlus } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {}
const HomePage: React.FC<Props> = ({}) => {
  const [inputText, setInputText] = useState<string>();
  const [booksData, setBooksData] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resFound, setResFound] = useState<boolean | null>(null);
  const router = useRouter();

  const notify = (msg: string) =>
    toast(msg, {
      position: "top-left",
    });

  useEffect(() => {
    if (inputText) {
      const getData = setTimeout(() => {
        setIsLoading(true);
        axios
          .get(
            `https://openlibrary.org/search.json?q=${inputText}&limit=10&page=1`,
          )
          .then((response) => {
            return response;
          })
          .then((data) => {
            setIsLoading(false);
            data.data.numFound >= 0 ? setResFound(true) : setResFound(false);
            setBooksData(data.data.docs);
          });
      }, 2000);

      return () => clearTimeout(getData);
    } else {
      setBooksData([]);
      setResFound(null);
    }
  }, [inputText]);

  const trackUserInput = (userInput: string) => {
    setInputText(userInput);
  };
  const bookShelfHandler = (data: any) => {
    const bookItems = localStorage.getItem("booksData");
    if (bookItems && bookItems.length > 0) {
      let books = JSON.parse(bookItems);

      for (let book of books) {
        if (book.title === data.title) {
          notify("Book exists in bookshelf aready");
          return;
        }
      }

      let result = [...books, data];
      localStorage.setItem("booksData", JSON.stringify(result));
      notify("Book added to bookshelf");
    } else {
      let result = [data];
      localStorage.setItem("booksData", JSON.stringify(result));
      notify("Book added to bookshelf");
    }
  };

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
    <div className="w-[90%] h-[80vh] flex flex-col slide-up-fade-in">
      <ToastContainer />
      <div className="bg-white rounded-t-xl">
        {/* Search bar */}
        <div className="flex flex-col mb-4 w-full items-center mx-auto relative">
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
              Book Locator
            </p>
          </div>

          <div className="absolute top-[10px] right-[5px] ">
            <button
              className="btn btn-2"
              onClick={() => router.push("/bookshelf")}
            >
              Book Shelf
            </button>
          </div>
          <form action="">
            <div className="flex gap-x-5 mt-[32px] items-center">
              <input
                className="w-[372px] p-5 h-[32px] bg-[#f1ecf0] focus:outline-none focus-visible:shadow-md rounded-full shadow-sm"
                placeholder="Enter a book name..."
                type="text"
                onChange={(e) => trackUserInput(e.target.value)}
              />
            </div>
          </form>
          {/* MESH LOADER  */}
          {isLoading && (
            <div className="flex justify-center items-center w-full">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-b-xl max-h-[400px] overflow-y-auto scroll2">
        <div className="p-[30px] mt-12 flex gap-4 flex-wrap">
          {!isLoading &&
            booksData &&
            booksData.length > 0 &&
            booksData.map((bookData: any, idx) => {
              return (
                <div
                  key={idx}
                  className="flip-card min-h-[250px] h-auto slide-up-fade-in"
                >
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
                      <div
                        className="rounded-full bg-slate-500 cursor-pointer flex items-center justify-center w-[30px] h-[30px] absolute top-[10px] right-[10px]"
                        onClick={(e) => {
                          let data = {
                            title: bookData.title,
                            first_publish_year: bookData.first_publish_year,
                            author_name: bookData.author_name,
                            language: bookData.language[0],
                            publisher: bookData.publisher[0],
                          };
                          bookShelfHandler(data);
                        }}
                      >
                        <FaPlus color="white" size={22} />
                      </div>

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

          {booksData.length === 0 && resFound && (
            <div className="flex justify-center text-slate-400 w-full">
              Books not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
