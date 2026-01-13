import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

// responde o endpoint do insominia para receber as requisições
@Controller("/postagens")
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findall();
        
    }

    //vai ter um numero apos a postagem, que sera chamado pela id
    //quando o metodo envovler um id especifico, a base sempre será essa, so mudará a logica
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id:number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findAllByTitulo(titulo)
    }

    //o get busca e o post ele cria
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()postagem: Postagem): Promise<Postagem>{

        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id)
    }
}