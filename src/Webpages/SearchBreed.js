import { useEffect, useState } from "react";
import NavBar from "../Component/NavBar";
import { Link } from "react-router-dom"
import Footer from "../Component/Footer";

function SearchBreed() {
  const [dogs, setDogs] = useState([]);
  const [userInput, setUserInput] = useState("")

  //Get all the breeds
  useEffect(() => {
    const fetchBreed = async () => {
      try {
        const res = await fetch(
          "https://api.thedogapi.com/v1/breeds?limit=12", { //limit to 21 images populated
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "live_Xv1NIDcHuYJfH9CnI39Kwmzb0AV6tkxTCQSmsLIaP60jsnCvV9X0T8NZc5Zbl1ak",
            },
          }
        );
        const data = await res.json();
        setDogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBreed();
  }, []);

  function handleUserChange(event) {
    const userInput = event.target.value;
    setUserInput(userInput);
  }


  // Search for a specific dog to populate
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${userInput}`, { //limit to 21 images populated
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_Xv1NIDcHuYJfH9CnI39Kwmzb0AV6tkxTCQSmsLIaP60jsnCvV9X0T8NZc5Zbl1ak",
          },
        }
      );
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <NavBar></NavBar>
      <div className="container" id="container">
        <h1 className="search-title">Discover Your Perfect Companion</h1>
          <form className="mx-auto mt-10" onSubmit={handleSubmit}>
            <input 
              onChange={handleUserChange}
              value={userInput} 
              name="search"
              id="search"
              type="text"
              placeholder="Search for a dog breed"
              className="py-3 rounded shadow w-3/4 mt-12 indent-6"
            ></input>
          </form>
       
        <div className="grid grid: cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 my-12 p-8 text-white mt-30">
          {dogs.map((dog) => (
            <Link to={`/${dog.name}`} key={dog.id}  id="click-tiles" className="dog-card-color p-4 rounded px-0 pt-0 hover:bg-white-600 hover:text-white transition duration-300 hover:scale-110">
            <article>
              <img
                className="md:h-72 w-full object-cover"
                src={dog.image.url}
                key={dog.image.id}
                alt={dog.name}
              ></img>
              <h3 className="font-bold mt-6">{dog.name}</h3>
              <p>{dog.bred_for}</p>
            </article>
            </Link>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default SearchBreed;
