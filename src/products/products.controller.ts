import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { NATS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto)
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }

  @Get()
  findProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findProductByID(@Param('id', ParseIntPipe) id: string) {

    return this.client.send({ cmd: 'find_one_product' }, { id })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )

    // try {

    //   const product = await firstValueFrom(
    //     this.client.send({ cmd: 'find_one_product' }, { id })
    //   );

    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }

  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_product' }, { id })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.client.send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      );
  }
}
