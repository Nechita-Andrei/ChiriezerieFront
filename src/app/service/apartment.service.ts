import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apartment } from '../model/apartment';
import { Review } from '../model/review';



@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  public host: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }


  addApartment(apartment: Apartment): Observable<Apartment> {
    return this.httpClient.post<Apartment>(`${this.host}/apartments`, apartment);
  }

  getAll(): Observable<Apartment[]>{
    return this.httpClient.get<Apartment[]>(`${this.host}/apartments`);
  }

  getAllByFilters(city?: string, rooms?: number, minPrice?: number, maxPrice?: number, minSurface?: number, maxSurface?: number){
    console.log(city);
    console.log(rooms);
    return this.httpClient.get<Apartment[]>(`${this.host}/apartments/filter?` + `${city? "&city=" + city: ""}`  
    + `${rooms? "&rooms=" + rooms: ""}` + `${minPrice? "&minPrice=" + minPrice: ""}` + `${maxPrice? "&maxPrice=" + maxPrice: ""}`
    + `${minSurface? "&minSquareFeet=" + minSurface: ""}` + `${maxSurface? "&maxSquareFeet=" + maxSurface: ""}`);
  }

  findApartment(id: string): Observable<Apartment> {
    console.log(id);
    return this.httpClient.get<Apartment>(`${this.host}/apartments/${id}`)
  }

  getComments(id: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.host}/reviews/apartments/${id}`);
    return of([
      { rating: 5, apartmentId: 1, name: "Ionczi", date: "2021-12-25", reviewText: "Pisat de apart sincer", userId: 1 },
      { rating: 3, apartmentId: 1, name: "John", date: "2021-01-25", reviewText: "Smecher apart", userId: 2 },
      { rating: 5, apartmentId: 1, name: "Mickey", date: "2021-07-25", reviewText: "Apart de vanda iarba", userId: 3 },
    ])
  }

  postReview(review: Review):  Observable<Review> {
    return this.httpClient.post<Review>(`${this.host}/reviews`, review);
  }
}
