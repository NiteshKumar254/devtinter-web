import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("kumar183@gmail.com");
  const [password, setPassword] = useState("Abc@123");
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");

  const[isLoginForm,setIsLoginForm]= useState(true);

  const [error,setError]=useState("");
  const [loading, setLoading] = useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();

  const handleLogin = async () => {
    

    if (loading) return; // prevent double calls
    setLoading(true);

    try {
      const res = await axios.post(BASE_URL+"/login", {
        emailId,
        password,

      }, {withCredentials:true});
      console.log(res.data);
      dispatch(addUser(res.data));
     return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
     
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp =async ()=>{
    try{
      const res= await axios.post(
        BASE_URL + "/signup",
        {firstName , lastName , emailId , password},
        {withCredentials:true}
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }
    catch(err) {
      setError(err?.response?.data || "Something went wrong!");
     
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-blue-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login":"SignUp"}</h2>
       <div>
            { !isLoginForm && <> <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">First Name </span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            
            </label>
             <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            
            </label>
            </> }



            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            
            </label>

            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="label"></div>
            </label>
          </div>

          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp }
              // disabled={loading}
            >
              { isLoginForm? "Login":"Sign Up"}
            </button>
          </div>

          <p className="m-auto cursor-pointer py-2 " onClick={ ()=> setIsLoginForm ((value)=> !value)}>
            {isLoginForm
            ? "New User? Signup Here":
            "Existing User? Login Here"}
          </p>


        </div>
      </div>
    </div>
  );
};

export default Login;
