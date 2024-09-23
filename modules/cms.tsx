"use client";
import React, { useState, useEffect } from "react";
import {
  getVideo,
  updateVideo,
  getDadcraftSrc,
  getDadcraftTitle,
  updateDadcraftSrc,
  updateDadcraftTitle,
  getDrinkwearSrc,
  getDrinkwearTitle,
  updateDrinkwearSrc,
  updateDrinkwearTitle,
  getSublimationSrc,
  getSublimationTitle,
  updateSublimationSrc,
  updateSublimationTitle,
  getMilitarySrc,
  getMilitaryTitle,
  updateMilitarySrc,
  updateMilitaryTitle,
  updateCustomSrc,
  updateCustomTitle,
  getCustomTitle,
  getCustomSrc,
} from "@/lib/data/cms-getters";

type CardData = {
  src: string;
  title: string;
};

type SectionData = {
  [key: string]: CardData;
};

type CardsData = {
  dadcrafts: SectionData;
  military: SectionData;
  drinkwear: SectionData;
  sublimation: SectionData;
  custom: SectionData
};

const DadcraftingCMS: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [videoEditMode, setVideoEditMode] = useState<boolean>(false);

  const [cardsData, setCardsData] = useState<CardsData>({
    dadcrafts: {},
    military: {},
    drinkwear: {},
    sublimation: {},
    custom: {}
  });

  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});

  const numberToWord = ["", "One", "Two", "Three", "Four", "Five", "Six"];

  useEffect(() => {
    const fetchVideo = async () => {
      const src = await getVideo();
      setVideoSrc(`${src}`);
    };

    const fetchSectionData = async (
      section: keyof CardsData,
      getSrcFunc: (cardName: string) => Promise<string | null>,
      getTitleFunc: (cardName: string) => Promise<string | null>
    ) => {
      const sectionData: SectionData = {};
      for (let i = 1; i <= 6; i++) {
        const cardName = `card${numberToWord[i]}`;
        const src = await getSrcFunc(cardName);
        const title = await getTitleFunc(cardName);
        sectionData[cardName] = { src: src || "", title: title || "" };
      }
      setCardsData((prev) => ({
        ...prev,
        [section]: sectionData,
      }));
    };

    const fetchData = async () => {
      await fetchSectionData("dadcrafts", getDadcraftSrc, getDadcraftTitle);
      await fetchSectionData("military", getMilitarySrc, getMilitaryTitle);
      await fetchSectionData("drinkwear", getDrinkwearSrc, getDrinkwearTitle);
      await fetchSectionData(
        "sublimation",
        getSublimationSrc,
        getSublimationTitle
      );
      await fetchSectionData("custom", getCustomSrc, getCustomTitle);
    };

    fetchVideo();
    fetchData();
  }, []);

  const handleVideoUpdate = async () => {
    await updateVideo(videoSrc);
    setVideoEditMode(false);
    window.location.reload();
  };

  const handleCardUpdate = async (
    section: keyof CardsData,
    cardName: string,
    updateSrcFunc: (cardName: string, newSrc: string) => Promise<void>,
    updateTitleFunc: (cardName: string, newTitle: string) => Promise<void>
  ) => {
    const sectionData = cardsData[section];
    await updateSrcFunc(cardName, sectionData[cardName].src);
    await updateTitleFunc(cardName, sectionData[cardName].title);
    setEditMode((prev) => ({ ...prev, [`${section}-${cardName}`]: false }));
    window.location.reload();
  };

  const handleInputChange = (
    section: keyof CardsData,
    cardName: string,
    field: keyof CardData,
    value: string
  ) => {
    setCardsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [cardName]: {
          ...prev[section][cardName],
          [field]: value,
        },
      },
    }));
    setEditMode((prev) => ({ ...prev, [`${section}-${cardName}`]: true }));
  };

  return (
    <div className="text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Dadcrafting CMS</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Video</h2>
        <div
          className="flex items-center"
          style={{ height: "30vh", width: "100%" }}
        >
          <input
            type="text"
            className="w-full text-black lg:w-1/2 px-4 py-2 rounded-lg bg-gray-800"
            value={videoSrc}
            onChange={(e) => setVideoSrc(e.target.value)}
            disabled={!videoEditMode}
          />
          {videoEditMode ? (
            <>
              <button
                onClick={handleVideoUpdate}
                className="ml-4 px-4 py-2 bg-green-600 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={() => window.location.reload()}
                className="ml-2 px-4 py-2 bg-blue-600 rounded-lg"
              >
                Refresh
              </button>
            </>
          ) : (
            <button
              onClick={() => setVideoEditMode(true)}
              className="ml-4 px-4 py-2 bg-yellow-600 rounded-lg"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {[
        {
          section: "dadcrafts" as keyof CardsData,
          updateSrcFunc: updateDadcraftSrc,
          updateTitleFunc: updateDadcraftTitle,
        },
        {
          section: "military" as keyof CardsData,
          updateSrcFunc: updateMilitarySrc,
          updateTitleFunc: updateMilitaryTitle,
        },
        {
          section: "drinkwear" as keyof CardsData,
          updateSrcFunc: updateDrinkwearSrc,
          updateTitleFunc: updateDrinkwearTitle,
        },
        {
          section: "sublimation" as keyof CardsData,
          updateSrcFunc: updateSublimationSrc,
          updateTitleFunc: updateSublimationTitle,
        },
        {
          section: "custom" as keyof CardsData,
          updateSrcFunc: updateCustomSrc,
          updateTitleFunc: updateCustomTitle,
        },
      ].map(({ section, updateSrcFunc, updateTitleFunc }) => (
        <div key={section} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section}</h2>
          {[...Array(6)].map((_, index) => {
            const cardName = `card${numberToWord[index + 1]}`;
            return (
              <div key={cardName} className="mb-4">
                <h3 className="text-xl font-bold mb-2">{cardName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      src
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 text-black py-2 rounded-lg bg-gray-800"
                      value={cardsData[section][cardName]?.src || ""}
                      onChange={(e) =>
                        handleInputChange(
                          section,
                          cardName,
                          "src",
                          e.target.value
                        )
                      }
                      disabled={!editMode[`${section}-${cardName}`]}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 text-black rounded-lg bg-gray-800"
                      value={cardsData[section][cardName]?.title || ""}
                      onChange={(e) =>
                        handleInputChange(
                          section,
                          cardName,
                          "title",
                          e.target.value
                        )
                      }
                      disabled={!editMode[`${section}-${cardName}`]}
                    />
                  </div>
                </div>
                {editMode[`${section}-${cardName}`] ? (
                  <>
                    <button
                      onClick={() =>
                        handleCardUpdate(
                          section,
                          cardName,
                          updateSrcFunc,
                          updateTitleFunc
                        )
                      }
                      className="mt-2 px-4 py-2 bg-green-600 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="ml-2 mt-2 px-4 py-2 bg-blue-600 rounded-lg"
                    >
                      Refresh
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setEditMode((prev) => ({
                        ...prev,
                        [`${section}-${cardName}`]: true,
                      }))
                    }
                    className="mt-2 px-4 py-2 bg-yellow-600 rounded-lg"
                  >
                    Edit
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DadcraftingCMS;
