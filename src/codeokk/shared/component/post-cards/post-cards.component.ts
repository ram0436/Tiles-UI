import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/codeokk/modules/user/service/user.service";
import { ProductService } from "../../service/product.service";
import { LoginComponent } from "src/codeokk/modules/user/component/login/login.component";
@Component({
  selector: "app-post-cards",
  templateUrl: "./post-cards.component.html",
  styleUrls: ["./post-cards.component.css"],
})
export class PostCardsComponent {
  @Input() products: any;
  @Input() isMoreProductsLoading: boolean = false;
  @Input() noMoreProducts: boolean = false;
  // @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  productDetailsRoute: boolean = false;
  wishlistRoute: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  productsPerPage: number = 16;

  ratingsMap: Map<string, { averageRating: number; totalRatings: number }> =
    new Map();
  isScreenSmall: boolean = false;
  @Output() itemRemovedFromWishlist = new EventEmitter<void>();
  favoriteStatus: { [key: string]: boolean } = {};
  isUserLogedIn: boolean = false;
  filteredPostsRoute: boolean = false;
  dialogRef: MatDialogRef<any> | null = null;

  wishlistCount: number = 0;

  selectedSize: number | null = null;

  showModal: boolean = false;
  selectedProduct: any;

  hoveredProduct: string | null = null;
  isAdmin: boolean = false;

  showAdminOptions: boolean = false;
  adminOptionsVisibleFor: string | null = null;

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private elementRef: ElementRef
  ) {
    this.route.queryParams.subscribe((params) => {
      const routeName = this.router.url.split("?")[0];
      this.productsPerPage = routeName === "/filtered-posts" ? 16 : 16;
    });

    this.route.url.subscribe((urlSegments) => {
      this.wishlistRoute =
        urlSegments.length > 0 && urlSegments[0].path === "wishlist";
      this.productDetailsRoute =
        urlSegments.length > 0 && urlSegments[0].path === "product-details";
    });
  }

  loadMore() {
    this.currentPage = this.currentPage + 1;
    this.pageChange.emit(this.currentPage);
  }

  removeItemFromWishlist(event: Event, cartId: any) {
    event.preventDefault();
    event.stopPropagation();

    this.userService
      .removeItemFromWishlist(cartId, Number(localStorage.getItem("id")))
      .subscribe(
        (response: any) => {
          this.products = this.products.filter(
            (product: any) => product.cartId !== cartId
          );
          this.itemRemovedFromWishlist.emit();
        },
        (error) => {}
      );
  }

  toggleFavorite(event: Event, productId: string) {
    event.preventDefault();
    event.stopPropagation();

    if (localStorage.getItem("id") != null) {
      // Toggle favorite status
      this.favoriteStatus[productId] = !this.favoriteStatus[productId];

      // Call addToWishlist method
      if (this.favoriteStatus[productId]) {
        this.addToWishlist(productId);
      } else {
        // You can implement removal from wishlist if needed
      }
    } else {
      this.openLoginModal();
    }
  }

  openLoginModal() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(LoginComponent, { width: "450px" });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (localStorage.getItem("authToken") != null) this.isUserLogedIn = true;
    });
  }

  addToWishlist(productId: string) {
    const wishlistItem = {
      id: 0,
      productCode: productId,
      createdBy: Number(localStorage.getItem("id")),
      userId: Number(localStorage.getItem("id")),
      modifiedBy: Number(localStorage.getItem("id")),
      // createdBy: localStorage.getItem("id"),
      createdOn: new Date().toISOString(),
      modifiedOn: new Date().toISOString(),
    };

    this.userService.addWishList(wishlistItem).subscribe(
      (response: any) => {
        this.showNotification("Successfully Added to Wishlist");
      },
      (error: any) => {}
    );
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
