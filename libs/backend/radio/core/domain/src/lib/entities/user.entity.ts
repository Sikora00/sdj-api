import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column('varchar')
  displayName: string;

  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', {
    default: null,
    nullable: true,
  })
  image192: string;

  @Column('varchar', {
    default: null,
    nullable: true,
  })
  image24: string;

  @Column('varchar', {
    default: null,
    nullable: true,
  })
  image32: string;

  @Column('varchar', {
    default: null,
    nullable: true,
  })
  image48: string;

  @Column('varchar', {
    default: null,
    nullable: true,
  })
  image512: string;

  @Column('varchar', {
    default: null,
    nullable: true,
  })
  image72: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  realName: string;
}
