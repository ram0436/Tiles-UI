import { Component, ElementRef, HostListener, Renderer2 } from "@angular/core";
import { SlickCarouselModule } from "ngx-slick-carousel";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  searchQuery: string = "";

  slides = [
    {
      img: "https://server.orientbell.com/media/catalog/product/d/g/dgvt_chevron_weave_1.jpg",
      text: "Wall Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/d/g/dgvt_cementum_crema_1.jpg",
      text: "Bathroom Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/g/f/gft_spb_pulpis_grey_dk_f1.jpg",
      text: "Floor Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/e/h/ehm_castle_multi_brown.png",
      text: "Room Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/s/a/satin_onyx_silver_4.png",
      text: "Marble Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/d/g/dgvt_jungi_multi_p1.jpg",
      text: "Wooden Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/d/g/dgvt_jungi_bronze_1.jpg",
      text: "Vitrified Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/g/f/gft_sph_multi_rhombus_grey_hl.jpg",
      text: "Ceramic Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/g/f/gft_sph_geometric_grey_hl.png",
      text: "Cool Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/o/d/odh_wave_wood_hl.png",
      text: "Large Tile",
    },
    {
      img: "https://server.orientbell.com/media/catalog/product/o/d/odh_arrow_wood_hl.png",
      text: "Kitchen Tile",
    },
  ];

  slideConfig = {
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    infinite: false,
    prevArrow:
      '<button class="slick-prev slick-arrow"><i class="fa fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-next slick-arrow"><i class="fa fa-chevron-right"></i></button>',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinte: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinte: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinte: false,
        },
      },
    ],
  };

  slickInit(e: any) {}
}
