import { useGetAcadimies } from "../../apiCalls/academyApiCalls";
import { useGetUsers } from "../../apiCalls/userApiCalls";
import Loader from "../../components/Loader";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";


export default function Home() {

  const {isLoading:isUsersLoading, data:users, isError:isUsersError, error:usersError} = useGetUsers()
  const {isLoading:isAcadamiesLoading,data:academies,isError:isAcadamiesError,error:AcadamiesError} = useGetAcadimies()
 
  if (isUsersLoading) {
    return <Loader/>
  }
  
  if (isUsersError) {
    return <h2>{usersError.message}</h2>
  }

  if (isAcadamiesLoading) {
    return <Loader/>
  }
  
  if (isAcadamiesError) {
    return <h2>{AcadamiesError.message}</h2>
  }

 

  return (
      <div className="home">
        <FeaturedInfo
        users={users}
        academies={academies}
        />
    </div>
  );
}
