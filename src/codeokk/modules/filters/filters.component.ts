import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MasterService } from "../service/master.service";
import { ProductService } from "src/codeokk/shared/service/product.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.css"],
})
export class FiltersComponent implements OnInit {
  @Input() products: any[] = [];

  initialItemCount: number = 5;
  showAllMaterials: boolean = false;
  showAllShapes: boolean = false;
  showAllWeavingTechniques: boolean = false;
  showAllStyles: boolean = false;
  showAllPatterns: boolean = false;
  showAllDesigners: boolean = false;
  showAllCollections: boolean = false;
  showAllSizes: boolean = false;
  showAllAvailabilities: boolean = false;
  showAllPrices: boolean = false;
  showAllRooms: boolean = false;
  showAllDesigns: boolean = false;
  showAllCategories: boolean = false;
  showAllFinishes: boolean = false;
  showAllBrands: boolean = false;
  showAllDiscounts: boolean = false;
  showAllColors: boolean = false;
  showAllSpaces: boolean = false;

  subCategoryId = 0;

  colors: any[] = [];
  prices: any[] = [];
  discounts: any = [];
  sizes: any[] = [];
  materials: any[] = [];
  priceRanges: any[] = [];
  spaces: any[] = [];
  designs: any[] = [];
  finishes: any[] = [];
  categories: any[] = [];
  rooms: any[] = [];
  brands: any[] = [];

  parentId: number = 0;
  categoryId: number = 0;
  subMenuName: string = "";

  menuId: number = 0;

  selectedCategories: number[] = [];
  selectedColors: number[] = [];
  selectedBrands: number[] = [];
  selectedDiscount: number[] = [];
  selectedAvailability: number[] = [];
  selectedSizes: any[] = [];
  selectedMaterials: number[] = [];
  selectedPriceRanges: number[] = [];
  selectedSpaces: number[] = [];
  selectedFinishes: number[] = [];
  selectedDesigns: number[] = [];
  selectedPrices: number[] = [];
  selectedRooms: number[] = [];

  brandsExpanded: boolean = false;
  colorsExpanded: boolean = false;

  brandSearchText: string = "";
  colorSearchText: string = "";

  allParentCategories: any[] = [];
  allCategories: any[] = [];
  allsubCategories: any[] = [];

  breadcrumb: string = "";

  private allDataLoaded: boolean = false;

  private categorySubcategoriesLoaded: { [key: number]: boolean } = {};

  sliderMin: number = 0;
  sliderMax: number = 5000;
  sliderValue: number = 0;
  sliderMaxValue: number = 5000;
  minValue: number = this.sliderValue;
  maxValue: number = this.sliderMaxValue;
  fromPrice = 0;
  toPrice = 5000;

  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private productService: ProductService
  ) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes["products"]) {
  //     this.updateFiltersBasedOnProducts();
  //   }
  // }

  ngOnInit() {
    this.masterService.colors$.subscribe((data) => (this.colors = data));
    this.masterService.sizes$.subscribe((data) => (this.sizes = data));
    this.masterService.discounts$.subscribe((data) => {
      this.discounts = data;
    });
    this.masterService.materials$.subscribe((data) => (this.materials = data));
    this.masterService.priceRanges$.subscribe(
      (data) => (this.priceRanges = data)
    );
    this.masterService.rooms$.subscribe((data) => {
      this.rooms = data;
    });
    this.masterService.designs$.subscribe((data) => (this.designs = data));
    this.masterService.finishes$.subscribe((data) => (this.finishes = data));
    this.masterService.spaces$.subscribe((data) => (this.spaces = data));
    this.masterService.brands$.subscribe((data) => (this.brands = data));
    this.masterService.rooms$.subscribe((data) => (this.rooms = data));
    this.masterService.categories$.subscribe(
      (data) => (this.categories = data)
    );

    this.masterService.fetchData();

    // this.updateFiltersBasedOnProducts();
    this.route.queryParams.subscribe((params) => {
      if (params["priceRange"]) {
        this.selectedPriceRanges = [Number(params["priceRange"])];
      } else {
        this.selectedPriceRanges = [];
      }
      if (params["room"]) {
        this.selectedRooms = [Number(params["room"])];
      } else {
        this.selectedRooms = [];
      }
      if (params["material"]) {
        this.selectedMaterials = [Number(params["material"])];
      } else {
        this.selectedMaterials = [];
      }
      if (params["brands"]) {
        this.selectedBrands = [Number(params["brands"])];
      } else {
        this.selectedBrands = [];
      }
      if (params["spaces"]) {
        this.selectedSpaces = [Number(params["spaces"])];
      } else {
        this.selectedSpaces = [];
      }
      if (params["color"]) {
        this.selectedColors = [Number(params["color"])];
      } else {
        this.selectedColors = [];
      }
      if (params["categories"]) {
        this.selectedCategories = [Number(params["categories"])];
      } else {
        this.selectedCategories = [];
      }
      if (params["size"]) {
        this.selectedSizes = [Number(params["size"])];
      } else {
        this.selectedSizes = [];
      }
      if (params["designs"]) {
        this.selectedDesigns = [Number(params["designs"])];
      } else {
        this.selectedDesigns = [];
      }
      if (params["finishes"]) {
        this.selectedFinishes = [Number(params["finishes"])];
      } else {
        this.selectedFinishes = [];
      }
    });
  }

  updateSlider() {
    if (this.minValue < this.sliderMin) this.minValue = this.sliderMin;
    if (this.maxValue > this.sliderMax) this.maxValue = this.sliderMax;
    if (this.minValue > this.maxValue) this.minValue = this.maxValue;
    if (this.maxValue < this.minValue) this.maxValue = this.minValue;
    this.sliderValue = this.minValue;
    this.sliderMaxValue = this.maxValue;
  }

  onSliderChange(event: any) {
    const newValue = event.value;
    if (newValue < this.minValue) {
      this.minValue = newValue;
    } else if (newValue > this.maxValue) {
      this.maxValue = newValue;
    }
  }

  toggleBrandsSearch() {
    this.brandsExpanded = !this.brandsExpanded;
  }

  toggleBrand(brandId: number) {
    if (this.selectedBrands.includes(brandId)) {
      this.selectedBrands = [];
    } else {
      this.selectedBrands = [brandId];
    }
    this.applyFilters();
  }

  toggleColorsSearch() {
    this.colorsExpanded = !this.colorsExpanded;
  }

  toggleColor(colorId: number) {
    // const index = this.selectedColors.indexOf(colorId);
    // if (index === -1) {
    //   this.selectedColors.push(colorId);
    // } else {
    //   this.selectedColors.splice(index, 1);
    // }
    if (this.selectedColors.includes(colorId)) {
      this.selectedColors = [];
    } else {
      this.selectedColors = [colorId];
    }
    this.applyFilters();
  }

  togglePrice(priceId: number) {
    // const index = this.selectedPriceRanges.indexOf(priceId);
    // if (index === -1) {
    //   this.selectedPriceRanges.push(priceId);
    // } else {
    //   this.selectedPriceRanges.splice(index, 1);
    // }
    if (this.selectedPriceRanges.includes(priceId)) {
      this.selectedPriceRanges = [];
    } else {
      this.selectedPriceRanges = [priceId];
    }
    this.applyFilters();
  }

  toggleDiscount(discountId: number) {
    if (this.selectedDiscount.includes(discountId)) {
      this.selectedDiscount = [];
    } else {
      this.selectedDiscount = [discountId];
    }
    this.applyFilters();
  }

  toggleCategory(categoryId: number) {
    if (this.selectedCategories.includes(categoryId)) {
      this.selectedCategories = [];
    } else {
      this.selectedCategories = [categoryId];
    }
    this.applyFilters();
  }

  toggleAvailability(availabilityId: number) {
    if (this.selectedAvailability.includes(availabilityId)) {
      this.selectedAvailability = [];
    } else {
      this.selectedAvailability = [availabilityId];
    }
    this.applyFilters();
  }

  toggleSize(sizeId: number, event: Event) {
    if (this.selectedSizes.includes(sizeId)) {
      this.selectedSizes = [];
    } else {
      this.selectedSizes = [sizeId];
    }
    this.applyFilters();

    // if (isChecked) {
    //   if (!this.selectedSizes.includes(size)) {
    //     this.selectedSizes.push(size);
    //   }
    // } else {
    //   const index = this.selectedSizes.indexOf(size);
    //   if (index !== -1) {
    //     this.selectedSizes.splice(index, 1);
    //   }
    // }
    // this.applyFilters();
  }

  toggleMaterial(materialId: number) {
    if (this.selectedMaterials.includes(materialId)) {
      this.selectedMaterials = [];
    } else {
      this.selectedMaterials = [materialId];
    }
    this.applyFilters();
  }

  toggleRoom(roomId: number) {
    if (this.selectedRooms.includes(roomId)) {
      this.selectedRooms = [];
    } else {
      this.selectedRooms = [roomId];
    }
    this.applyFilters();
  }

  togglePriceRange(priceRangeId: number) {
    if (this.selectedPriceRanges.includes(priceRangeId)) {
      this.selectedPriceRanges = [];
    } else {
      this.selectedPriceRanges = [priceRangeId];
    }
    this.applyFilters();
  }

  toggleSpace(spaceId: number) {
    if (this.selectedSpaces.includes(spaceId)) {
      this.selectedSpaces = [];
    } else {
      this.selectedSpaces = [spaceId];
    }
    this.applyFilters();
  }

  toggleDesign(designId: number) {
    if (this.selectedDesigns.includes(designId)) {
      this.selectedDesigns = [];
    } else {
      this.selectedDesigns = [designId];
    }
    this.applyFilters();
  }

  toggleFinish(finishId: number) {
    if (this.selectedFinishes.includes(finishId)) {
      this.selectedFinishes = [];
    } else {
      this.selectedFinishes = [finishId];
    }
    this.applyFilters();
  }

  // toggleCategory(patternId: number) {
  //   if (this.selectedPatterns.includes(patternId)) {
  //     this.selectedPatterns = [];
  //   } else {
  //     this.selectedPatterns = [patternId];
  //   }
  //   this.applyFilters();
  // }

  resetFilters() {
    this.selectedCategories = [];
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedDiscount = [];
    this.selectedSizes = [];
    this.selectedMaterials = [];
    this.selectedPriceRanges = [];
    this.selectedSpaces = [];
    this.selectedDesigns = [];
    this.selectedFinishes = [];
    this.applyFilters();
  }

  showMoreItems(filterType: string) {
    switch (filterType) {
      case "prices":
        this.showAllPrices = true;
        break;
      case "rooms":
        this.showAllRooms = true;
        break;
      case "colors":
        this.showAllColors = true;
        break;
      case "sizes":
        this.showAllSizes = true;
        break;
      case "materials":
        this.showAllMaterials = true;
        break;
      case "spaces":
        this.showAllSpaces = true;
        break;
      case "designs":
        this.showAllDesigns = true;
        break;
      case "finishes":
        this.showAllFinishes = true;
        break;
      case "brands":
        this.showAllBrands = true;
        break;
      case "categories":
        this.showAllCategories = true;
        break;
      case "discounts":
        this.showAllDiscounts = true;
        break;
      default:
        break;
    }
  }

  showLessItems(filterType: string) {
    switch (filterType) {
      case "prices":
        this.showAllPrices = false;
        break;
      case "rooms":
        this.showAllRooms = false;
        break;
      case "colors":
        this.showAllColors = false;
        break;
      case "sizes":
        this.showAllSizes = false;
        break;
      case "materials":
        this.showAllMaterials = false;
        break;
      case "spaces":
        this.showAllSpaces = false;
        break;
      case "designs":
        this.showAllDesigns = false;
        break;
      case "finishes":
        this.showAllFinishes = false;
        break;
      case "brands":
        this.showAllBrands = false;
        break;
      case "categories":
        this.showAllCategories = false;
        break;
      case "discounts":
        this.showAllDiscounts = false;
        break;
      default:
        break;
    }
  }

  shouldShowShowMoreLink(items: any[], filterType: string): boolean {
    switch (filterType) {
      case "prices":
        return !this.showAllPrices && items.length > this.initialItemCount;

      case "colors":
        return !this.showAllColors && items.length > this.initialItemCount;
      case "rooms":
        return !this.showAllRooms && items.length > this.initialItemCount;
      case "sizes":
        return !this.showAllSizes && items.length > this.initialItemCount;
      case "materials":
        return !this.showAllMaterials && items.length > this.initialItemCount;
      case "spaces":
        return !this.showAllSpaces && items.length > this.initialItemCount;
      case "designs":
        return !this.showAllDesigns && items.length > this.initialItemCount;
      case "finishes":
        return !this.showAllFinishes && items.length > this.initialItemCount;
      case "brands":
        return !this.showAllBrands && items.length > this.initialItemCount;
      case "categories":
        return !this.showAllCategories && items.length > this.initialItemCount;
      case "discounts":
        return !this.showAllDiscounts && items.length > this.initialItemCount;
      default:
        return false;
    }
  }

  shouldShowShowLessLink(filterType: string): boolean {
    switch (filterType) {
      case "prices":
        return this.showAllPrices;
      case "rooms":
        return this.showAllRooms;
      case "colors":
        return this.showAllColors;
      case "sizes":
        return this.showAllSizes;
      case "materials":
        return this.showAllMaterials;
      case "spaces":
        return this.showAllSpaces;
      case "designs":
        return this.showAllDesigns;
      case "finishes":
        return this.showAllFinishes;
      case "brands":
        return this.showAllBrands;
      case "categories":
        return this.showAllCategories;
      case "discounts":
        return this.showAllDiscounts;
      default:
        return false;
    }
  }

  applyFilters() {
    this.masterService.setData({
      selectedColors: this.selectedColors,
      selectedDiscounts: this.selectedDiscount,
      selectedSizes: this.selectedSizes,
      selectedMaterials: this.selectedMaterials,
      selectedPriceRanges: this.selectedPriceRanges,
      selectedSpaces: this.selectedSpaces,
      selectedFinishes: this.selectedFinishes,
      selectedDesigns: this.selectedDesigns,
      selectedBrands: this.selectedBrands,
      selectedRooms: this.selectedRooms,
      selectedCategories: this.selectedCategories,
    });
  }
}
