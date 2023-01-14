import { useEffect, useState } from "react";
import NavBarLogged from "../Component/NavBarLogged";
import { Link } from "react-router-dom";
import Footer from "../Component/Footer";

function SearchBreed() {
  const [dogs, setDogs] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searched, setSearched] = useState("false");

  //Get all the breeds on the page
  useEffect(() => {
    const fetchBreed = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds?limit=12", {//limit to 21 images populated
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
  //--------------------------------------------------------


  // Search for a specific dog to populate
  function handleUserChange(event) {
    const userInput = event.target.value;
    setUserInput(userInput);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${userInput}`,
        {
          //limit to 21 images populated
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
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  }
  //--------------------------------------------------------



  //When user backspace no input it pop up dog images again
  const [originalData, setOriginalData] = useState([]);
  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds/?limit=12")
      .then((res) => res.json())
      .then((data) => {
        setOriginalData(data);
      });
  }, []);

  const handleClearUser = (event) => {
    const userInput = event.target.value;
    if (userInput.length === 0) {
      setDogs(originalData);
    }
  };
  //--------------------------------------------------------

  return (
    <div>
      <div className="container" id="container">
        <NavBarLogged></NavBarLogged>
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
            onKeyUp={handleClearUser}
          ></input>
        </form>

        <div className="grid grid: cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 my-12 p-8 text-white mt-30">
          {/* Return true when the user submits a search query and the second API call is made, it maps over the new "dogs" state which now contains the search results and displays the search results */}
          {!searched ? (
            dogs.map((dog) => (
              <Link
                to={`/${dog.name}`}
                key={dog.id}
                id="click-tiles"
                className="dog-card-color p-4 rounded px-0 pt-0 hover:bg-white-600 hover:text-white transition duration-300 hover:scale-110"
              >
                <article>
                  <img
                    className="md:h-72 w-full object-cover"
                    src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                    alt={dog.name}
                  ></img>
                  <h3 className="font-bold mt-6">{dog.name}</h3>
                  <p>{dog.bred_for}</p>
                </article>
              </Link>
            ))
          ) : (
            <>
              {/* // Return this when user is just looking at the card tile with api data */}
              {dogs.map((dog) => (
                <Link
                  to={`/${dog.name}`}
                  key={dog.id}
                  id="click-tiles"
                  className="dog-card-color p-4 rounded px-0 pt-0 hover:bg-white-600 hover:text-white transition duration-300 hover:scale-110"
                >
                  <article>
                    <img
                      className="md:h-72 w-full object-cover"
                      src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                      alt={dog.name}
                    ></img>
                    <h3 className="font-bold mt-6">{dog.name}</h3>
                    <p>{dog.bred_for}</p>
                  </article>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default SearchBreed;
