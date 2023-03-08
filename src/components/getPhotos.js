import React, { useState, useEffect, useRef } from "react";
import "./photos.css";
import axios from "axios";

const GetPhotos = () => {
  const [imagedata, setimagedata] = useState([]);
  const searchdata = useRef(null);
  const [search, setsearch] = useState("mountain");

  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "eb2afb6238b32c174cc48465e14672e1",
      text: `${search}`,
      per_page: 25,
      license: "4",
      extras: "Rohit kewat, license",
      format: "json",
      nojsoncallback: 1,
    };
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest?${parameters}`;

    axios
      .get(url)
      .then((res) => {
        const arr = res.data.photos.photo.map((imagedata) => {
          return imageUrl(imagedata, "q");
        });
        setimagedata(arr);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }, [search]);

  const imageUrl = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    if (size) {
      url += `_${size}`;
    }
    url += ".jpg";
    return url;
  };

  return (
    <>
      <h1>SnapShot</h1>
      <div className="search">
        <input
          placeholder="search"
          onChange={(e) => (searchdata.current = e.target.value)}
        />
        <button onClick={() => setsearch(searchdata.current)} className='btn'>search</button>
      </div>
      <section className="baR">
        <button onClick={()=>setsearch("mountain")} className='btn' >Mountain</button>
        <button onClick={()=>setsearch("beaches")} className='btn'>Beaches</button>
        <button onClick={()=>setsearch("birds")} className='btn'>Birds</button>
        <button onClick={()=>setsearch("food")} className='btn'>Food</button>

      </section>
      <div>
        <h2> {`${search}  pictures`} </h2>
      </div>
      <section className="photos">
        {imagedata.map((imageurl, key) => {
          return (
            <div>
              <img src={imageurl} key={key} alt="images" className="IMAGE" />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default GetPhotos;
