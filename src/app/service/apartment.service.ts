import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apartment } from '../model/apartment';



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

}
