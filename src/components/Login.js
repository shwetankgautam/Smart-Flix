import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password)
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMessage(message);
    // if there are any errors in Email And password Generation
    if (message) return;

    // sign in / sign up User
    if (!isSignInForm) {
      // Sign up Logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({
                uid:uid,email:email,displayName:displayName,photoURL:photoURL,
              }));
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign in Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="">
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black absolute p-12 w-3/12 my-44 mx-auto right-0 left-0 text-white bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Enter Your Name"
              className="p-4 my-2 w-full bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email or phone number"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-700"
          />
          <p className="text-red-600 text-bold py-2" font-bold>
            {errorMessage}
          </p>
          <button
            className="p-2 my-6 rounded-sm bg-red-600 w-full font-bold"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {" "}
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already Registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
