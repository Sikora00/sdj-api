import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column('varchar')
  displayName: string;

  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  realName: string;
}
