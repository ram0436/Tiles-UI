import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ProductService } from "src/codeokk/shared/service/product.service";
import { MasterService } from "../service/master.service";
import { Observable, filter, firstValueFrom, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-filtered-posts",
  templateUrl: "./filtered-posts.component.html",
  styleUrls: ["./filtered-posts.component.css"],
})
export class FilteredPostsComponent {
  products: any[] = [];

  originalProducts: any[] = [];

  brands: any[] = [];

  menuName: string = "";

  parentId: Number = 0;
  subCategoryId: Number = 0;
  categoryId: Number = 0;
  subMenuName: string = "";

  allParentCategories: any[] = [];
  allCategories: any[] = [];
  allsubCategories: any[] = [];

  breadcrumb: string = "Interior / Room / Tiles";

  sizes: any[] = [];

  showSizeFilters: boolean = false;

  filtersToggled: boolean = false;

  selectedSizes: number[] = [];

  isScreenSmall: boolean = false;

  isLoading: boolean = true;

  sizesMap: Map<number, string> = new Map();

  filters: any = [];

  currentPage: number = 1;
  productsPerPage: number = 16;
  totalPages: number = 0;
  totalProducts: number = 0;

  hasMoreProductsFetched: boolean = false;

  isMoreProductsLoading: boolean = false;

  noMoreProducts: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private masterService: MasterService,
    private router: Router
  ) {
    this.checkScreenWidth();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isScreenSmall = window.innerWidth < 568;
  }

  ngOnInit() {
    this.checkScreenWidth();
    this.getAllProductSizes();

    this.route.queryParams.subscribe((params) => {
      if (params["priceRange"]) {
        this.filters.selectedPriceRanges = [Number(params["priceRange"])];
      }
      if (params["room"]) {
        this.filters.selectedRooms = [Number(params["room"])];
      }
      if (params["material"]) {
        this.filters.selectedMaterials = [Number(params["material"])];
      }
      if (params["weavingTechnique"]) {
        this.filters.selectedWeavingTechniques = [
          Number(params["weavingTechnique"]),
        ];
      }
      if (params["patternRange"]) {
        this.filters.selectedPatterns = [Number(params["patternRange"])];
      }
      if (params["color"]) {
        this.filters.selectedColors = [Number(params["color"])];
      }
      if (params["shape"]) {
        this.filters.selectedShapes = [Number(params["shape"])];
      }
      if (params["size"]) {
        this.filters.selectedSizes = [Number(params["size"])];
      }
      if (params["collection"]) {
        this.filters.selectedCollections = [Number(params["collection"])];
      }
      this.getProducts();
    });
    // this.getProducts();
    this.masterService.getData().subscribe((filters: any) => {
      this.filters = filters;
      this.getProducts();
    });
  }

  isLastPage(): boolean {
    const totalPages = Math.ceil(this.products.length / this.productsPerPage);
    return this.currentPage === totalPages;
  }

  async handlePageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.isMoreProductsLoading = true;
    const res = await firstValueFrom(
      this.productService.getProductDashboard(
        this.currentPage,
        this.productsPerPage,
        this.filters.selectedSizes?.[0] || 0,
        this.filters.selectedPriceRanges?.[0] || 0,
        this.filters.selectedColors?.[0] || 0,
        this.filters.selectedRooms?.[0] || 0,
        this.filters.selectedMaterials?.[0] || 0,
        this.filters.selectedSpaces?.[0] || 0,
        this.filters.selectedDesigns?.[0] || 0,
        this.filters.selectedFinishes?.[0] || 0,
        this.filters.selectedBrands?.[0] || 0,
        this.filters.selectedDiscounts?.[0] || 0,
        this.filters.selectedCategories?.[0] || 0
      )
    );

    if (this.isLastPage()) {
      this.hasMoreProductsFetched = true;
    }
    if (res.length <= 0 || res.length < this.productsPerPage) {
      this.noMoreProducts = true;
    }
    if (res.length > 0) {
      this.products.push(...res);
      this.totalProducts = this.products.length;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
    }
    this.isMoreProductsLoading = false;
  }

  async getProducts(pageIndex?: number) {
    this.isLoading = true;
    this.noMoreProducts = false;
    const res = await firstValueFrom(
      this.productService.getProductDashboard(
        1,
        this.productsPerPage,
        this.filters.selectedSizes?.[0] || 0,
        this.filters.selectedPriceRanges?.[0] || 0,
        this.filters.selectedColors?.[0] || 0,
        this.filters.selectedRooms?.[0] || 0,
        this.filters.selectedMaterials?.[0] || 0,
        this.filters.selectedSpaces?.[0] || 0,
        this.filters.selectedDesigns?.[0] || 0,
        this.filters.selectedFinishes?.[0] || 0,
        this.filters.selectedBrands?.[0] || 0,
        this.filters.selectedDiscounts?.[0] || 0,
        this.filters.selectedCategories?.[0] || 0
      )
    );
    this.isLoading = false;
    this.products = res;
    this.currentPage = 1;
    if (res.length <= 0 || res.length < this.productsPerPage) {
      this.noMoreProducts = true;
    }
  }

  getAllProductSizes() {
    this.masterService.getAllProductSize().subscribe((res: any) => {
      this.sizes = res;
    });
  }

  toggleFilters() {
    this.filtersToggled = !this.filtersToggled;
  }

  showSize() {
    this.showSizeFilters = !this.showSizeFilters;
  }

  toggleSize(sizeId: number) {
    const index = this.selectedSizes.indexOf(sizeId);
    if (index === -1) {
      this.selectedSizes.push(sizeId);
    } else {
      this.selectedSizes.splice(index, 1);
    }
  }

  sortProducts(criteria: string) {}

  clearFilters(event: Event) {
    event.preventDefault();
    window.location.reload();
  }
}
