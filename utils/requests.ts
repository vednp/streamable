const daily: string =
  "https://api.themoviedb.org/3/trending/all/day?language=en-US";

const weekly: string =
  "https://api.themoviedb.org/3/trending/all/week?language=en-US";

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDJkMTIzOWU4NDFkZTdjYWQwMDVjMzU2Yzg3N2Q4MCIsInN1YiI6IjYzNzQ5ZDYwNTdkMzc4MDBhYmI1NDA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kOevd2y7DMNCsk1L8lHHS_1sOoVjT7LMWZegV7MQa_g",
  },
};

async function dailyTrending(): Promise<any> {
  return fetch(daily, options)
    .then((res: Response) => res.json())
    .catch((err: Error) => {
      console.error("error:" + err);
      throw err;
    });
}

async function weeklyTrending(): Promise<any> {
  return fetch(weekly, options)
    .then((res: Response) => res.json())
    .catch((err: Error) => {
      console.error("error:" + err);
      throw err;
    });
}

async function searchQuery(term: String): Promise<any> {
  const url = `https://api.themoviedb.org/3/search/multi?query=${term}&include_adult=false&language=en-US&page=1`;
  return fetch(url, options)
    .then((res: Response) => res.json())
    .catch((err) => {
      console.error("error:" + err);
      throw err;
    });
}

async function findById(id: Number,media_type:String): Promise<any> {
  const url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=dd2d1239e841de7cad005c356c877d80`;
  return fetch(url, options)
    .then((res: Response) => res.json())
    .catch((err: Error) => {
      console.error("error:" + err);
      throw err;
    });
}

async function multiSearch(text: String): Promise<any> {
  const url = `https://api.themoviedb.org/3/search/multi?query=${text}&include_adult=false&language=en-US&page=1`;
  return fetch(url, options)
    .then((res: Response) => res.json())
    .catch((err: Error) => {
      console.error("error:" + err);
      throw err;
    });
}



async function topRated(text: String): Promise<any> {
  const url = `https://api.themoviedb.org/3/movie/top_rated`;
  return fetch(url, options)
    .then((res: Response) => res.json())
    .catch((err: Error) => {
      console.error("error:" + err);
      throw err;
    });
}

async function tvTopRated(): Promise<any> {
  const url = `https://api.themoviedb.org/3/tv/top_rated`;
  return fetch(url, options)
    .then((res: Response) => res.json())
    .catch((err: Error) => {
      console.error("error:" + err);
      throw err;
    });
}
module.exports = {
  dailyTrending: dailyTrending,
  weeklyTrending: weeklyTrending,
  searchQuery: searchQuery,
  findById: findById,
  multiSearch:multiSearch,
  topRated:topRated,
  tvTopRated:tvTopRated,
};
