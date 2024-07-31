export class Common {
  id: number = 0;
  name: string = "";
  colorId: number = 0;
  spaceId: number = 0;
  roomId: number = 0;
  brandId: number = 0;
  categoryId: number = 0;
  designId: number = 0;
  finishId: number = 0;
  materialId: number = 0;
  priceRangeId: number = 0;
  price: number = 0;
  discountId: number = 0;
  inStock: boolean = true;
  isNewLaunch: boolean = true;
  productCode: string = "";
  description: string = "";
  tagList: any[] = [];
  productImageList: { id: number; imageURL: any; productId: any }[] = [];
  productSizeMappingsList: any[] = [];
}
