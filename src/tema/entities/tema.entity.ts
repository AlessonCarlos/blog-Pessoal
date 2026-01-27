import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_temas' })
export class Tema {
    
  @PrimaryGeneratedColumn()
  @ApiProperty()  
  id: number;

  @IsNotEmpty()
  @ApiProperty()  
  @Column({ length: 140, nullable: false })
  descricao: string;

// aqui eu indico para quem ele vai apontar. no caso, postagem apontando para o tema
  @ApiProperty()  
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[]

}