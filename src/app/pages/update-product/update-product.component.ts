import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { on, Store } from '@ngrx/store';
import * as ProductActions from '../../store/product/product.action';
import {
  selectProductLoading,
  selectProductOne,
} from '../../store/product/product.selector';
import { CategoryService } from '../../core/services/category.service';
import { map } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzSelectModule,
    LoaderComponent,
    NzButtonModule,
    NzInputModule,
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.less',
})
export class UpdateProductComponent implements OnInit {
  updateForm: FormGroup;

  categoryService = inject(CategoryService);

  productId: number = 0;

  statusList = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];

  product$;
  loading$;

  categories$ = this.categoryService
    .getCategories()
    .pipe(map((res) => res.data));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.product$ = this.store.select(selectProductOne);
    this.loading$ = this.store.select(selectProductLoading);

    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      categoryId: [null, Validators.required],
      active: [1],
      stock: [0],
      price: [0],
      description: [''],
    });

    this.product$.subscribe((product) => {
      if (product) {
        this.updateForm.patchValue({
          name: product.name,
          code: product.code,
          categoryId: product.categoryId,
          active: product.active,
          stock: product.stock,
          price: product.price,
          description: product.description,
        });
      }
    });
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.store.dispatch(
      ProductActions.getProduct({ productId: this.productId }),
    );
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.updateForm.invalid) return;

    const payload = {
      id: this.productId,
      ...this.updateForm.value,
    };

    this.store.dispatch(ProductActions.updateProduct({ model: payload }));
  }
}
