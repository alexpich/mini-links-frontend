"use client";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function Form2() {
  // const baseUrl = "https://minilinks.com/";
  const baseUrl = "http://localhost:10091/rest/url/"; // todo:set this in application.properties?
  const [url, setUrl] = useState<string>("");
  const [origUrl, setOrigUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [randomColor, setRandomColor] = useState("");

  const gradientColors = [
    "to-green-300",
    "to-pink-300",
    "to-yellow-300",
    "to-purple-300",
  ];

  // Function to generate a random color from an array of colors
  const getRandomColor = (colors: any) => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    // Generate a random color when the component mounts (initial page load)
    setRandomColor(getRandomColor(gradientColors));
  }, []);

  const createShortUrl = async (url: string): Promise<string> => {
    try {
      const response = await fetch("http://localhost:10091/rest/url", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: url,
      });

      if (response.ok) {
        const responseBody = await response.text();
        if (responseBody) {
          setError("");
          return responseBody;
        } else {
          setError("An error occurred while creating the short URL.");
          return "";
        }
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "An unknown error occurred");
        return "";
      }
    } catch (error) {
      setError("An unknown error occurred");
      return "";
    }
  };

  const handleCreateShortUrl = async () => {
    const shortened = await createShortUrl(url);
    setShortenedUrl(shortened);
    console.log(shortenedUrl);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleLinkClick = async () => {
    const id = shortenedUrl.slice(shortenedUrl.length - baseUrl.length);
    const response = await fetch(`http://localhost:10091/rest/url/${id}`);
    if (response.ok) {
      const data = await response.json();
      setOrigUrl(data.url);
      console.log("printing:" + data.url);
      if (data && data.url) {
        window.open(data.url, "_blank");
      } else {
        setError("An error occurred while retrieving the original URL1.");
      }
    } else {
      setError("An error occurred while retrieving the original URL2.");
    }
  };

  return (
    <div
      className={`bg-gradient-to-tr from-palette-primary ${randomColor} relative h-screen w-screen`}
    >
      {/* <img
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50"
        alt="main background image"
        src="https://source.unsplash.com/random"
      /> */}
      <div className="absolute filter inset-0 bg-gray-800 opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center w-5/6 max-w-lg mx-auto text-center">
        <div className="space-y-8">
          <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight">
            Shorten your URLs.{" "}
            <span className="text-palette-primary">MiniLinks.</span>
          </h1>
          <p className="font-secondary text-palette-light text-base md:text-lg lg:text-xl">
            {shortenedUrl != "" ? (
              <Link href="">baseUrl + shortenedUrl</Link>
            ) : (
              "Start using MiniLinks today."
            )}
          </p>
          <form className="font-secondary flex flex-shrink w-full px-2 max-w-lg mx-auto justify-center">
            <input
              className="border border-r-0 border-palette-light rounded-l-lg w-2/3
              focus:outline-none focus:ring-1 focus:ring-palette-primary px-4"
              type="text"
              required
              placeholder="Your URL here"
              value={url}
              onChange={handleUrlChange}
            />
            <button
              type="button"
              className={
                "py-3 px-4 bg-palette-primary hover:bg-palette-dark text-white text-sm sm:text-base font-semibold rounded-r-lg border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary"
              }
              onClick={handleCreateShortUrl}
            >
              Shorten URL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
