import AllPosts from "../../components/pages/AllPosts/AllPosts";
import CreatePost from "../../components/shared/craetePost/CreatePost";
import { Helmet } from "react-helmet-async";


const Home = () => {
  return (
    <>

      <Helmet>
         <title>Home</title>
      </Helmet>

    <div className="bg-gray-100">
    <CreatePost/>
    <AllPosts/>
    </div>
    </>
    
  );
}

export default Home;
