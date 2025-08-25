import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) { }

  @Post()
  createProduct() {
    return 'createProduct'
  }

  @Get()
  findProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  findProductByID(@Param('id') id: string) {
    return 'findProductByID: ' + id
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'deleteProduct: ' + id
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return 'updateProduct: ' + id
  }
}
