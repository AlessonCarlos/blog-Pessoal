import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' })
export class Postagem {

    @ApiProperty()  
    @PrimaryGeneratedColumn()    
    id: number

    @ApiProperty()  
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string

    @ApiProperty()  
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string

    @ApiProperty()  
    @UpdateDateColumn()
    data: Date

  // aqui eu indico para quem ele vai apontar. no caso, tema apontando para postagem
    @ApiProperty() 
    @ManyToOne(()=> Tema, (tema)=> tema.postagem, {
    // Aqui é uma opção de efeito cascata. neste caso, se eu apago a tabela tema, ele apaga junto todas as postagens relacioadas a esse tema;
    //Ou seja, o cascade so colocamos do lado N(muitos) do relacionamento
    onDelete: 'CASCADE'
    })
    tema: Tema;

   @ApiProperty()  
   @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: "CASCADE"
  })
  usuario: Usuario
}