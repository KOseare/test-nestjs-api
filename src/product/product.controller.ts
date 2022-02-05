import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  HttpCode,
  NotFoundException,
  Query
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(): Promise<Product[]> {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get('/:productId')
  async getProduct(@Param('productId') productId): Promise<Product> {
    const product = await this.productService.getProduct(productId);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Post('/create')
  async createProduct(
    @Body() createProductDTO: CreateProductDTO
  ): Promise<any> {
    const product = await this.productService.createProduct(createProductDTO);
    return {
      message: 'Product successfully created',
      product
    };
  }

  @Delete('/delete')
  async deleteProduct(@Query('productId') productId): Promise<any> {
    const deletedProduct = await this.productService.deleteProduct(productId);
    if (!deletedProduct) throw new NotFoundException('Product does not exist!');
    return {
      message: 'Product successfully deleted',
      deletedProduct
    };
  }

  @Put('/update')
  async updateProduct(
    @Body() createProductDTO: CreateProductDTO,
    @Query('productId') productId
  ): Promise<any> {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      createProductDTO
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return {
      message: 'Product successfully updated',
      updatedProduct
    };
  }
}
