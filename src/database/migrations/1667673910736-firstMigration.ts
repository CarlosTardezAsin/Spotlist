import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1667673910736 implements MigrationInterface {
    name = 'firstMigration1667673910736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`song_list\` (\`listId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`listId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`song\` (\`id\` int NOT NULL AUTO_INCREMENT, \`artist\` varchar(100) NOT NULL, \`title\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`song_list_songs_song\` (\`songListListId\` int NOT NULL, \`songId\` int NOT NULL, INDEX \`IDX_1e844c4a0c6e7f163fdf7b58f6\` (\`songListListId\`), INDEX \`IDX_e9d3a58382a353bb0b144c82b2\` (\`songId\`), PRIMARY KEY (\`songListListId\`, \`songId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`song_list\` ADD CONSTRAINT \`FK_c1ace847e2df0fe1223b0b4fe5e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` ADD CONSTRAINT \`FK_1e844c4a0c6e7f163fdf7b58f6e\` FOREIGN KEY (\`songListListId\`) REFERENCES \`song_list\`(\`listId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` ADD CONSTRAINT \`FK_e9d3a58382a353bb0b144c82b2d\` FOREIGN KEY (\`songId\`) REFERENCES \`song\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` DROP FOREIGN KEY \`FK_e9d3a58382a353bb0b144c82b2d\``);
        await queryRunner.query(`ALTER TABLE \`song_list_songs_song\` DROP FOREIGN KEY \`FK_1e844c4a0c6e7f163fdf7b58f6e\``);
        await queryRunner.query(`ALTER TABLE \`song_list\` DROP FOREIGN KEY \`FK_c1ace847e2df0fe1223b0b4fe5e\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9d3a58382a353bb0b144c82b2\` ON \`song_list_songs_song\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e844c4a0c6e7f163fdf7b58f6\` ON \`song_list_songs_song\``);
        await queryRunner.query(`DROP TABLE \`song_list_songs_song\``);
        await queryRunner.query(`DROP TABLE \`song\``);
        await queryRunner.query(`DROP TABLE \`song_list\``);
        await queryRunner.query(`DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
