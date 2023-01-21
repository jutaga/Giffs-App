import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'XyJNHvaxsYrAnwE9RNs8klpF0C65ZAhi';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];


  public resultado: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    //resultados
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];



  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    // <SearchGifsResponse> es la interface de la api , que se encuentra en interface
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '30')
      .set('q', query);
                                                                  //params: params
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultado = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultado));
      });
  }
}
