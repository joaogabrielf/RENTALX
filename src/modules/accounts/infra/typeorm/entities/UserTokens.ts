import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity("users_tokens")
export class UserTokens {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: "user_id",
    })
    user: User;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;
}
