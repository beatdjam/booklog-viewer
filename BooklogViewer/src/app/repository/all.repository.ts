import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllModel} from "./all.model";

@Injectable({
  providedIn: 'root'
})
export class AllRepository {
  constructor(private http: HttpClient) {
  }

  getAllData(): Observable<AllModel> {
    const httpOptions = {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*',})};
    const param = new HttpParams()
      .set('category_id', 'all')
      .set('status', 'all')
      .set('sort', 'read_desc')
      .set('rank', 'all')
      .set('tag', '')
      .set('page', '')
      .set('keyword', '')
      .set('reviewed', '')
      .set('quoted', 'all')
      .set('json', 'true')
    ;
    return this.http.get<AllModel>(`https://booklog.jp/users/beateck/all`, {params: param, headers: httpOptions.headers});
  }
}
