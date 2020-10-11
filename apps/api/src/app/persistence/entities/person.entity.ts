import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IPersonEntity {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Entity({name: 'person_tbl', schema: 'apischema', database: 'apidb'})
export class PersonEntity {

  constructor(person?: Partial<IPersonEntity>) {
    Object.assign(this, person);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'first_name'})
  firstName: string;

  @Column({name: 'last_name'})
  lastName: string;

  @Column({name: 'email'})
  email: string;

}
