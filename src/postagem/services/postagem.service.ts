import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";


@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService:TemaService
       
    ) { }

    async findall(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations:{
                tema: true
            }
        });
            
    }

    //Metodo para buscar postagens
    //começa com async pois não é extantanel, o metodo precisa aguardar ser requisitado
    // get por ID
    async findById(id: number): Promise<Postagem> {
        // Procura no banco de dados pela postagem e guarda o resultado na variavel
        let postagem = await this.postagemRepository.findOne({
            where: {
                id,
            },
             relations:{
                tema: true
            }
        });


        // se não achou a postagem alie m cima, da um erro "Não encontrado" pro usuario
        if(!postagem){

            throw new HttpException('A postagem não foi encontra', HttpStatus.NOT_FOUND);
        }

        // se achoua  postagem la em cima, devolver ela pro usuario
        return postagem;
            
    }
    //Metodo para titulo
    async findAllByTitulo(titulo: string): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                tema: true
            }
        })
    }

    //Método para criar postagem
    async create(postagem: Postagem): Promise<Postagem> {

        await this.temaService.findById(postagem.tema.id)
        return await this.postagemRepository.save(postagem);
    }

    //Método para atualizar uma postagem
    async update(postagem: Postagem): Promise<Postagem>{

        await this.findById(postagem.id)

        await this.temaService.findById(postagem.tema.id)

        //se deu tudo certo e a postagem foi encontrada o metodo save() entra em ação e salva a mudança
        //No comando return, o await também é utilizado, indicando que a execução aguardará a conclusão da atualização antes de retornar a resposta para a classe que chamou o método.
        return await this.postagemRepository.save(postagem);
    }

    //Método para deletar Postagem
    async delete(id: number): Promise<DeleteResult>{

        await this.findById(id)

        return await this.postagemRepository.delete(id)
    }

}

    

