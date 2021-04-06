import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brands: Brand[]=[];
  brandUpdateForm : FormGroup;
  brandId: number;

  constructor(private brandService:BrandService,
    private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.brandId = parseInt(params['id']);
        this.getBrandById(params['id']);
      }
    });
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.brandId],
      brandName: ['', Validators.required],
    });
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
      }, error => {
        if (error.error.Errors.length > 0) {
          for (let i = 0; i < error.error.Errors.length; i++) {
            this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
          }
        }
      });
    } else {
      this.toastrService.error('Form Bilgileriniz Eksik!', 'Hata');
    }
  }
  getBrandById(id: number) {
    this.brandService.getById(id).subscribe(response => {
      this.brands = response.data;
    });
  }

}
