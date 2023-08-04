"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const Form = () => {
  // const miniLinks = "https://minilinks.com/";
  const miniLinks = "http://localhost:10091/rest/url/"; // todo:set this in application.properties?
  const [url, setUrl] = useState<string>("");
  const [origUrl, setOrigUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

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
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleLinkClick = async () => {
    const id = shortenedUrl.slice(shortenedUrl.length - miniLinks.length);
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
    <div>
      <input type="text" value={url} onChange={handleUrlChange} />
      <button onClick={handleCreateShortUrl}>Create Short URL</button>
      {shortenedUrl && (
        <p>
          Shortened URL: {/* <Link href="#" onClick={handleLinkClick}> */}
          <Link href="#" onClick={handleLinkClick}>
            {shortenedUrl}
          </Link>
        </p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Form;
