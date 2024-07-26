import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MasterService {
  private dataSubject = new Subject<any>();

  private colorsSubject = new BehaviorSubject<any[]>([]);
  private sizesSubject = new BehaviorSubject<any[]>([]);
  private discountsSubject = new BehaviorSubject<any[]>([]);
  private materialsSubject = new BehaviorSubject<any[]>([]);
  private priceRangesSubject = new BehaviorSubject<any[]>([]);
  private roomsSubject = new BehaviorSubject<any[]>([]);
  private spacesSubject = new BehaviorSubject<any[]>([]);
  private finishesSubject = new BehaviorSubject<any[]>([]);
  private designsSubject = new BehaviorSubject<any[]>([]);
  private brandsSubject = new BehaviorSubject<any[]>([]);
  private categoriesSubject = new BehaviorSubject<any[]>([]);

  colors$ = this.colorsSubject.asObservable();
  sizes$ = this.sizesSubject.asObservable();
  discounts$ = this.discountsSubject.asObservable();
  materials$ = this.materialsSubject.asObservable();
  priceRanges$ = this.priceRangesSubject.asObservable();
  rooms$ = this.roomsSubject.asObservable();
  spaces$ = this.spacesSubject.asObservable();
  designs$ = this.designsSubject.asObservable();
  finishes$ = this.finishesSubject.asObservable();
  brands$ = this.brandsSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;

  fetchData() {
    forkJoin({
      colors: this.getAllColor(),
      sizes: this.getAllProductSize(),
      discounts: this.getAllDiscount(),
      materials: this.getAllMaterial(),
      priceRanges: this.getAllPriceRange(),
      rooms: this.getAllRoom(),
      spaces: this.getAllSpace(),
      finishes: this.getAllFinish(),
      designs: this.getAllDesign(),
      brands: this.getAllBrand(),
      categories: this.getAllCategory(),
    }).subscribe((data: any) => {
      this.colorsSubject.next(data.colors);
      this.sizesSubject.next(data.sizes);
      this.discountsSubject.next(data.discounts);
      this.materialsSubject.next(data.materials);
      this.priceRangesSubject.next(data.priceRanges);
      this.spacesSubject.next(data.spaces);
      this.finishesSubject.next(data.finishes);
      this.designsSubject.next(data.designs);
      this.brandsSubject.next(data.brands);
      this.categoriesSubject.next(data.categories);
      this.roomsSubject.next(data.rooms);
    });
  }

  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }

  getAllFinish(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllFinish`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllCategory`);
  }

  getAllDesign(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllDesign`);
  }

  getAllSpace(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllSpace`);
  }

  getAllBrand(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllBrand`);
  }

  getAllColor(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllColor`);
  }

  getAllDiscount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllDiscount`);
  }

  getAllProductSize(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllProductSize`);
  }

  getAllMaterial(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllMaterial`);
  }

  getAllRoom(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllRoom`);
  }

  getAllPriceRange(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Master/GetAllPriceRange`);
  }
}
