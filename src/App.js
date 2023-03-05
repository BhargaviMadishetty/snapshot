import React from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(() => {
    //method key cat/mountain/ sort per_page:40 format xml/json
    const params = {
      method: "flickr.photos.search",
      api_key: "94cd39e1d8e5ce905fe1ee55eb45202c",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    //farm id secret server
    const parameters = new URLSearchParams(params);
    //?per_page=24&
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp) => {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData) => {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
    });

  }, [searchText]);
  const fetchFlickrImageUrl = (photo, size) => {
    //farm66.staticflickr.com/server/id_
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size) {
      url += `_${size}`;
    }
    url += '.jpg';
    return url;
  }
  return (
    <>
      <h1 className='header'>Snapshot</h1>
      <div id='search-fields'>
        <input onChange={(e) => { searchData.current = e.target.value }} />
        <button id="search-btn" onClick={() => { setSearchText(searchData.current) }}>Search</button>
        <section>
          <button className='categories' onClick={() => { setSearchText("mountains") }}>Mountains</button>
          <button className='categories' onClick={() => { setSearchText("beaches") }}>Beaches</button>
          <button className='categories' onClick={() => { setSearchText("birds") }}>Birds</button>
          <button className='categories' onClick={() => { setSearchText("food") }}>Food</button>
        </section>
      </div>
      <section className='image-container'>

        {imageData.map((imageurl, key) => {
          return (
            <article className='flickr-image'>
              <img src={imageurl} key={key} alt="" />
            </article>
          )

        })}

      </section>
    </>
  );
}

export default App;