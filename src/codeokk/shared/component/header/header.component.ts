import { Component, ElementRef, HostListener, Renderer2 } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { MasterService } from "src/codeokk/modules/service/master.service";
import { UserService } from "src/codeokk/modules/user/service/user.service";
import { ProductService } from "../../service/product.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginComponent } from "src/codeokk/modules/user/component/login/login.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  searchQuery: string = "";

  isHovered = false;

  isSearchActive: boolean = false;
  isCartActive: boolean = false;
  isAccountActive: boolean = false;

  isActive = false;

  isScrolledDown: boolean = false;

  isAdmin: boolean = false;
  isUserLogedIn: boolean = false;

  userName: string = "";
  userMobile: string = "";

  dialogRef: MatDialogRef<any> | null = null;

  colors: any[] = [];
  prices: any[] = [];
  discount: any = [];
  sizes: any[] = [];
  materials: any[] = [];
  priceRanges: any[] = [];
  shapes: any[] = [];
  weavingTechniques: any[] = [];
  patterns: any[] = [];
  collections: any[] = [];
  rooms: any[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private userService: UserService,
    private masterService: MasterService,
    private router: Router,
    private dialog: MatDialog,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // this.cartItemCount = this.productService.bagCount;
    if (localStorage.getItem("authToken") != null) {
      this.isUserLogedIn = true;
      this.getUserData();
    }
    var role = localStorage.getItem("role");
    if (role != null && role == "Admin") this.isAdmin = true;
    else this.isAdmin = false;
  }

  getUserData() {
    const userData = this.userService.getUserData();
    this.userName = userData.name;
    this.userMobile = userData.mobile;
  }

  navigateToWishlist() {
    if (this.isUserLogedIn) {
      this.router.navigate(["user/wishlist"]);
    } else {
      this.openLoginModal();
    }
  }

  navigateToDashboard() {
    if (this.isUserLogedIn) {
      this.router.navigate(["/admin/dashboard"]);
    } else {
      this.openLoginModal();
    }
  }

  navigateToCart() {
    if (this.isUserLogedIn) {
      this.router.navigate(["user/cart"]);
    } else {
      this.openLoginModal();
    }
  }

  logout() {
    if (localStorage.getItem("authToken") != null) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("userId");
      localStorage.removeItem("userData");
      this.isUserLogedIn = false;
      this.router.navigate(["/"]);
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

  toggleActive(state: boolean) {
    this.isActive = state;
  }

  toggleAccount() {
    this.isAccountActive = !this.isAccountActive;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (offset > 100) {
      this.renderer.addClass(
        this.el.nativeElement.querySelector(".nav-bar"),
        "sticky"
      );
    } else {
      this.renderer.removeClass(
        this.el.nativeElement.querySelector(".nav-bar"),
        "sticky"
      );
    }
  }
}
