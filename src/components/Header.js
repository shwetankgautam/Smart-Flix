import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/Browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //Toggle GPT search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) =>{
  //  console.log(e.target.value)
  dispatch(changeLanguage(e.target.value)); 
  }

  return (
    <div className="absolute px-14 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-48" src={LOGO} alt="logo" />

      <div className="flex p-4">
        
        {showGptSearch && <select className="py-2 px-4 mr-4 bg-gray-700 rounded-xl  text-white hover:scale-95" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>}
        <button
          className="py-2 px-4 mr-4 bg-gray-700 rounded-xl font-bold text-white hover:scale-95"
          onClick={handleGptSearchClick}
        >
          {" "}
          {showGptSearch?"HomePage 📻":"Smart Search"}
        </button>
        <img className="w-12 h-12" alt="userIcon" src={USER_AVATAR} />
        <button onClick={handleSignOut} className="p-2 font-bold text-white">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
