import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // base_apiUrl="https://api.themoviedb.org/3/";
  // genreList_uri="genre/movie/list";
  // api_key="39315cc490fedc515905ec8009e60a35";
  base_apiUrl="http://localhost:3000/api";
  genreList_uri="/genres";
  modifyWatchList_uri="/movies/modify-watchList";
  constructor(private http:HttpClient) { }

  GenreList(){
    let genreListurl=this.base_apiUrl+this.genreList_uri;
    //let genreListurl="http://localhost:3000/api/genres";
    //+"?api_key="+this.api_key+"&language=en-US";
    return this.http.get(genreListurl);
  }

  movieList(genreId,page,pageSize){
    //let movieListUri=`discover/movie?api_key=${this.api_key}&
   // language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&page=1`
    let movieListUri="/movies/"+genreId+`?page=${page}&pageSize=${pageSize}`;
    let movieListUrl=this.base_apiUrl+movieListUri;
    return this.http.get(movieListUrl);
  }

  changeWatchState(state,movie_id){
      let modifyWatchList_url=this.base_apiUrl+this.modifyWatchList_uri;
      let params={
        "movie_id":movie_id,
        "watch_state":state
      }
      return this.http.put(modifyWatchList_url,params);

  }
}
