import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({ name: 'tb_temas' })
export class Tema {
    
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 140, nullable: false })
  descricao: string;

// aqui eu indico para quem ele vai apontar. no caso, postagem apontando para o tema
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[]

}