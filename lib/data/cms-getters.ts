import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure your Firebase configuration is correct

export interface Video {
  src: string;
}

export const getVideo = async (): Promise<Video | null> => {
  const videoDocRef = doc(db, "video", "headerVid");
  const videoDoc = await getDoc(videoDocRef);

  if (videoDoc.exists()) {
    return videoDoc.data().src;
  } else {
    console.log("No such document found!");
    return null;
  }
};

export const updateVideo = async (newSrc: string): Promise<void> => {
  const videoDocRef = doc(db, "video", "headerVid");

  try {
    await updateDoc(videoDocRef, { src: newSrc });
    console.log("Video src updated successfully");
  } catch (error) {
    console.error("Error updating video src:", error);
  }
};

// Dadcrafts Functions
export const getDadcraftSrc = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "dadcrafts", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().src : null;
  } catch (error) {
    console.error("Error getting Dadcraft src:", error);
    return null;
  }
};

export const getDadcraftTitle = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "dadcrafts", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().title : null;
  } catch (error) {
    console.error("Error getting Dadcraft title:", error);
    return null;
  }
};

export const updateDadcraftSrc = async (
  cardName: string,
  newSrc: string
): Promise<void> => {
  try {
    const docRef = doc(db, "dadcrafts", cardName);
    await updateDoc(docRef, { src: newSrc });
  } catch (error) {
    console.error("Error updating Dadcraft src:", error);
  }
};

export const updateDadcraftTitle = async (
  cardName: string,
  newTitle: string
): Promise<void> => {
  try {
    const docRef = doc(db, "dadcrafts", cardName);
    await updateDoc(docRef, { title: newTitle });
  } catch (error) {
    console.error("Error updating Dadcraft title:", error);
  }
};

// Repeat the same structure for Drinkwear, Sublimation, and Military
// Drinkwear Functions
export const getDrinkwearSrc = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "drinkwear", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().src : null;
  } catch (error) {
    console.error("Error getting Drinkwear src:", error);
    return null;
  }
};

export const getDrinkwearTitle = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "drinkwear", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().title : null;
  } catch (error) {
    console.error("Error getting Drinkwear title:", error);
    return null;
  }
};

export const updateDrinkwearSrc = async (
  cardName: string,
  newSrc: string
): Promise<void> => {
  try {
    const docRef = doc(db, "drinkwear", cardName);
    await updateDoc(docRef, { src: newSrc });
  } catch (error) {
    console.error("Error updating Drinkwear src:", error);
  }
};

export const updateDrinkwearTitle = async (
  cardName: string,
  newTitle: string
): Promise<void> => {
  try {
    const docRef = doc(db, "drinkwear", cardName);
    await updateDoc(docRef, { title: newTitle });
  } catch (error) {
    console.error("Error updating Drinkwear title:", error);
  }
};

// Sublimation Functions
export const getSublimationSrc = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "sublimation", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().src : null;
  } catch (error) {
    console.error("Error getting Sublimation src:", error);
    return null;
  }
};

export const getSublimationTitle = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "sublimation", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().title : null;
  } catch (error) {
    console.error("Error getting Sublimation title:", error);
    return null;
  }
};

export const updateSublimationSrc = async (
  cardName: string,
  newSrc: string
): Promise<void> => {
  try {
    const docRef = doc(db, "sublimation", cardName);
    await updateDoc(docRef, { src: newSrc });
  } catch (error) {
    console.error("Error updating Sublimation src:", error);
  }
};

export const updateSublimationTitle = async (
  cardName: string,
  newTitle: string
): Promise<void> => {
  try {
    const docRef = doc(db, "sublimation", cardName);
    await updateDoc(docRef, { title: newTitle });
  } catch (error) {
    console.error("Error updating Sublimation title:", error);
  }
};

// Military Functions
export const getMilitarySrc = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "military", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().src : null;
  } catch (error) {
    console.error("Error getting Military src:", error);
    return null;
  }
};

export const getMilitaryTitle = async (
  cardName: string
): Promise<string | null> => {
  try {
    const docRef = doc(db, "military", cardName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data().title : null;
  } catch (error) {
    console.error("Error getting Military title:", error);
    return null;
  }
};

export const updateMilitarySrc = async (
  cardName: string,
  newSrc: string
): Promise<void> => {
  try {
    const docRef = doc(db, "military", cardName);
    await updateDoc(docRef, { src: newSrc });
  } catch (error) {
    console.error("Error updating Military src:", error);
  }
};

export const updateMilitaryTitle = async (
  cardName: string,
  newTitle: string
): Promise<void> => {
  try {
    const docRef = doc(db, "military", cardName);
    await updateDoc(docRef, { title: newTitle });
  } catch (error) {
    console.error("Error updating Military title:", error);
  }
};

// // Example usage of getVideo
// getVideo().then((video) => {
//   if (video) {
//     console.log("Video src:", video.src);
//   } else {
//     console.log("No video found.");
//   }
// });

// // Example usage of updateVideo
// updateVideo("new-video-url.mp4").then(() => {
//   console.log("Video src update complete.");
// });

// // Example usage of getCard
// getCard("cardsCollection", "cardDoc", "cardProperty").then((propertyValue) => {
//   if (propertyValue !== null) {
//     console.log("Card property value:", propertyValue);
//   } else {
//     console.log("Property not found.");
//   }
// });

// // Example usage of updateCard
// updateCard("cardsCollection", "cardDoc", "cardProperty", "newValue").then(
//   () => {
//     console.log("Card property update complete.");
// }
//);
