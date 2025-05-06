import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasks1715000003333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tasks',
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
          name: 'description',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'order',
          type: 'int',
          default: 0,
        },
        {
          name: 'columnId',
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
      ],
      foreignKeys: [
        {
          columnNames: ['columnId'],
          referencedTableName: 'column',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
