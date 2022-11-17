import MD5 from "crypto-js/md5";

const getHash = (ts, privateKey, publicKey) => { //md5(ts + privateKey + publicKey) for API calls 
  return MD5(ts + privateKey + publicKey).toString();
};

let API_URL = process.env.REACT_APP_BASE_URL;

/**
 * getHerosList
 * @desc get Hero List by limit beacuse of infinite scroll
 * @param limit : number
 * @return searched heroes results
 */
const getHerosList = async (limit) => {
  let heroUrl = `${API_URL}/v1/public/characters?limit=${limit}`;
  let ts = Date.now().toString();
  let apiKey = process.env.REACT_APP_API_KEY;
  let privateKey = process.env.REACT_APP_PRIVATE_KEY;
  let hash = getHash(ts, privateKey, apiKey);
  let endPoint = `${heroUrl}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(endPoint);
    let data = await response.json();
    if (data.code === 200) {
      return data.data.results;
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    return;
  }
};

/**
 * fetchHero
 * @desc get Hero Details by id
 * @param heroId
 * @return results
 */
const fetchHero = async (id) => {
  let heroUrl = `${API_URL}/v1/public/characters/${id}`;
  let ts = Date.now().toString();
  let apiKey = process.env.REACT_APP_API_KEY;
  let privateKey = process.env.REACT_APP_PRIVATE_KEY;
  let hash = getHash(ts, privateKey, apiKey);
  let url = `${heroUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

/**
 * fetchHeroComics
 * @desc get the hero's comics, this request had to be made to sort by year
 * @param heroId : number
 * @return [results]
 */
const fetchHeroComics = async (id) => {
  let heroUrl = `${API_URL}/v1/public/characters/${id}/comics?format=comic&formatType=comic&orderBy=onsaleDate`;
  let ts = Date.now().toString();
  let apiKey = process.env.REACT_APP_API_KEY;
  let privateKey = process.env.REACT_APP_PRIVATE_KEY;
  let hash = getHash(ts, privateKey, apiKey);
  let url = `${heroUrl}&ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=10`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

export {  fetchHero, getHerosList , fetchHeroComics };
