import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateColumns1715000002222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'columns',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'gen_random_uuid()',
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'order',
          type: 'int',
          default: 0,
        },
        {
          name: 'boardId',
          type: 'uuid',
        },
        {
          name: 'createdAt',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'deletedAt',
          type: 'timestamp with time zone',
          isNullable: true,
        },
      ],
      foreignKeys: [
        {
          columnNames: ['boardId'],
          referencedTableName: 'board',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('columns');
  }
}
