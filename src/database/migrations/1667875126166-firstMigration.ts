import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1667875126166 implements MigrationInterface {
    name = 'firstMigration1667875126166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`song_list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`song\` (\`id\` int NOT NULL AUTO_INCREMENT, \`artist\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`song_list_songs_song\` (\`songListId\` int NOT NULL, \`songId\` int NOT NULL, INDEX \`IDX_05c2f4137e2f655b347a159ef4\` (\`songListId\`), INDEX \`IDX_e9d3a58382a353bb0b144c82b2\` (\`songId\`), PRIMARY KEY (\`songListId\`, \`songId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`song_list\` ADD CONSTRAINT \`FK_c1ace847e2df0fe1223b0b4fe5e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` ADD CONSTRAINT \`FK_05c2f4137e2f655b347a159ef48\` FOREIGN KEY (\`songListId\`) REFERENCES \`song_list\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` ADD CONSTRAINT \`FK_e9d3a58382a353bb0b144c82b2d\` FOREIGN KEY (\`songId\`) REFERENCES \`song\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` DROP FOREIGN KEY \`FK_e9d3a58382a353bb0b144c82b2d\``);
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` DROP FOREIGN KEY \`FK_05c2f4137e2f655b347a159ef48\``);
        await queryRunner.query(`ALTER TABLE \`song_list\` DROP FOREIGN KEY \`FK_c1ace847e2df0fe1223b0b4fe5e\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9d3a58382a353bb0b144c82b2\` ON \`song_list_songs_song\``);
        await queryRunner.query(`DROP INDEX \`IDX_05c2f4137e2f655b347a159ef4\` ON \`song_list_songs_song\``);
        await queryRunner.query(`DROP TABLE \`song_list_songs_song\``);
        await queryRunner.query(`DROP TABLE \`song\``);
        await queryRunner.query(`DROP TABLE \`song_list\``);
        await queryRunner.query(`DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
