import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("rentals")
export class Rental {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        this.id = this.id ?? uuidv4();
    }
}
