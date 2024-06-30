"use client"
import React from "react";
import { useEffect, useRef } from "react";
const GoogleTranslate = () => {
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    let intervalId;
    const checkGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        clearInterval(intervalId);
        return new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout:
              window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          googleTranslateRef.current
        );
      }
    };
    intervalId = setInterval(checkGoogleTranslate, 100);
  }, []);
  return (
      <div
        ref={googleTranslateRef}
        id="google_translate_element"
        className="w-auto font-bold flex flex-row"
      ></div>
  );
};

export default GoogleTranslate;
