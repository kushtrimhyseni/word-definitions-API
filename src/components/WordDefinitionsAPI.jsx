import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";

const WordDefinitionsAPI = () => {
  const [word, setWord] = useState([]);
  const [error, setError] = useState("");
  const [inputField, setInputField] = useState("");
  const clearInput = useRef(null);

  const inputHandler = (event) => {
    setInputField(event.target.value);
  };

  const getDataFromInput = async (userInput) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`
      );
      setWord(response.data);
      setError("");
    } catch (e) {
      setError("Word not found, try another one!");
    }
  };
  const clickHandler = () => {
    getDataFromInput(inputField);
    clearInput.current.value = "";
  };
  return (
    <div className="flex flex-col pt-12">
      <div className="flex items-center justify-center ">
        <div className="flex border-2 border-mint-200 rounded">
          <input
            ref={clearInput}
            onChange={inputHandler}
            type="text"
            className="px-4 py-2 w-full md:w-80 border-none focus:outline-none"
            placeholder="Search..."
          />
          <button
            onClick={clickHandler}
            className="px-4 text-white bg-gray-600 border-l border-mint-200 outline:none "
          >
            Search
          </button>
        </div>
      </div>
      {error ? (
        <div className="flex justify-center items-center text-black-900 text-3xl mt-4">
          {error}
        </div>
      ) : (
        <div>
          {word.map((el) => {
            console.log(el);
            return (
              <div className="flex flex-col max-w-[1140px] mx-auto mt-4 md:mt-8">
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-center mb-4">
                  <span className="text-[#34495e] text-xl">
                    Word: {el.word.toUpperCase()}
                  </span>
                  <ReactAudioPlayer
                    src={el.phonetics[1].audio}
                    autoPlay
                    controls
                  />
                  <span className="text-[#34495e] text-xl ml-4">
                    Phonetic: {el.phonetic}
                  </span>
                </div>
                <div className="flex flex-col">
                  {el.meanings.map((meaning) => (
                    <div className="flex flex-col mb-4 shadow-md p-4 bg-[#ffffff]">
                      <span className="text-[#1c1c1c] font-medium text-md">
                        Part of Speech:{" "}
                        <span className="text-red-900 ml-2 mb-4">
                          {meaning.partOfSpeech}
                        </span>
                      </span>
                      <span className="text-[#1c1c1c] font-medium">
                        Defintion:
                      </span>
                      {meaning.definitions.map((definition) => {
                        return (
                          <div>
                            <li className="text-blue-900">
                              {definition.definition}
                            </li>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WordDefinitionsAPI;
