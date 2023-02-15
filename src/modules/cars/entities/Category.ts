import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";
// import { v4 as uuidv4 } from "uuid";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    // constructor() {
    //     this.id = this.id ?? uuidv4();
    // }
}
