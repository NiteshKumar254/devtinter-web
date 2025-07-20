
// const UserCard = ({user}) => {

//   const {firstName ,lastName,photoUrl ,age,gender,about }=user;
//   return (
//     <div>
//      <div className="card bg-gray-300 w-96 shadow-sm">
//   <figure>
//     <img
//       src={user.photoUrl}
//       alt="Shoes" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">{firstName+ " "+lastName}</h2> 
   
//       {age && gender && <p>{age+", "+gender}</p>}
//     <p>{about}</p>
//     <div className="card-actions justify-center my-4">
//       <button className="btn btn-primary">Ignore</button>
//        <button className="btn btn-secondary">Interested</button>
//     </div>
//   </div>
// </div>
//     </div>
//   );
// }

// export default UserCard;
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = ({ user }) => {
  const {
    _id,
    firstName = '',
    lastName = '',
    photoUrl = 'https://via.placeholder.com/150',
    age,
    gender,
    about = 'No description provided.',
  } = user;
  const dispatch=useDispatch();

    // const handleSendRequest =async (status, userId) =>{
    //   try{
    //     const res=await axios.post(
    //       BASE_URL + "/request/send" + status +"/"+userId,
    //       {},
    //       {withCredentials:true}
    //     );
    //     dispatch(removeUserFromFeed(userId));
    //   }
    //   catch(err){}
    // };

//      const handleSendRequest = async (status, userId) => {
//   try {
//     const res = await axios.post(
//       BASE_URL + "/send/" + status + "/" + userId,
//       {},
//       { withCredentials: true }
//     );
//     dispatch(removeUserFromFeed(userId));
//   } catch (err) {
//     console.error("Request failed:", err.message);
//   }
// };
const handleSendRequest = async (status, userId) => {
  try {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    console.log(userId);
    dispatch(removeUserFromFeed(userId));
  } catch (err) {
    console.error("Request failed:", err.message);
  }
};




















  return (
    <div className="card bg-gray-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt={`${firstName} ${lastName}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary"
          onClick={()=> handleSendRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-secondary"
          onClick={()=> handleSendRequest("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;