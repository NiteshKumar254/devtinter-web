import {useState} from "react";
// import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
// import { UserCard } from "./UserCard";
import UserCard from "./UserCard";


const EditProfile =({user}) =>{
  const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
     const [age, setAge] = useState(user.age || "");
      const [gender, setGender] = useState(user.gender || "");
       const [about, setAbout] = useState(user.about || "");
       const [photoUrl, setPhotoUrl]= useState(user.photoUrl);   

    const [error,setError]=useState("");
    const dispatch=useDispatch();

      const [showToast , setShowToast]= useState(false);




    const saveProfile= async()=>{
      //clear errors
      setError("");

   

      try{
        const res=await axios.patch(
          BASE_URL+"/profile/edit",
          {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          },{withCredentials:true}
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
       setTimeout(()=>{
          setShowToast(false);
        },3000);

      }
      catch(err){
        setError(err.response.message);

      }
    }

//     const saveProfile = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/profile/edit", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // if using JWT
//       },
//       body: JSON.stringify({
//         firstName,
//         lastName,
//         age,
//         gender,
//         about,
//         photoUrl
//       }),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error(text);
//       setError(text);
//       return;
//     }

//     const data = await res.json();
//     console.log(data);
//     setError("");
//   } catch (error) {
//     console.error(error);
//     setError("Failed to save profile");
//   }
// };






  return (
    <> 
    < div className="flex justify-center my-10">


     <div className="flex justify-center mx-10 ">
      <div className="card bg-blue-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify:center">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">First Name </span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="label"></div>
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

                    <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
             
            </label>

              <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                value={about}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              />
             
            </label>

             

              <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}
              />
             
            </label>
               <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text">Photo Url</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
             
            </label>



          </div>

          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary" onClick={saveProfile}
             
            >Save Profile
              
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>

 </div>
 { showToast  && (
 <div className="toast toast-top toast-center">

  <div className="alert alert-success">
    <span>Profile Updated successfully!</span>
  </div>
</div>
 )}

 </>
 );
};

export default EditProfile;
