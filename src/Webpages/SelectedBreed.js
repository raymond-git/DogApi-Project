import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../Component/NavBar";

function SelectedBreed() {
  const [dog, setDog] = useState([]);
  const { name } = useParams();

  useEffect(() => {
   
      const fetchSingleDog = async () => {
        try {
          const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`,{ //limit to 21 images populated
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-api-key":
                  "live_Xv1NIDcHuYJfH9CnI39Kwmzb0AV6tkxTCQSmsLIaP60jsnCvV9X0T8NZc5Zbl1ak",
              },
            }
          );
          const data = await res.json();
          setDog(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleDog();
  }, [name]); //execute everytime name changes in the url

  return (
    <div>
      <NavBar></NavBar>
      <div className="container flex items-center justify-center" id="container">
        {dog.map((breed) => (
          <div key={breed.id} className="grid grid-cols-1 md:grid-cols-2 md:place-items-center gap-20 p-8 text-left resizing border-solid border-2 border-grey-50">
            <img
              src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
              alt={breed.name}
            ></img>
            <article>
              <h1 className="mb-8 text-3xl lg:text-5xl">{breed.name}</h1>
              {/* If description exist then we show description if not vice versa */}
              {breed.description && ( <p className="mb-8">Description: {breed.description}</p>)}
              <ul>
                <li className="mb-2">Bred For: {breed.bred_for}</li>
                <li className="mb-2">Height: {breed.height.metric} cm</li>
                <li className="mb-2">Weight: {breed.weight.metric} kgs</li>
                <li className="mb-2">Breed Group: {breed.breed_group}</li>
                <li className="mb-2">Life Span: {breed.life_span}</li>
                {breed.history && ( <li className="mb-2">History: {breed.history}</li>)}
                <li className="mb-2">Temperament: {breed.temperament}</li>
              </ul>
              <Link to="/searchbreed" className="text-black inline-block rouded bg-slate-600 px-8 py-3 mt-8 text-white font-bold go-back-button">
                Go Back
              </Link>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SelectedBreed;
