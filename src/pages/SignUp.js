import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
    ConfirmPassword: "",
    profilePic: "",
  });

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setdata((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault();
  
    if (data.password === data.ConfirmPassword) {
      try {
        const dataResponse = await fetch(SummaryApi.SignUp.url, {
          method: SummaryApi.SignUp.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const dataApi = await dataResponse.json();

        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/Login")
        }
        if(dataApi.error){
          toast.error(dataApi.message)
        }

      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      toast.error("Please check Password and ConfirmPassword")
    }
  };


  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2  " onSubmit={handlesubmit}>
            <div className="grid">
              <label>Name: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleonChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleonChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={data.password}
                  name="password"
                  onChange={handleonChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)} // Corrected variable name
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showconfirmPassword ? "text" : "password"}
                  placeholder="Enter your Confirm Password"
                  value={data.ConfirmPassword}
                  name="ConfirmPassword"
                  onChange={handleonChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)} // Corrected variable name
                >
                  <span>
                    {showconfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              SignUp
            </button>
          </form>

          <p className="my-5">
            Already have a account ?{" "}
            <Link
              to={"/Login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
