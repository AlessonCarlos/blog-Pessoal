import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn()
  data: Date;

  // aqui eu indico para quem ele vai apontar. no caso, tema apontando para postagem
  @ManyToOne(()=> Tema, (tema)=> tema.postagem, {
    // Aqui é uma opção de efeito cascata. neste caso, se eu apago a tabela tema, ele apaga junto todas as postagens relacioadas a esse tema;
    //Ou seja, o cascade so colocamos do lado N(muitos) do relacionamento
    onDelete: 'CASCADE'
  })
  tema: Tema;
}