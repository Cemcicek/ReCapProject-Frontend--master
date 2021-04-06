import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand =  {brandId:-1,brandName:""};

  colors:Color[] = [];
  currentColor:Color = {colorId:-1,colorName:""}

  
  dataLoaded = false;
  filterText:String;
  constructor(private brandService: BrandService,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
    this.brands = response.data;
    this.dataLoaded = true;
  })
}
setCurrentBrand(brand:Brand){
  this.currentBrand = brand;
}
removeCurrentBrand(){
  this.filterText = "";
  this.currentBrand = {brandId:-1,brandName:""};
}
getCurrentBrandClass(brand:Brand){
  if(brand == this.currentBrand)
  {
    return "list-group-item cursorPointer active";
  } else {
    return "list-group-item cursorPointer";
  }
}
getAllBrandClass(){
  let defaultBrand:Brand ={brandId:-1,brandName:""};
  if(this.currentBrand.brandId == defaultBrand.brandId){ 
    return "list-group-item active cursorPointer";
  } else {
    return "list-group-item cursorPointer";
  }
}

getColors() {
  this.colorService.getColors().subscribe(response => {
     this.colors = response.data,
     this.dataLoaded = true;
  })
}
setCurrentColor(color:Color){
  this.currentColor = color;
}
getCurrentColorClass(color:Color){
  if(this.currentColor == color){
    return "list-group-item active";
  } else {
    return "list-group-item"
  }
}
getAllCurrentColorClass(){
  let defaultColor:Color = {colorId:-1,colorName:""};
  if(this.currentColor.colorId == defaultColor.colorId){
    return "list-group-item active";
  } else {
    return "list-group-item"
  }
}
removeCurrentColor(){
  this.filterText = "";
  this.currentColor={colorId:-1,colorName:""};
}

}
