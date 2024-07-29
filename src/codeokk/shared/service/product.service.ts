import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  private getAllItemsSubject = new BehaviorSubject<any[]>([]);
  public searchResults$ = this.searchResultsSubject.asObservable();
  public getAllItems$ = this.getAllItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.loadFromLocalStorage();
  }
  private BaseURL = environment.baseUrl;

  getProductByProductCode(code: any) {
    return this.http.get(
      `${this.BaseURL}Product/GetProductByProductCode?productCode=` + code
    );
  }

  getProductByProductId(id: any) {
    return this.http.get(`${this.BaseURL}Product/GetProductById?id=${id}`);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.BaseURL}Product/${id}`);
  }

  uploadProjectCodeImages(formData: any) {
    return this.http.post(`${this.BaseURL}Product/UploadImages`, formData);
  }

  addProduct(payLoad: any) {
    return this.http.post(`${this.BaseURL}Product`, payLoad);
  }

  updateProduct(productId: any, payLoad: any) {
    return this.http.put(`${this.BaseURL}Product/${productId}`, payLoad);
  }

  searchAds(searchQuery: string): Observable<any[]> {
    const apiUrl = `${this.BaseURL}Product/GlobalSearch?searchItem=${searchQuery}`;
    return this.http.get<any[]>(apiUrl).pipe(
      tap((results) => {
        this.searchResultsSubject.next(results);
      })
    );
  }

  getProductSizebyProductId(productId: number) {
    return this.http.get<any[]>(
      `${this.BaseURL}Product/GetProductSizeByProductId?productId=${productId}`
    );
  }

  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.type = "application/javascript";
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  getProductDashboard(
    pageIndex: number,
    pageSize: number,
    sizeId: number,
    priceRangeId: number,
    colorId: number,
    roomId: number,
    materialId: number,
    spaceId: number,
    designId: number,
    finishId: number,
    brandId: number,
    discountId: number,
    categoryId: number
  ): Observable<any> {
    const apiUrl = `${this.BaseURL}Product/GetProductDashboard?pageIndex=${pageIndex}&pageSize=${pageSize}&sizeId=${sizeId}&priceRangeId=${priceRangeId}&colorId=${colorId}&roomId=${roomId}&materialId=${materialId}&spaceId=${spaceId}&designId=${designId}&finishId=${finishId}&brandId=${brandId}&discountId=${discountId}&categoryId=${categoryId}`;
    return this.http.get<any>(apiUrl).pipe(
      tap((results) => {
        this.getAllItemsSubject.next(results);
      })
    );
  }
}
