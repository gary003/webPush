import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number

  @Column("int")
  notification_user_id: number

  @Column("int")
  descrnotification_new_follower_idiption: number

  @Column("text")
  notification_title: string

  @Column("text")
  notification_content: string

  @Column("text")
  notification_type: string

  @Column("text")
  created_at: string

  @Column("text")
  deleted_at: string
}
